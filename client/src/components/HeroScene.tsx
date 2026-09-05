import { useEffect, useRef } from "react";

/**
 * A rotating constellation of connected nodes, drawn with a hand-written 3D
 * pipeline: points live in real 3D space, get rotated by yaw and pitch, then
 * projected with perspective divide and painted back-to-front so depth reads.
 *
 * It uses no 3D library on purpose. Three.js would add ~155 kB gzipped to a
 * site that currently ships ~157 kB in total, and nothing here needs a material
 * system, lighting or model loading — only projection, depth and blending.
 */

interface Node {
  x: number;
  y: number;
  z: number;
  hub: boolean;
}

const NODE_COUNT = 88;
const LINK_DISTANCE = 0.62;
const FOCAL = 2.1;

export default function HeroScene({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let frameId = 0;
    let running = true;
    let resizeTimer: number | undefined;

    // Nodes sit inside a flattened sphere so the cloud reads as a slab of
    // architecture rather than a ball of dots.
    const nodes: Node[] = Array.from({ length: NODE_COUNT }, (_, i) => {
      const t = Math.acos(2 * Math.random() - 1);
      const p = Math.random() * Math.PI * 2;
      const r = 0.55 + Math.random() * 0.45;
      return {
        x: r * Math.sin(t) * Math.cos(p) * 1.35,
        y: r * Math.cos(t) * 0.72,
        z: r * Math.sin(t) * Math.sin(p),
        hub: i % 11 === 0,
      };
    });

    // Precompute the pairs that are close enough to link. The geometry is rigid,
    // so this never has to be recalculated per frame.
    const links: [number, number][] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dz = nodes[i].z - nodes[j].z;
        if (Math.hypot(dx, dy, dz) < LINK_DISTANCE) links.push([i, j]);
      }
    }

    let yaw = 0.4;
    let pitch = -0.12;
    let targetYaw = yaw;
    let targetPitch = pitch;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const project = (n: Node, sin: number, cos: number, sinP: number, cosP: number) => {
      // yaw about Y, then pitch about X
      const x1 = n.x * cos - n.z * sin;
      const z1 = n.x * sin + n.z * cos;
      const y1 = n.y * cosP - z1 * sinP;
      const z2 = n.y * sinP + z1 * cosP;

      const depth = z2 + 3.1;
      const scale = FOCAL / depth;
      const unit = Math.min(width, height) * 0.42;
      return {
        sx: width / 2 + x1 * scale * unit,
        sy: height / 2 + y1 * scale * unit,
        scale,
        depth,
      };
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const sin = Math.sin(yaw);
      const cos = Math.cos(yaw);
      const sinP = Math.sin(pitch);
      const cosP = Math.cos(pitch);

      const points = nodes.map((n) => project(n, sin, cos, sinP, cosP));

      // Edges first, faded by the depth of their midpoint.
      ctx.lineWidth = 1;
      for (const [a, b] of links) {
        const pa = points[a];
        const pb = points[b];
        const midDepth = (pa.depth + pb.depth) / 2;
        const fade = Math.max(0, Math.min(1, (4.3 - midDepth) / 2.2));
        if (fade <= 0.02) continue;
        ctx.strokeStyle = `rgba(88, 166, 255, ${0.16 * fade})`;
        ctx.beginPath();
        ctx.moveTo(pa.sx, pa.sy);
        ctx.lineTo(pb.sx, pb.sy);
        ctx.stroke();
      }

      // Then nodes, painted far to near so the close ones sit on top.
      const order = points
        .map((p, i) => ({ p, i }))
        .sort((m, n) => n.p.depth - m.p.depth);

      for (const { p, i } of order) {
        const fade = Math.max(0, Math.min(1, (4.3 - p.depth) / 2.2));
        if (fade <= 0.02) continue;
        const node = nodes[i];
        const radius = (node.hub ? 3.1 : 1.7) * p.scale * 1.5;

        if (node.hub) {
          const glow = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, radius * 5);
          glow.addColorStop(0, `rgba(88, 166, 255, ${0.5 * fade})`);
          glow.addColorStop(1, "rgba(88, 166, 255, 0)");
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, radius * 5, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = node.hub
          ? `rgba(147, 197, 253, ${0.95 * fade})`
          : `rgba(148, 163, 184, ${0.72 * fade})`;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, Math.max(0.6, radius), 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const animate = () => {
      if (!running) return;
      targetYaw += 0.0016;
      yaw += (targetYaw - yaw) * 0.06;
      pitch += (targetPitch - pitch) * 0.06;
      draw();
      frameId = requestAnimationFrame(animate);
    };

    const handlePointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      targetYaw = yaw + nx * 0.35;
      targetPitch = -0.12 - ny * 0.3;
    };

    const handleResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        resize();
        draw();
      }, 200);
    };

    resize();

    if (reduceMotion) {
      draw();
    } else {
      frameId = requestAnimationFrame(animate);
      window.addEventListener("pointermove", handlePointer, { passive: true });
    }

    window.addEventListener("resize", handleResize);

    // Stop the loop while the hero is off screen or the tab is hidden.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (reduceMotion) return;
        if (entry.isIntersecting && !running) {
          running = true;
          frameId = requestAnimationFrame(animate);
        } else if (!entry.isIntersecting) {
          running = false;
          cancelAnimationFrame(frameId);
        }
      },
      { threshold: 0.01 },
    );
    observer.observe(canvas);

    const handleVisibility = () => {
      if (reduceMotion) return;
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(frameId);
      } else if (!running) {
        running = true;
        frameId = requestAnimationFrame(animate);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(frameId);
      window.clearTimeout(resizeTimer);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointer);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
    />
  );
}

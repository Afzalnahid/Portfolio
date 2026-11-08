import { useRef } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP, MOTION_OK, FINE_POINTER, EASE_OUT } from "@/lib/motion";

// "Signal": a green line that runs through the page the way data runs
// through an automation. This component owns the page-wide motion that is
// declared with data attributes in the sections, so each section stays plain
// markup:
//   data-split-heading  a section heading whose lines rise out of a mask
//   data-draw           a short accent bar that draws from the left
//   data-count          a figure that counts up to its own text
//   data-signal         the timeline: [data-signal-line] fills as you scroll,
//                       each [data-signal-dot] lights when the line reaches it
//   data-chips          a list whose items arrive one after another
//   data-magnetic       a button that leans towards the mouse
// Under prefers-reduced-motion none of it runs and everything is shown as it
// is written. Text is never left hidden: every "from" state is set by GSAP
// itself, so if this component fails to run the page reads normally.
export default function PageMotion() {
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Reading progress: the signal crossing the top of the page. A position
    // indicator, not decoration, so it stays on even with reduced motion.
    gsap.fromTo(bar.current, { scaleX: 0 }, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { trigger: document.documentElement, start: 0, end: "max", scrub: 0.3 },
    });

    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      const cleanups: Array<() => void> = [];
      // Section headings, top to bottom (ScrollTrigger refreshes in creation order).
      gsap.utils.toArray<HTMLElement>("[data-split-heading]").forEach((heading) => {
        SplitText.create(heading, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 105,
              duration: 0.85,
              ease: EASE_OUT,
              stagger: 0.09,
              scrollTrigger: { trigger: heading, start: "top 88%", once: true },
            }),
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-draw]").forEach((el) => {
        gsap.from(el, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.9,
          ease: EASE_OUT,
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const end = Number(el.dataset.count);
        if (!Number.isFinite(end)) return;
        const n = { v: 0 };
        el.textContent = "0";
        gsap.to(n, {
          v: end,
          duration: 0.9 + end * 0.08,
          ease: "power2.out",
          snap: { v: 1 },
          onUpdate: () => { el.textContent = String(n.v); },
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-signal]").forEach((list) => {
        const line = list.querySelector<HTMLElement>("[data-signal-line]");
        const dots = list.querySelectorAll<HTMLElement>("[data-signal-dot]");
        // The line runs from the first dot to the last one, so it never hangs
        // past the final role. Re-measured whenever ScrollTrigger recalculates.
        const fit = () => {
          const last = dots[dots.length - 1];
          if (line && last) line.style.height = `${last.getBoundingClientRect().top - list.getBoundingClientRect().top}px`;
        };
        fit();
        ScrollTrigger.addEventListener("refreshInit", fit);
        cleanups.push(() => ScrollTrigger.removeEventListener("refreshInit", fit));
        if (line) {
          gsap.fromTo(line, { scaleY: 0 }, {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top center",
            scrollTrigger: { trigger: list, start: "top 72%", end: "bottom 60%", scrub: 0.6 },
          });
        }
        dots.forEach((dot) => {
          gsap.fromTo(dot, { scale: 0.55, boxShadow: "0 0 0 0 rgba(74,222,155,0)" }, {
            scale: 1,
            boxShadow: "0 0 0 6px rgba(74,222,155,0.18)",
            duration: 0.45,
            ease: "back.out(2.2)",
            scrollTrigger: { trigger: dot, start: "top 66%", toggleActions: "play none none reverse" },
          });
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-chips]").forEach((list) => {
        const items = list.children;
        gsap.from(items, {
          autoAlpha: 0,
          y: 10,
          scale: 0.94,
          duration: 0.4,
          ease: EASE_OUT,
          stagger: { amount: 0.45 },
          // Started by the card the list sits in, not the list: the list is pinned to
          // the bottom of its card, so waiting for it left a visible card looking empty.
          scrollTrigger: { trigger: list.parentElement ?? list, start: "top 80%", once: true },
        });
      });
      return () => cleanups.forEach((off) => off());
    });

    // Magnetic buttons, mouse only. Listeners are removed when this context reverts.
    mm.add(FINE_POINTER, () => {
      const offs: Array<() => void> = [];
      gsap.utils.toArray<HTMLElement>("[data-magnetic]").forEach((el) => {
        const toX = gsap.quickTo(el, "x", { duration: 0.45, ease: EASE_OUT });
        const toY = gsap.quickTo(el, "y", { duration: 0.45, ease: EASE_OUT });
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          toX(((e.clientX - (r.left + r.width / 2)) / r.width) * 10);
          toY(((e.clientY - (r.top + r.height / 2)) / r.height) * 8);
        };
        const leave = () => { toX(0); toY(0); };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        offs.push(() => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        });
      });
      return () => offs.forEach((off) => off());
    });

    // Fonts and the portrait change the page height after first paint.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
  });

  return (
    <div
      ref={bar}
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left bg-brand-bright pointer-events-none"
      style={{ transform: "scaleX(0)", boxShadow: "0 0 10px rgba(74,222,155,0.55)" }}
    />
  );
}

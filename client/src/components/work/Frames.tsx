import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight, Lock, Maximize2, Play, X } from "lucide-react";

/*
 * The visual pieces of the Selected work section (2026-11-11, owner: "my works
 * are not shown here, no work sample… show them more attractively and
 * professionally").
 *
 * Every picture here is a REAL screenshot or a real render (lessons L22, L20):
 *   - TellMore AI: the real dashboard with its sample shop "Nokshi Threads"
 *     (the app's own local screenshot studio, /shots), never a customer's data;
 *   - ezpzbd: the public website;
 *   - the two videos: TellMore's own product film and whiteboard explainer.
 * Every control works: the screen tabs switch the picture, a picture opens
 * full size and closes on Escape, a video plays with sound. Nothing decorative
 * pretends to be clickable; the browser bar's three dots are drawn, not buttons.
 */

export type Shot = { src: string; src2x?: string; alt: string; label?: string };

/** A screenshot in a plain browser window. */
export function BrowserFrame({ url, children, className = "" }: { url: string; children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl sm:rounded-2xl border border-white/10 bg-ground-2 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] overflow-hidden ${className}`}>
      <div className="flex items-center gap-3 px-3.5 sm:px-4 h-9 sm:h-10 border-b border-white/8 bg-white/[0.03]">
        <span aria-hidden className="flex gap-1.5 shrink-0">
          <i className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <i className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <i className="w-2.5 h-2.5 rounded-full bg-white/15" />
        </span>
        <span className="flex-1 min-w-0 truncate text-center font-mono text-[11px] text-subtle bg-white/[0.04] rounded-md px-3 py-1 max-w-xs mx-auto">
          {url}
        </span>
        <span aria-hidden className="w-[42px] shrink-0 hidden sm:block" />
      </div>
      {children}
    </div>
  );
}

/** A phone-shaped frame around a vertical screenshot or video. */
export function PhoneFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative rounded-[2rem] border border-white/12 bg-[#050a09] p-[7px] shadow-[0_30px_70px_-25px_rgba(0,0,0,0.85)] ${className}`}>
      <div className="relative rounded-[1.6rem] overflow-hidden bg-ground">
        {children}
      </div>
      <span aria-hidden className="absolute top-[13px] left-1/2 -translate-x-1/2 w-14 h-[5px] rounded-full bg-black/70" />
    </div>
  );
}

/** A picture that opens full size. */
export function Zoomable({ shot, onOpen, className = "", sizes = "100vw", ratio }: {
  shot: Shot; onOpen: (s: Shot) => void; className?: string; sizes?: string; ratio: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(shot)}
      aria-label={`View larger: ${shot.alt}`}
      className={`group relative block w-full cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-bright ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <img
        src={shot.src}
        srcSet={shot.src2x ? `${shot.src} 800w, ${shot.src2x} 1600w` : undefined}
        sizes={sizes}
        alt={shot.alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover object-top"
      />
      <span className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-lg bg-black/65 backdrop-blur px-2.5 py-1.5 text-[11px] font-semibold text-white opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
        <Maximize2 className="w-3.5 h-3.5" /> View
      </span>
    </button>
  );
}

/** Several screens of one product, switched by real tabs. */
export function ScreenTabs({ shots, url, onOpen }: { shots: Shot[]; url: string; onOpen: (s: Shot) => void }) {
  const [i, setI] = useState(0);
  const cur = shots[i];
  return (
    <div>
      <div role="tablist" aria-label="Screens" className="flex flex-wrap gap-2 mb-4">
        {shots.map((s, n) => (
          <button
            key={s.src}
            role="tab"
            type="button"
            aria-selected={n === i}
            onClick={() => setI(n)}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-bright ${
              n === i ? "bg-brand text-white" : "bg-white/5 text-body hover:bg-white/10 hover:text-white"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
      <BrowserFrame url={url}>
        <Zoomable key={cur.src} shot={cur} onOpen={onOpen} ratio="16 / 10" sizes="(min-width: 1024px) 1100px, 100vw" />
      </BrowserFrame>
    </div>
  );
}

/** Full-size view of one picture. Escape, the close button or a click outside closes it. */
export function Lightbox({ shot, onClose }: { shot: Shot | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!shot) return;
    const prev = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      prev?.focus?.();
    };
  }, [shot, onClose]);
  if (!shot) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={shot.alt}
      onClick={onClose}
      className="fixed inset-0 z-[150] bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-3 sm:p-8"
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-3 right-3 sm:top-5 sm:right-5 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center focus-visible:outline-2 focus-visible:outline-brand-bright"
      >
        <X className="w-5 h-5" />
      </button>
      <img
        src={shot.src2x || shot.src}
        alt={shot.alt}
        onClick={(e) => e.stopPropagation()}
        className="max-w-full max-h-[86vh] w-auto h-auto rounded-lg shadow-2xl object-contain"
      />
      <p className="mt-4 text-sm text-body text-center max-w-2xl">{shot.alt}</p>
    </div>
  );
}

/** A vertical video in a phone: the poster first, the video (with sound) only when asked for. */
export function PhoneVideo({ src, poster, title }: { src: string; poster: string; title: string }) {
  const [on, setOn] = useState(false);
  return (
    <PhoneFrame>
      <div className="relative" style={{ aspectRatio: "9 / 16" }}>
        {on ? (
          <video src={src} poster={poster} controls autoPlay playsInline preload="auto" className="absolute inset-0 w-full h-full object-cover bg-black" aria-label={title} />
        ) : (
          <button type="button" onClick={() => setOn(true)} aria-label={`Play: ${title}`} className="group absolute inset-0 w-full h-full focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-brand-bright">
            <img src={poster} alt="" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
            <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-brand group-hover:bg-brand-bright text-white flex items-center justify-center shadow-xl transition-colors">
              <Play className="w-7 h-7 ml-1" fill="currentColor" />
            </span>
            <span className="absolute left-4 right-4 bottom-4 text-left text-sm font-semibold text-white leading-snug">{title}</span>
          </button>
        )}
      </div>
    </PhoneFrame>
  );
}

/** A client system with no public screen: says so instead of faking one (lessons L21, L22). */
export function PrivateCover({ icon, line }: { icon: ReactNode; line: string }) {
  return (
    <div className="relative aspect-[16/10] rounded-xl border border-white/8 overflow-hidden bg-[radial-gradient(circle_at_30%_20%,rgba(74,222,155,0.10),transparent_55%),linear-gradient(135deg,#0F1A17,#07100E)]">
      <div aria-hidden className="absolute inset-0 opacity-[0.18] bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:28px_28px]" />
      <div className="relative h-full flex flex-col items-center justify-center gap-3 text-center px-6">
        <span className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-bright">{icon}</span>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-body">
          <Lock className="w-3.5 h-3.5" /> {line}
        </span>
      </div>
    </div>
  );
}

/** The real steps of an automation, from its n8n graph (lessons L20). */
export function FlowChips({ steps }: { steps: string[] }) {
  return (
    // Spans, not a list: it sits inside the row's button, which may only hold phrasing content.
    <span role="list" aria-label="How it works, step by step" className="flex flex-wrap items-center gap-y-2 gap-x-1.5">
      {steps.map((s, n) => (
        <span role="listitem" key={s} className="inline-flex items-center gap-1.5">
          <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 font-mono text-[11px] text-body whitespace-nowrap">{s}</span>
          {n < steps.length - 1 && <ArrowRight aria-hidden className="w-3 h-3 text-brand-bright/70 shrink-0" />}
        </span>
      ))}
    </span>
  );
}

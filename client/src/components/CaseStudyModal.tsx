import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Target,
  Hammer,
  TrendingUp,
  Check,
  Layers,
  ExternalLink,
  Lock,
} from "lucide-react";
import { useEffect } from "react";
import { useBooking } from "@/contexts/BookingContext";
import type { Solution } from "./sections/Showcase";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  solution: Solution | null;
}

export default function CaseStudyModal({ isOpen, onClose, solution }: Props) {
  const { openBooking } = useBooking();

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!solution) return null;

  const blocks = [
    {
      label: "The problem",
      text: solution.caseStudy.problem,
      icon: <Target size={16} />,
      tone: "text-rose-400",
    },
    {
      label: "What I built",
      text: solution.caseStudy.solution,
      icon: <Hammer size={16} />,
      tone: "text-brand-bright",
    },
    {
      label: "The result",
      text: solution.caseStudy.result,
      icon: <TrendingUp size={16} />,
      tone: "text-brand-bright",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${solution.title} case study`}
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6"
        >
          <div
            className="absolute inset-0 bg-ground/92 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 16 }}
            className="relative w-full max-w-3xl max-h-[88vh] flex flex-col bg-surface border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4 p-6 sm:p-8 border-b border-white/5">
              <div className="flex items-center gap-4 sm:gap-5 min-w-0">
                <span className="w-12 h-12 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-bright">
                  {solution.icon}
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h2 className="font-display text-xl sm:text-2xl font-bold text-white leading-tight">
                      {solution.title}
                    </h2>
                    {solution.liveUrl && (
                      <a
                        href={solution.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-brand-bright hover:text-brand-bright"
                      >
                        Live <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                  <p className="label text-subtle mt-1.5">{solution.category}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="p-2 shrink-0 rounded-full text-body hover:text-white hover:bg-white/5 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto flex-grow space-y-9">
              <div className="space-y-7">
                {blocks.map((block) => (
                  <div key={block.label}>
                    <p className={`flex items-center gap-2 mb-2.5 ${block.tone}`}>
                      {block.icon}
                      <span className="label">{block.label}</span>
                    </p>
                    <p className="text-[15px] text-fg font-normal leading-relaxed">
                      {block.text}
                    </p>
                  </div>
                ))}
              </div>

              <div>
                <p className="label text-subtle mb-4">What it does</p>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                  {solution.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex gap-2.5 text-sm text-body font-normal leading-snug"
                    >
                      <Check className="w-4 h-4 text-brand-bright shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="label text-subtle mb-3 flex items-center gap-2">
                  <Layers size={13} /> Stack
                </p>
                <p className="font-mono text-xs text-body leading-relaxed">
                  {solution.stack}
                </p>
                {solution.privateNote && (
                  <p className="mt-4 inline-flex items-center gap-2 text-xs text-subtle">
                    <Lock size={13} className="shrink-0" />
                    {solution.privateNote} — no public demo.
                  </p>
                )}
              </div>
            </div>

            <div className="p-6 sm:p-8 border-t border-white/5 bg-white/[0.03] flex flex-col sm:flex-row gap-3 sm:justify-end">
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-xl text-sm font-semibold text-fg hover:text-white hover:bg-white/5 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => openBooking(solution.title)}
                className="px-7 py-3 rounded-xl bg-brand hover:bg-brand-bright text-white text-sm font-semibold transition-colors active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-bright"
              >
                Talk about this work
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

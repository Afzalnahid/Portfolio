import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Target,
  Lightbulb,
  TrendingUp,
  CheckCircle2,
  CalendarDays,
  ExternalLink,
  Layers,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { Solution } from "./sections/Showcase";

const BOOKING_URL = "https://calendar.app.google/2kkn9abjZreibAJx6";

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  solution: Solution | null;
}

export default function CaseStudyModal({
  isOpen,
  onClose,
  solution,
}: CaseStudyModalProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    if (!isOpen && !isBookingOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (isBookingOpen) setIsBookingOpen(false);
      else onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, isBookingOpen, onClose]);

  if (!solution) return null;

  const blocks = [
    {
      label: "The problem",
      text: solution.caseStudy.problem,
      icon: <Target size={18} />,
      tone: "text-rose-400",
    },
    {
      label: "What I built",
      text: solution.caseStudy.solution,
      icon: <Lightbulb size={18} />,
      tone: "text-emerald-400",
    },
    {
      label: "The result",
      text: solution.caseStudy.result,
      icon: <TrendingUp size={18} />,
      tone: "text-blue-400",
    },
  ];

  return (
    <>
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
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
              onClick={onClose}
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-slate-900 border border-white/10 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col"
            >
              <div className="p-6 sm:p-8 border-b border-white/5 flex items-start justify-between gap-4">
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                    {solution.icon}
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-3xl font-black text-white uppercase tracking-tighter mb-1">
                      {solution.title}
                    </h3>
                    <p className="text-[10px] sm:text-xs font-bold text-blue-500 uppercase tracking-[0.2em]">
                      {solution.category}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="p-2 shrink-0 hover:bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 sm:p-8 overflow-y-auto flex-grow space-y-10 sm:space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {blocks.map((block) => (
                    <div key={block.label} className="space-y-4">
                      <div
                        className={`flex items-center gap-2 ${block.tone} mb-2`}
                      >
                        {block.icon}
                        <span className="text-[10px] font-black uppercase tracking-widest">
                          {block.label}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400 leading-relaxed font-light">
                        {block.text}
                      </p>
                    </div>
                  ))}
                </div>

                <div>
                  <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-6">
                    What it does
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {solution.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5"
                      >
                        <CheckCircle2
                          size={16}
                          className="text-blue-500 shrink-0"
                        />
                        <span className="text-xs text-slate-300 font-medium">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                    <Layers size={14} /> Stack
                  </h4>
                  <p className="text-sm text-slate-400 font-light leading-relaxed">
                    {solution.stack}
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-8 border-t border-white/5 bg-white/5 flex justify-center sm:justify-end">
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-colors active:scale-95 shadow-lg shadow-blue-600/20"
                >
                  Book a similar setup
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isBookingOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6"
          >
            <div
              className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl"
              onClick={() => setIsBookingOpen(false)}
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative bg-slate-900 border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col"
            >
              <div className="p-5 border-b border-white/5 flex items-center justify-between gap-3 bg-slate-900 z-10 relative">
                <div className="flex items-center gap-3 text-white">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <CalendarDays size={20} />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black uppercase tracking-tight">
                      Schedule a consultation
                    </h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                      Pick a time that works for you
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-300 rounded-lg transition-colors border border-white/5"
                  >
                    Open in new tab <ExternalLink size={14} />
                  </a>
                  <button
                    onClick={() => setIsBookingOpen(false)}
                    aria-label="Close"
                    className="p-2 hover:bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors border border-transparent hover:border-white/10"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="flex-grow w-full bg-white relative">
                {/* Google blocks this URL shape in an iframe often enough that the
                    fallback has to be real, not decorative. It sits behind the
                    iframe and shows through only when the embed fails. */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 text-slate-400 space-y-4 px-6 text-center">
                  <CalendarDays size={48} className="text-slate-600 mb-2" />
                  <p className="max-w-md text-sm font-light leading-relaxed">
                    If the calendar does not load here, Google is blocking the
                    embed. Open it directly instead.
                  </p>
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-500 transition-colors shadow-lg"
                  >
                    Open the calendar
                  </a>
                </div>

                <iframe
                  src={BOOKING_URL}
                  title="Booking calendar"
                  style={{ border: 0 }}
                  className="absolute inset-0 w-full h-full z-10"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

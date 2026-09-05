import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, X, Mail, MessageCircle, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { BOOKING, mailtoFor, whatsappFor } from "@/lib/booking";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  /** What the visitor was looking at when they opened this. */
  subject?: string;
}

export default function BookingDialog({ isOpen, onClose, subject }: Props) {
  const [embedFailed, setEmbedFailed] = useState(false);

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

  // Google refuses this embed often enough that waiting on it silently is not
  // acceptable. If it has not loaded in four seconds, show the direct routes.
  useEffect(() => {
    if (!isOpen) return;
    setEmbedFailed(false);
    const timer = window.setTimeout(() => setEmbedFailed(true), 4000);
    return () => window.clearTimeout(timer);
  }, [isOpen]);

  const routes = [
    {
      label: "Open calendar",
      href: BOOKING.calendarUrl,
      icon: <ExternalLink className="w-4 h-4" />,
      primary: true,
    },
    {
      label: "Email",
      href: mailtoFor(subject),
      icon: <Mail className="w-4 h-4" />,
      primary: false,
    },
    {
      label: "WhatsApp",
      href: whatsappFor(subject),
      icon: <MessageCircle className="w-4 h-4" />,
      primary: false,
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
          aria-label="Book a call"
          className="fixed inset-0 z-[130] flex items-center justify-center p-4 sm:p-6"
        >
          <div
            className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl"
            onClick={onClose}
          />

          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 16 }}
            className="relative w-full max-w-4xl h-[85vh] max-h-[760px] flex flex-col bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4 p-5 sm:p-6 border-b border-white/5">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-11 h-11 shrink-0 rounded-xl bg-blue-500/15 border border-blue-500/25 flex items-center justify-center text-blue-400">
                  <CalendarDays size={20} />
                </div>
                <div className="min-w-0">
                  <h2 className="font-display text-lg sm:text-xl font-bold text-white leading-tight">
                    {BOOKING.label}
                  </h2>
                  <p className="text-xs text-slate-400 truncate">
                    {subject ? `About ${subject}` : BOOKING.blurb}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="p-2 shrink-0 rounded-full text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="relative flex-grow bg-slate-950">
              {!embedFailed && (
                <iframe
                  src={BOOKING.calendarUrl}
                  title="Booking calendar"
                  className="absolute inset-0 w-full h-full bg-white"
                  style={{ border: 0 }}
                  onLoad={() => setEmbedFailed(false)}
                />
              )}

              {embedFailed && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-8 text-center">
                  <CalendarDays size={44} className="text-slate-700" />
                  <p className="text-sm text-slate-400 font-light max-w-sm leading-relaxed">
                    Google will not embed the calendar here. Open it in a new tab,
                    or reach me directly — either works.
                  </p>
                </div>
              )}
            </div>

            {/* Always present, whether or not the embed rendered. */}
            <div className="flex flex-col sm:flex-row gap-3 p-5 sm:p-6 border-t border-white/5 bg-white/[0.03]">
              {routes.map((route) => (
                <a
                  key={route.label}
                  href={route.href}
                  target={route.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className={`flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 ${
                    route.primary
                      ? "bg-blue-600 hover:bg-blue-500 text-white"
                      : "bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200"
                  }`}
                >
                  {route.icon}
                  {route.label}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { motion, AnimatePresence } from "framer-motion";
import { X, Target, Lightbulb, TrendingUp, CheckCircle2, CalendarDays, ExternalLink } from "lucide-react";
import { useState } from "react";

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  solution: any;
}

export default function CaseStudyModal({ isOpen, onClose, solution }: CaseStudyModalProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  if (!solution) return null;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6"
          >
            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={onClose} />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-slate-900 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-3xl w-full max-w-4xl max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="p-8 border-b border-white/5 flex items-start justify-between">
                <div className="flex items-center gap-6">
                  <div className={`w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white`}>
                    {solution.icon}
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-1">{solution.title}</h3>
                    <p className="text-xs font-bold text-blue-500 uppercase tracking-[0.2em]">{solution.category}</p>
                  </div>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="p-8 overflow-y-auto flex-grow space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-rose-400 mb-2">
                      <Target size={18} />
                      <span className="text-[10px] font-black uppercase tracking-widest">The Problem</span>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed font-light">
                      Manual data entry, slow response times, and inconsistent customer experiences were draining resource and causing revenue leakages.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-emerald-400 mb-2">
                      <Lightbulb size={18} />
                      <span className="text-[10px] font-black uppercase tracking-widest">The Solution</span>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed font-light">
                      A fully autonomous n8n ecosystem with integrated AI agents that handle logic, memory, and multi-channel distribution.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-blue-400 mb-2">
                      <TrendingUp size={18} />
                      <span className="text-[10px] font-black uppercase tracking-widest">The ROI</span>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed font-light">
                      90% reduction in response time, 20+ hours saved per week, and a scalable infrastructure ready for 10x growth.
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-6">Strategic Features</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {solution.features.map((feature: string, i: number) => (
                      <div key={i} className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
                        <CheckCircle2 size={16} className="text-blue-500" />
                        <span className="text-xs text-slate-300 font-bold uppercase tracking-tight">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-8 border-t border-white/5 bg-white/5 flex justify-end">
                <button 
                  onClick={() => setIsBookingOpen(true)}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-600/20"
                >
                  Book a similar setup
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Embedded Google Calendar Booking Modal */}
      <AnimatePresence>
        {isBookingOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6"
          >
            <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl" onClick={() => setIsBookingOpen(false)} />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative bg-slate-900 border border-white/10 rounded-[2rem] overflow-hidden shadow-3xl w-full max-w-5xl h-[85vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-5 border-b border-white/5 flex items-center justify-between bg-slate-900 z-10 relative">
                <div className="flex items-center gap-3 text-white">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <CalendarDays size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black uppercase tracking-tight">Schedule a Consultation</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Select a time that works for you</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <a 
                    href="https://calendar.app.google/2kkn9abjZreibAJx6" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-300 rounded-lg transition-colors border border-white/5"
                  >
                    Open in new tab <ExternalLink size={14} />
                  </a>
                  <button onClick={() => setIsBookingOpen(false)} className="p-2 hover:bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors border border-transparent hover:border-white/10">
                    <X size={20} />
                  </button>
                </div>
              </div>
              
              {/* iframe Container */}
              <div className="flex-grow w-full bg-white relative">
                {/* Fallback overlay incase iframe blocks due to X-Frame-Options */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 text-slate-400 space-y-4 px-6 text-center -z-10">
                   <CalendarDays size={48} className="text-slate-600 mb-2" />
                   <p>If the calendar doesn't load (due to Google's strict embed policies on this specific URL structure),<br/> please open it directly.</p>
                   <a 
                    href="https://calendar.app.google/2kkn9abjZreibAJx6" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-500 transition-colors shadow-lg"
                   >
                     Open Calendar
                   </a>
                </div>

                <iframe
                  src="https://calendar.app.google/2kkn9abjZreibAJx6"
                  style={{ border: 0 }}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  className="absolute inset-0 w-full h-full z-10"
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

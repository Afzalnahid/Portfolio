import { motion } from "framer-motion";
import { Zap, Clock, Plug, Target } from "lucide-react";

// These four figures are the owner's own, taken from his CV. If they change
// there, change them here — this is the only place the site states them.
const stats = [
  {
    label: "Automated Executions",
    value: "10k+",
    icon: <Zap className="w-5 h-5 text-blue-400" />,
    description: "Workflow runs completed",
  },
  {
    label: "Manual Hours Eliminated",
    value: "500+",
    icon: <Clock className="w-5 h-5 text-emerald-400" />,
    description: "Given back to client teams",
  },
  {
    label: "API Integrations Built",
    value: "50+",
    icon: <Plug className="w-5 h-5 text-rose-400" />,
    description: "Across AI, data and messaging",
  },
  {
    label: "Grounded Response Accuracy",
    value: "99.9%",
    icon: <Target className="w-5 h-5 text-amber-400" />,
    description: "Answers drawn from real data",
  },
];

export default function Stats() {
  return (
    <section className="py-16 sm:py-20 border-y border-white/5 bg-slate-900/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-black text-white mb-1 tracking-tighter tabular-nums">
                {stat.value}
              </div>
              <div className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-blue-500 mb-2">
                {stat.label}
              </div>
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

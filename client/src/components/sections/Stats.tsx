import { motion } from "framer-motion";
import { Zap, Clock, Target, Cpu } from "lucide-react";

const stats = [
  {
    label: "Tasks Automated",
    value: "10k+",
    icon: <Zap className="w-5 h-5 text-blue-400" />,
    description: "Successful workflow executions"
  },
  {
    label: "Hours Saved",
    value: "500+",
    icon: <Clock className="w-5 h-5 text-emerald-400" />,
    description: "Manual labor hours eliminated"
  },
  {
    label: "AI Accuracy",
    value: "99.9%",
    icon: <Target className="w-5 h-5 text-rose-400" />,
    description: "Reliable RAG & Vision models"
  },
  {
    label: "Integrations",
    value: "50+",
    icon: <Cpu className="w-5 h-5 text-amber-400" />,
    description: "Custom API & App connections"
  }
];

export default function Stats() {
  return (
    <section className="py-20 border-y border-white/5 bg-slate-900/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-black text-white mb-1 tracking-tighter">
                {stat.value}
              </div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-blue-500 mb-2">
                {stat.label}
              </div>
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

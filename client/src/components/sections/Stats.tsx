import { motion } from "framer-motion";
import { Workflow, GitBranch, Plug, BrainCircuit } from "lucide-react";

// Every number here is counted from the workflow files published under
// /public/workflows — 5 files, 152 nodes, 35 distinct node types across
// Gemini, OpenAI and OpenRouter. Keep them in step if a workflow is added.
const stats = [
  {
    label: "Production Workflows",
    value: "5",
    icon: <Workflow className="w-5 h-5 text-blue-400" />,
    description: "Complete systems running live",
  },
  {
    label: "Automation Steps",
    value: "152",
    icon: <GitBranch className="w-5 h-5 text-emerald-400" />,
    description: "Nodes wired across those systems",
  },
  {
    label: "Platforms Connected",
    value: "9",
    icon: <Plug className="w-5 h-5 text-rose-400" />,
    description: "APIs, databases and messaging apps",
  },
  {
    label: "AI Providers",
    value: "3",
    icon: <BrainCircuit className="w-5 h-5 text-amber-400" />,
    description: "Gemini, OpenAI and OpenRouter",
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

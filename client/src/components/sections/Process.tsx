import { motion } from "framer-motion";
import { Search, Lightbulb, ShieldCheck, Rocket } from "lucide-react";

const steps = [
  {
    title: "Discovery",
    desc: "We analyze your manual bottlenecks and map out the data flow.",
    icon: <Search className="w-6 h-6" />,
    color: "text-blue-400",
    bg: "bg-blue-400/10"
  },
  {
    title: "Strategy",
    desc: "Designing the AI architecture and selecting the best LLMs & APIs.",
    icon: <Lightbulb className="w-6 h-6" />,
    color: "text-amber-400",
    bg: "bg-amber-400/10"
  },
  {
    title: "n8n Build",
    desc: "Developing the autonomous workflows and custom integrations.",
    icon: <Layers className="w-6 h-6" />,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10"
  },
  {
    title: "Quality Test",
    desc: "Stress-testing triggers and monitoring AI accuracy & response.",
    icon: <ShieldCheck className="w-6 h-6" />,
    color: "text-rose-400",
    bg: "bg-rose-400/10"
  },
  {
    title: "Deployment",
    desc: "Pushing live to your environment with real-time logging.",
    icon: <Rocket className="w-6 h-6" />,
    color: "text-purple-400",
    bg: "bg-purple-400/10"
  }
];

import { Layers } from "lucide-react";

export default function Process() {
  return (
    <section id="process" className="py-24 bg-slate-950 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-blue-500 font-bold tracking-widest uppercase text-sm mb-4 block">Execution Roadmap</span>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">How I Work</h2>
          <div className="w-20 h-1.5 bg-blue-500 rounded-full mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative group"
            >
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-full w-full h-[1px] bg-gradient-to-r from-white/10 to-transparent z-0" />
              )}
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className={`w-20 h-20 rounded-[2rem] ${step.bg} flex items-center justify-center ${step.color} mb-6 border border-white/5 group-hover:scale-110 transition-transform duration-500`}>
                  {step.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-tight">{step.title}</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed uppercase tracking-wide px-4">
                  {step.desc}
                </p>
                <div className="mt-4 text-[10px] font-black text-slate-800 uppercase tracking-widest">Step 0{idx + 1}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { Rocket, Layers, Workflow, MessagesSquare } from "lucide-react";

// Every figure here is countable from the CV or from the work shown further
// down this page. If a project is added, update this too.
const stats = [
  {
    label: "Solo SaaS Platform",
    value: "1",
    icon: <Rocket className="w-5 h-5 text-blue-400" />,
    description: "getvoicium, architecture to deployment",
  },
  {
    label: "Production Applications",
    value: "4",
    icon: <Layers className="w-5 h-5 text-emerald-400" />,
    description: "Shipped inside engineering teams",
  },
  {
    label: "Automation Workflows",
    value: "5",
    icon: <Workflow className="w-5 h-5 text-rose-400" />,
    description: "Running unattended in production",
  },
  {
    label: "Messaging Channels",
    value: "4",
    icon: <MessagesSquare className="w-5 h-5 text-amber-400" />,
    description: "Facebook, Instagram, WhatsApp, Telegram",
  },
];

export default function Stats() {
  return (
    <section className="py-16 sm:py-20 border-y border-white/5 bg-slate-900/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <p className="text-center label text-slate-500 mb-10">
          Built in under a year
        </p>
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
              <div className="text-3xl md:text-4xl font-extrabold text-white mb-1 tracking-tighter tabular-nums">
                {stat.value}
              </div>
              <div className="label text-blue-500 mb-2">
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

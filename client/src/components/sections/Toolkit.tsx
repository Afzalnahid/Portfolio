import { motion } from "framer-motion";
import { Code2, BrainCircuit } from "lucide-react";

// Straight from the CV's TECHNICAL SKILLS section. Keep the two in step —
// claiming more here than the CV does is how a portfolio loses an interview.
const groups = [
  {
    title: "Full-Stack / Web",
    icon: <Code2 className="w-5 h-5" />,
    blurb:
      "Building and shipping the application itself — interface, API and database.",
    items: [
      "JavaScript",
      "React",
      "Next.js",
      "Node.js",
      "Supabase",
      "PostgreSQL",
      "REST APIs",
      "HTML / CSS",
      "Git",
    ],
  },
  {
    title: "AI / Automation",
    icon: <BrainCircuit className="w-5 h-5" />,
    blurb:
      "Wiring language models into real business flows, and keeping them grounded in real data.",
    items: [
      "n8n",
      "LLM integration",
      "OpenAI API",
      "Google Gemini",
      "RAG / vector search",
      "Chatbot development",
      "WhatsApp API",
      "Telegram API",
      "Meta (Facebook, Instagram) APIs",
      "Webhooks",
      "Prompt engineering",
      "AI-assisted development",
    ],
  },
];

export default function Toolkit() {
  return (
    <section
      id="toolkit"
      className="py-20 sm:py-24 bg-ground relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 sm:mb-20">
          <span className="text-brand-bright font-bold tracking-widest uppercase text-xs sm:text-sm mb-4 block">
            The Stack
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-[2.9rem] font-bold text-white">
            What I Build With
          </h2>
          <div className="w-20 h-1.5 bg-brand rounded-full mx-auto mt-6" />
          <p className="text-body max-w-2xl mx-auto mt-6 font-normal text-base sm:text-lg">
            Not a list of things I have read about. Everything here is running
            in one of the products or automations above.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {groups.map((group, idx) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white/[0.03] backdrop-blur-sm p-8 rounded-[2rem] border border-white/5 hover:border-white/10 transition-colors flex flex-col"
            >
              <div className="flex items-center gap-4 mb-4 text-brand-bright">
                <div className="w-11 h-11 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center shrink-0">
                  {group.icon}
                </div>
                <h3 className="label">
                  {group.title}
                </h3>
              </div>

              <p className="text-sm text-subtle font-normal leading-relaxed mb-7">
                {group.blurb}
              </p>

              <ul className="flex flex-wrap gap-2.5 mt-auto">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="px-4 py-2 rounded-full bg-surface/60 border border-white/5 text-xs font-medium text-fg"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

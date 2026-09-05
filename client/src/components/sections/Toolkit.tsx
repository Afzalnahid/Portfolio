import { motion } from "framer-motion";

// This section replaced a set of invented testimonials. Everything listed here
// is a platform that actually appears in the published workflow files, so it
// can be defended in a client conversation.
//
// TO ADD REAL TESTIMONIALS LATER: create a `Testimonials.tsx` with quotes you
// have written permission to publish, and render it above Contact in Home.tsx.
const groups = [
  {
    title: "Automation",
    items: ["n8n", "Make.com", "GoHighLevel", "Webhooks", "Schedulers"],
  },
  {
    title: "AI & Retrieval",
    items: [
      "Google Gemini",
      "OpenAI",
      "OpenRouter",
      "Supabase Vector Store",
      "RAG pipelines",
    ],
  },
  {
    title: "Data & Messaging",
    items: [
      "Supabase",
      "PostgreSQL",
      "Google Sheets",
      "Google Drive",
      "Google Calendar",
      "Telegram",
      "Meta Graph API",
    ],
  },
];

export default function Toolkit() {
  return (
    <section
      id="toolkit"
      className="py-20 sm:py-24 bg-slate-950 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 sm:mb-20">
          <span className="text-blue-500 font-bold tracking-widest uppercase text-xs sm:text-sm mb-4 block">
            The Stack
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
            What I Build With
          </h2>
          <div className="w-20 h-1.5 bg-blue-500 rounded-full mx-auto mt-6" />
          <p className="text-slate-400 max-w-2xl mx-auto mt-6 font-light text-base sm:text-lg">
            Every tool below appears in the workflows published on this page —
            open any workflow map and you can trace it node by node.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {groups.map((group, idx) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white/[0.03] backdrop-blur-sm p-8 rounded-[2rem] border border-white/5 hover:border-white/10 transition-colors"
            >
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-6">
                {group.title}
              </h3>
              <ul className="flex flex-wrap gap-2.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="px-4 py-2 rounded-full bg-slate-900/60 border border-white/5 text-xs font-medium text-slate-300"
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

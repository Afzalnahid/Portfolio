import { motion } from "framer-motion";
import {
  BrainCircuit,
  Database,
  Sparkles,
  Server,
  MonitorSmartphone,
  MessagesSquare,
  Workflow,
  Plug,
  Rocket,
} from "lucide-react";

// Taken from the owner's CV. Keep the two in step: this section is the site's
// only statement of what he works with.
const groups = [
  {
    title: "AI Engineering",
    icon: <BrainCircuit className="w-4 h-4" />,
    blurb:
      "LLM orchestration and agent design, with tool calling, memory buffers, system-prompt guardrails, structured JSON output and fallback logic.",
    items: [
      "Google Gemini 2.5 Pro",
      "OpenAI GPT-4o / 4o-mini",
      "Anthropic Claude",
      "Groq",
      "Ollama",
      "Prompt engineering",
    ],
  },
  {
    title: "RAG & Retrieval",
    icon: <Database className="w-4 h-4" />,
    blurb:
      "Retrieval-augmented architecture end to end, from chunking strategy to vector-store migration and hallucination reduction through data grounding.",
    items: [
      "Supabase pgvector",
      "gemini-embedding-001 (768-dim)",
      "Chunking strategy",
      "Semantic search",
      "Vector-store design",
    ],
  },
  {
    title: "Multimodal AI",
    icon: <Sparkles className="w-4 h-4" />,
    blurb:
      "Vision, speech and generative video, including product recognition from low-quality photos and Bengali / Banglish speech-to-text.",
    items: [
      "Vision-language models",
      "Whisper-large-v3",
      "AI image generation",
      "Veo",
      "Sora",
      "HeyGen",
      "Seedance",
    ],
  },
  {
    title: "Product & Backend",
    icon: <Server className="w-4 h-4" />,
    blurb:
      "Multi-tenant architecture with isolation enforced at the database, plus the API and job design around it.",
    items: [
      "Multi-tenant SaaS",
      "PostgreSQL",
      "Supabase schema design",
      "Migrations",
      "REST API design",
      "Node.js",
      "Webhook receivers",
      "Payment flows",
    ],
  },
  {
    title: "Frontend",
    icon: <MonitorSmartphone className="w-4 h-4" />,
    blurb:
      "Dashboards and embeddable interfaces that non-technical owners can actually operate.",
    items: [
      "Next.js 14 (App Router)",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Radix / shadcn-ui",
      "Vite",
      "Framer Motion",
      "Shadow-DOM widgets",
    ],
  },
  {
    title: "Messaging Platforms",
    icon: <MessagesSquare className="w-4 h-4" />,
    blurb:
      "Meta channels from webhook subscription and Embedded Signup through App Review and 24-hour window compliance.",
    items: [
      "Messenger Send API",
      "Instagram Direct",
      "WhatsApp Cloud API",
      "OAuth onboarding",
      "Meta App Review",
      "Comment private replies",
    ],
  },
  {
    title: "Workflow Automation",
    icon: <Workflow className="w-4 h-4" />,
    blurb:
      "Router and switch logic, schedulers, retries, error handling and execution-log debugging on cloud and self-hosted runners.",
    items: [
      "n8n (cloud & self-hosted)",
      "Make.com",
      "GoHighLevel",
      "Schedulers & triggers",
      "Uptime monitoring",
    ],
  },
  {
    title: "Integrations",
    icon: <Plug className="w-4 h-4" />,
    blurb: "The services these systems talk to every day.",
    items: [
      "Google Calendar",
      "Google Sheets",
      "Gmail",
      "Telegram Bot API",
      "Resend",
      "SSLCommerz",
      "ImgBB",
      "Kie.ai",
      "Figma",
      "Canva",
    ],
  },
  {
    title: "DevOps & Delivery",
    icon: <Rocket className="w-4 h-4" />,
    blurb:
      "Staged releases, secrets handling and pre-deploy verification, followed by production log analysis.",
    items: [
      "Vercel",
      "GitHub & Contents API",
      "CI/CD",
      "Secrets management",
      "Release gates",
      "Production log analysis",
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
            Not a list of things I have read about — everything here appears in
            systems on this page or in production for a client.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group, idx) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
              className="bg-white/[0.03] backdrop-blur-sm p-7 rounded-[1.75rem] border border-white/5 hover:border-white/10 transition-colors flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4 text-blue-400">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                  {group.icon}
                </div>
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em]">
                  {group.title}
                </h3>
              </div>

              <p className="text-xs text-slate-500 font-light leading-relaxed mb-6">
                {group.blurb}
              </p>

              <ul className="flex flex-wrap gap-2 mt-auto">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="px-3 py-1.5 rounded-full bg-slate-900/60 border border-white/5 text-[11px] font-medium text-slate-300"
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

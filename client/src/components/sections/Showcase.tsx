import { motion } from "framer-motion";
import {
  Bot,
  Share2,
  Workflow,
  Database,
  Video,
  Layers,
  GraduationCap,
  MessageSquare,
  Building2,
  ExternalLink,
  Lock,
  ArrowUpRight,
  Check,
} from "lucide-react";
import { lazy, Suspense, useState, type ReactNode } from "react";

const CaseStudyModal = lazy(() => import("../CaseStudyModal"));

export interface Solution {
  title: string;
  category: string;
  description: string;
  stack: string;
  features: string[];
  caseStudy: { problem: string; solution: string; result: string };
  icon: ReactNode;
  liveUrl?: string;
  privateNote?: string;
}

/** The one piece of work that should be read before anything else. */
const featured: Solution = {
  title: "getvoicium",
  category: "Solo SaaS",
  description:
    "A multi-tenant AI chatbot platform that answers customers in Bangla across Facebook, Instagram, WhatsApp and a website widget. I built it alone — schema, API, dashboard, widget, billing and deployment.",
  stack: "Next.js · Supabase (pgvector) · Google Gemini · RAG · Vercel",
  liveUrl: "https://getvoicium.com",
  features: [
    "Per-client knowledge base with RAG retrieval",
    "Tenant isolation enforced at the database",
    "One-click OAuth channel connection",
    "Embeddable Shadow-DOM website widget",
    "Broadcast messaging with segment targeting",
    "Billing and subscriptions",
  ],
  caseStudy: {
    problem:
      "Bangladeshi businesses answer the same questions all day on Messenger and WhatsApp — price, stock, delivery — usually in Bangla, usually after hours. Off-the-shelf bots answer in English, from generic knowledge, and need a developer to install.",
    solution:
      "A complete multi-tenant SaaS built solo: schema and tenant isolation on Supabase, retrieval over pgvector so each client's own catalogue answers the question, Gemini for the reply, and an embeddable widget alongside the Meta channels. Broadcasts and billing are part of the product, not bolted on.",
    result:
      "Owners get a bot that answers from their real data in their customers' language, and connect it themselves instead of hiring someone to wire it up.",
  },
  icon: <Layers className="w-6 h-6" />,
};

const applications: Solution[] = [
  {
    title: "ezpzbd",
    category: "AI EdTech",
    description:
      "An AI tutoring platform for HSC students with several subject tutors and voice explanations in Bangla and English. I trained the tutors on the learning content and board-exam question data.",
    stack: "AI tutors · Voice explanation · Board-exam data",
    liveUrl: "https://ezpzbd.com",
    features: [
      "Multiple subject-specific AI tutors",
      "Voice explanations in Bangla and English",
      "Trained on board-exam solutions",
      "Physics, Chemistry and Math",
    ],
    caseStudy: {
      problem:
        "HSC students need the method explained, not just the answer, and private tutoring is out of reach for most families. A general chatbot does not know the board syllabus or how its questions are marked.",
      solution:
        "As part of the engineering team I trained the platform's AI tutors on the learning content and past board-exam question data, so answers follow the syllabus and the expected solution method — with voice explanation in Bangla as well as English.",
      result:
        "Students get subject tutors that explain in the language they think in.",
    },
    icon: <GraduationCap className="w-6 h-6" />,
  },
  {
    title: "Champion Sales SaaS",
    category: "WhatsApp Automation",
    description:
      "A SaaS that runs a sales team and its head office entirely through WhatsApp — daily reminders, lead management and rep performance ratings. I built the WhatsApp API integration.",
    stack: "WhatsApp Cloud API · Automation · Web dashboard",
    privateNote: "Client system — access by login only",
    features: [
      "Automated daily reminders to reps",
      "Lead capture and management",
      "Sales-team performance tracking",
      "Head-office reporting",
    ],
    caseStudy: {
      problem:
        "A field sales team will not open a CRM. Any tool that asks reps to log in somewhere new collects nothing, so head office ends up chasing updates by phone.",
      solution:
        "Put the whole loop inside WhatsApp. I built the integration that sends each rep their daily reminders, captures leads from the replies, and feeds performance data back to head office.",
      result:
        "The team reports from the app they already use all day. It is the client's own system behind their login, so there is no public demo — happy to walk through it in a call.",
    },
    icon: <MessageSquare className="w-6 h-6" />,
  },
  {
    title: "Nandi Real Estate ERP",
    category: "Full-Stack ERP",
    description:
      "A full-stack ERP for a real-estate development company, covering the operational side of the business. In active development.",
    stack: "Full-stack web application · Relational database",
    privateNote: "Client system — access by login only",
    features: [
      "Full-stack build",
      "Operational workflows for property development",
      "Relational data model",
      "In active development",
    ],
    caseStudy: {
      problem:
        "A property development company's operations spread across spreadsheets and message threads, so nobody has a single view of a project's state.",
      solution:
        "A full-stack ERP built around how the business actually works, started during my time at Autolinium and continuing now.",
      result:
        "Still in development, and it is the client's internal system behind their own login. Happy to walk through the architecture in a call.",
    },
    icon: <Building2 className="w-6 h-6" />,
  },
];

const automations: Solution[] = [
  {
    title: "E-commerce chatbot",
    category: "Retail",
    description:
      "A Messenger sales agent that answers from live inventory rather than model memory, routes text, image and voice input, and writes confirmed orders to Google Sheets.",
    stack: "n8n · Gemini · OpenAI · Supabase vector store · PostgreSQL",
    features: [
      "Supabase vector retrieval for price and stock",
      "PostgreSQL conversation memory",
      "Text, image and voice routed by type",
      "Orders written to Google Sheets",
    ],
    caseStudy: {
      problem:
        "A bot answering price and stock from what the model remembers will be confidently wrong, and one that treats each message separately loses the thread mid-order.",
      solution:
        "Input routing sends text, image and voice to the right model. A Supabase vector store grounds every price and stock answer in real data, and PostgreSQL-backed memory carries the conversation across messages.",
      result:
        "A 38-step graph taking an enquiry through to a recorded order without a person in the loop.",
    },
    icon: <Workflow className="w-5 h-5" />,
  },
  {
    title: "Agency chatbot & booking",
    category: "Service businesses",
    description:
      "Handles enquiries, keeps context across the conversation, and books the meeting into Google Calendar itself.",
    stack: "n8n · Gemini · Google Calendar · Google Sheets · Telegram",
    features: [
      "Conversational memory buffer",
      "Google Calendar booking as an agent tool",
      "Enquiry logging to Google Sheets",
      "Telegram alerts on new bookings",
    ],
    caseStudy: {
      problem:
        "Every enquiry needs the same sequence — qualify, answer, offer a slot, confirm, record it. Done by hand it is slow, and the follow-up is the step that gets dropped.",
      solution:
        "A Gemini agent with a memory buffer so the thread survives, Google Calendar exposed to it as a tool so it can check and book directly, Sheets for the record and Telegram for the alert.",
      result: "A 31-step graph turning a message into a booked meeting.",
    },
    icon: <Bot className="w-5 h-5" />,
  },
  {
    title: "RAG knowledgebase chatbot",
    category: "Knowledge management",
    description:
      "Files land in Google Drive, get chunked and embedded into a vector store, and answers come back grounded in the source.",
    stack: "n8n · Google Drive · OpenAI embeddings · Supabase · PostgreSQL",
    features: [
      "Google Drive document ingestion",
      "Text splitting and embedding pipeline",
      "Supabase vector store retrieval",
      "Scheduled re-indexing",
    ],
    caseStudy: {
      problem:
        "Ask a general model about your product and it answers from training data. It sounds right and often is not — worse than no answer when the subject is your own documentation.",
      solution:
        "Documents are pulled from Drive, extracted, split and embedded into a Supabase vector store on a schedule. Questions are answered from the passages actually retrieved.",
      result: "A 34-step graph covering ingestion and retrieval in one system.",
    },
    icon: <Database className="w-5 h-5" />,
  },
  {
    title: "Facebook auto-posting",
    category: "Content automation",
    description:
      "A scheduled pipeline that writes the post with Gemini, publishes through the Graph API, logs it and reports status to Telegram.",
    stack: "n8n · Gemini · Facebook Graph API · Google Sheets · Telegram",
    features: [
      "Schedule-triggered, no manual step",
      "Gemini writes the copy",
      "Publishes via the Facebook Graph API",
      "Every post logged, status alerted to Telegram",
    ],
    caseStudy: {
      problem:
        "Consistent posting is what moves a page and it is the first thing to slip. Schedulers fix the timing but still need someone to write the post.",
      solution:
        "A schedule trigger starts the run, a Gemini agent writes the copy, the Graph API publishes it, Sheets keeps the log and Telegram reports whether it worked.",
      result: "A 21-step graph publishing without anyone opening the app.",
    },
    icon: <Share2 className="w-5 h-5" />,
  },
  {
    title: "UGC video ad pipeline",
    category: "AI advertising",
    description:
      "Reads product rows from a spreadsheet, writes the ad copy with an LLM, and drives a video-generation API through to a finished ad.",
    stack: "n8n · OpenRouter · OpenAI · Video generation API · Google Sheets",
    features: [
      "Spreadsheet-driven input",
      "LLM-written ad copy",
      "Polls the video API until the render is ready",
      "Scheduled batch runs",
    ],
    caseStudy: {
      problem:
        "UGC-style video converts, but producing it means briefing a creator and waiting. Testing ten variations of an angle is not realistic on that cycle.",
      solution:
        "A scheduled graph reads product data from Sheets, writes and optimises the copy through OpenRouter and OpenAI, then calls a video-generation API and waits on it until the render is ready.",
      result: "A 28-step graph turning a spreadsheet into finished video ads.",
    },
    icon: <Video className="w-5 h-5" />,
  },
];

function LinkBadge({ solution }: { solution: Solution }) {
  if (solution.liveUrl) {
    return (
      <a
        href={solution.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-bright hover:text-brand-bright transition-colors"
      >
        Live <ExternalLink className="w-3.5 h-3.5" />
      </a>
    );
  }
  if (solution.privateNote) {
    return (
      <span
        title={solution.privateNote}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-muted/75"
      >
        <Lock className="w-3.5 h-3.5" /> Private
      </span>
    );
  }
  return null;
}

export default function Showcase() {
  const [selected, setSelected] = useState<Solution | null>(null);

  return (
    <section id="work" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-ground">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14 sm:mb-16 max-w-2xl">
          <p className="label text-brand mb-4">Selected work</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-[2.9rem] font-bold text-white leading-[1.08] mb-5">
            One product I built alone, and the systems around it.
          </h2>
          <p className="text-muted font-light text-base sm:text-lg leading-relaxed">
            Four applications and five production automations. Open any of them
            for the problem, the build and what came out of it.
          </p>
        </div>

        {/* ---------- Featured ---------- */}
        <motion.article
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-surface via-surface/60 to-ground overflow-hidden mb-6"
        >
          <div className="absolute -top-24 -right-16 w-80 h-80 bg-brand/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="relative grid lg:grid-cols-12 gap-8 lg:gap-10 p-7 sm:p-10">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-bright">
                  {featured.icon}
                </span>
                <span className="label text-muted/75">{featured.category}</span>
              </div>

              <div className="flex items-center gap-3 flex-wrap mb-4">
                <h3 className="font-display text-3xl sm:text-4xl font-bold text-white">
                  {featured.title}
                </h3>
                <LinkBadge solution={featured} />
              </div>

              <p className="text-fg/75 font-light leading-relaxed mb-7 max-w-xl">
                {featured.description}
              </p>

              <p className="font-mono text-[11px] text-muted/75 mb-8 leading-relaxed">
                {featured.stack}
              </p>

              <button
                onClick={() => setSelected(featured)}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand hover:bg-brand-bright text-white text-sm font-semibold transition-colors active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-bright"
              >
                Read the case study
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            {/* Facts panel. Replaced by a real screenshot once one is available. */}
            <div className="lg:col-span-5">
              <div className="h-full rounded-2xl border border-white/10 bg-ground/50 p-6">
                <p className="label text-muted/55 mb-5">What it does</p>
                <ul className="space-y-3.5">
                  {featured.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm text-fg/80 font-light leading-snug">
                      <Check className="w-4 h-4 text-brand-bright shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.article>

        {/* ---------- Other applications ---------- */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {applications.map((app, idx) => (
            <motion.article
              key={app.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              onClick={() => setSelected(app)}
              className="group rounded-2xl border border-white/8 bg-surface/40 p-7 flex flex-col cursor-pointer hover:border-white/20 hover:bg-surface/70 transition-colors"
            >
              <div className="flex items-center justify-between mb-5">
                <span className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-fg/80">
                  {app.icon}
                </span>
                <span className="label text-muted/55 text-right">{app.category}</span>
              </div>

              <div className="flex items-center gap-2.5 flex-wrap mb-3">
                <h3 className="font-display text-xl font-bold text-white">{app.title}</h3>
                <LinkBadge solution={app} />
              </div>

              <p className="text-sm text-muted font-light leading-relaxed mb-5">
                {app.description}
              </p>

              <p className="font-mono text-[10.5px] text-muted/55 leading-relaxed mt-auto mb-5">
                {app.stack}
              </p>

              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-bright group-hover:text-brand-bright transition-colors">
                Case study <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </motion.article>
          ))}
        </div>

        {/* ---------- Automation work ---------- */}
        <div className="mb-8 max-w-2xl">
          <p className="label text-brand mb-4">Automation work</p>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight mb-4">
            Five production n8n systems
          </h3>
          <p className="text-muted font-light leading-relaxed">
            Built during my time at Autolinium and since. Each one runs
            unattended and handles a job a person used to do by hand.
          </p>
        </div>

        <div className="rounded-2xl border border-white/8 divide-y divide-white/5 overflow-hidden">
          {automations.map((flow, idx) => (
            <motion.button
              key={flow.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              onClick={() => setSelected(flow)}
              className="group w-full text-left grid sm:grid-cols-12 gap-3 sm:gap-6 items-center p-6 sm:p-7 bg-surface/30 hover:bg-surface/70 transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-bright"
            >
              <div className="sm:col-span-4 flex items-center gap-4">
                <span className="w-9 h-9 shrink-0 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-muted group-hover:text-brand-bright transition-colors">
                  {flow.icon}
                </span>
                <div>
                  <h4 className="font-display text-base font-semibold text-white leading-tight">
                    {flow.title}
                  </h4>
                  <p className="label text-muted/55 mt-1">{flow.category}</p>
                </div>
              </div>

              <p className="sm:col-span-6 text-sm text-muted font-light leading-relaxed">
                {flow.description}
              </p>

              <span className="sm:col-span-2 inline-flex items-center gap-1.5 text-xs font-semibold text-muted/75 group-hover:text-brand-bright transition-colors sm:justify-end">
                Case study <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <Suspense fallback={null}>
        {selected && (
          <CaseStudyModal
            isOpen={!!selected}
            onClose={() => setSelected(null)}
            solution={selected}
          />
        )}
      </Suspense>
    </section>
  );
}

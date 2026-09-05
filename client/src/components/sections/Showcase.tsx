import { motion } from "framer-motion";
import {
  Bot,
  Share2,
  Workflow,
  ArrowRight,
  Database,
  Video,
  Zap,
  Target,
  Eye,
  Layers,
  GraduationCap,
  MessageSquare,
  Building2,
  ExternalLink,
  Lock,
} from "lucide-react";
import { lazy, Suspense, useState, type ReactNode } from "react";

// Both modals are heavy (React Flow, an embedded iframe) and only appear after a
// click, so they are kept out of the first-load bundle.
const WorkflowViewer = lazy(() => import("../WorkflowViewer"));
const CaseStudyModal = lazy(() => import("../CaseStudyModal"));

export interface Solution {
  title: string;
  category: string;
  description: string;
  stack: string;
  features: string[];
  details: { realTime: string; bestFor: string };
  caseStudy: { problem: string; solution: string; result: string };
  icon: ReactNode;
  gradient: string;
  borderHover: string;
  /** Present only for work that is an n8n graph; drives the "Map" button. */
  workflowPath?: string;
  /** Public URL, where one exists. */
  liveUrl?: string;
  /** Why there is no public link — client systems sit behind a login. */
  privateNote?: string;
}

const products: Solution[] = [
  {
    title: "getvoicium",
    category: "Solo SaaS",
    description:
      "A multi-tenant AI chatbot platform that answers customers in Bangla across Facebook, Instagram, WhatsApp and a website widget. Built solo, from architecture to deployment.",
    stack: "Next.js · Supabase (pgvector) · Google Gemini · RAG · Vercel",
    liveUrl: "https://getvoicium.com",
    features: [
      "Per-client knowledge base with RAG retrieval",
      "Product catalogue",
      "Broadcast messaging",
      "Billing and subscriptions",
      "Embeddable website widget",
      "Multi-tenant data isolation",
    ],
    details: {
      realTime: "A business connects a channel and its bot answers in Bangla.",
      bestFor: "Small businesses selling through Meta channels.",
    },
    caseStudy: {
      problem:
        "Bangladeshi businesses answer the same handful of questions all day on Messenger and WhatsApp — price, stock, delivery — usually in Bangla, usually outside office hours. Off-the-shelf chatbots answer in English, from generic knowledge, and need a developer to install.",
      solution:
        "A complete multi-tenant SaaS built solo: schema and tenant isolation on Supabase, retrieval over pgvector so each client's own catalogue and policies answer the question, Gemini for the reply, and an embeddable widget alongside the Meta channels. Broadcasts and billing are part of the product, not bolted on.",
      result:
        "Owners get a bot that answers from their real data in their customers' language, and set it up themselves rather than hiring someone to wire it.",
    },
    icon: <Layers className="w-7 h-7" />,
    gradient: "from-indigo-900/40 via-indigo-900/10 to-transparent",
    borderHover: "hover:border-indigo-500/50",
  },
  {
    title: "ezpzbd",
    category: "AI EdTech",
    description:
      "An AI tutoring platform for HSC students, with several AI tutors and voice explanations in both Bangla and English. I trained the tutors on the learning content and question data.",
    stack: "AI tutors · Voice explanation · Board-exam question data",
    liveUrl: "https://ezpzbd.com",
    features: [
      "Multiple subject-specific AI tutors",
      "Voice explanations in Bangla and English",
      "Trained on board-exam solutions",
      "Physics, Chemistry and Math coverage",
    ],
    details: {
      realTime: "A student asks a question and hears the method explained.",
      bestFor: "HSC students preparing for board exams.",
    },
    caseStudy: {
      problem:
        "HSC students need someone to explain the method, not just supply the answer, and private tutoring is out of reach for most families. A general chatbot does not know the board syllabus or how its questions are marked.",
      solution:
        "As part of the engineering team I trained the platform's AI tutors on the learning content and past board-exam question data, so answers follow the syllabus and the expected solution method — with voice explanation in Bangla as well as English.",
      result:
        "Students get subject tutors for Physics, Chemistry and Math that explain in the language they think in.",
    },
    icon: <GraduationCap className="w-7 h-7" />,
    gradient: "from-cyan-900/40 via-cyan-900/10 to-transparent",
    borderHover: "hover:border-cyan-500/50",
  },
  {
    title: "Champion Sales SaaS",
    category: "WhatsApp Automation",
    description:
      "A SaaS that runs a sales team and its head office entirely through WhatsApp — daily reminders, lead management and rep performance ratings. I built the WhatsApp API integration.",
    stack: "WhatsApp Cloud API · Automation workflows · Web dashboard",
    features: [
      "Automated daily reminders to reps",
      "Lead capture and management",
      "Sales-team performance tracking",
      "Head-office reporting",
    ],
    details: {
      realTime: "Reps get their prompts where they already are — on WhatsApp.",
      bestFor: "Field sales teams and their head office.",
    },
    caseStudy: {
      problem:
        "A field sales team will not open a CRM. Any tool that asks reps to log in somewhere new collects nothing, so head office ends up chasing updates by phone.",
      solution:
        "Put the whole loop inside WhatsApp. I built the WhatsApp API integration that sends each rep their daily reminders, captures leads from the replies, and feeds performance data back to head office.",
      result:
        "The team reports from the app they already use all day, and head office sees lead status and rep ratings without asking for them. The product is the client's own system and sits behind their login, so there is no public demo — happy to walk through it in a call.",
    },
    privateNote: "Client system — access by login only",
    icon: <MessageSquare className="w-7 h-7" />,
    gradient: "from-green-900/40 via-green-900/10 to-transparent",
    borderHover: "hover:border-green-500/50",
  },
  {
    title: "Nandi Real Estate ERP",
    category: "Full-Stack ERP · Ongoing",
    description:
      "A full-stack ERP system for a real-estate development company, covering the operational side of the business. Currently in development.",
    stack: "Full-stack web application · Relational database",
    features: [
      "Full-stack build",
      "Operational workflows for property development",
      "Relational data model",
      "In active development",
    ],
    details: {
      realTime: "Replaces the spreadsheets a development company runs on.",
      bestFor: "Real-estate developers.",
    },
    caseStudy: {
      problem:
        "A property development company's operations spread across spreadsheets and message threads, so no one has a single view of a project's state.",
      solution:
        "A full-stack ERP built around how the business actually works, started during my time at Autolinium and continuing now.",
      result:
        "Still in development, and it is the client's internal system behind their own login, so there is nothing public to link. Happy to walk through the architecture in a call.",
    },
    privateNote: "Client system — access by login only",
    icon: <Building2 className="w-7 h-7" />,
    gradient: "from-orange-900/40 via-orange-900/10 to-transparent",
    borderHover: "hover:border-orange-500/50",
  },
];

const workflows: Solution[] = [
  {
    title: "E-Commerce Chatbot",
    category: "Retail",
    description:
      "A Messenger sales agent that answers from live inventory instead of from model memory, and remembers the conversation between messages.",
    stack:
      "n8n · Gemini · OpenAI · Supabase vector store · PostgreSQL · Google Sheets",
    features: [
      "Supabase vector retrieval for price and stock",
      "PostgreSQL conversation memory",
      "Text, image and voice input routed by type",
      "Order details written to Google Sheets",
    ],
    details: {
      realTime: "Answers product questions and captures the order.",
      bestFor: "Retailers selling through Messenger.",
    },
    caseStudy: {
      problem:
        "A bot that answers price and stock from what the model happens to remember will be confidently wrong, and one that treats every message separately loses the thread mid-order.",
      solution:
        "Input routing sends text, image and voice each to the right model. A Supabase vector store grounds every price and stock answer in real data, and PostgreSQL-backed chat memory carries the conversation across messages. Confirmed orders are written straight to Google Sheets.",
      result:
        "38 nodes handling enquiry to order without a person in the loop. Open the map to trace it.",
    },
    icon: <Workflow className="w-7 h-7" />,
    gradient: "from-emerald-900/40 via-emerald-900/10 to-transparent",
    borderHover: "hover:border-emerald-500/50",
    workflowPath: "/workflows/E-commerce chatbot.json",
  },
  {
    title: "Agency Chatbot & Booking",
    category: "Service Businesses",
    description:
      "An assistant that handles enquiries, keeps context across the conversation, and books the meeting into Google Calendar itself.",
    stack: "n8n · Gemini · Google Calendar · Google Sheets · Telegram",
    features: [
      "Conversational memory buffer",
      "Google Calendar booking as an agent tool",
      "Enquiry logging to Google Sheets",
      "Telegram alerts on new bookings",
    ],
    details: {
      realTime: "Enquiry to a confirmed calendar slot, unattended.",
      bestFor: "Agencies and service businesses.",
    },
    caseStudy: {
      problem:
        "Every enquiry needs the same sequence — qualify, answer, offer a slot, confirm, record it. Done by hand it is slow, and the follow-up is the step that gets dropped.",
      solution:
        "A Gemini agent with a memory buffer so the thread survives, Google Calendar exposed to it as a tool so it can check and book directly, Sheets for the record and Telegram for the alert.",
      result:
        "31 nodes turning a message into a booked meeting. Open the map to trace it.",
    },
    icon: <Bot className="w-7 h-7" />,
    gradient: "from-blue-900/40 via-blue-900/10 to-transparent",
    borderHover: "hover:border-blue-500/50",
    workflowPath: "/workflows/Agency cahtbot.json",
  },
  {
    title: "RAG Knowledgebase Chatbot",
    category: "Knowledge Management",
    description:
      "A document pipeline and retrieval chatbot: files land in Google Drive, get chunked and embedded into a vector store, and answers come back with the source behind them.",
    stack:
      "n8n · Google Drive · OpenAI embeddings · Supabase vector store · PostgreSQL",
    features: [
      "Google Drive document ingestion",
      "Text splitting and embedding pipeline",
      "Supabase vector store retrieval",
      "Scheduled re-indexing",
    ],
    details: {
      realTime: "Support answers drawn from your own documentation.",
      bestFor: "Support teams and technical SaaS.",
    },
    caseStudy: {
      problem:
        "Ask a general model about your product and it answers from training data. It sounds right and often is not, which is worse than no answer when the subject is your own documentation.",
      solution:
        "Documents are pulled from Google Drive, extracted, split and embedded into a Supabase vector store on a schedule. Questions are answered from the passages actually retrieved, not from model memory.",
      result:
        "34 nodes covering ingestion and retrieval in one graph. Open the map to trace it.",
    },
    icon: <Database className="w-7 h-7" />,
    gradient: "from-amber-900/40 via-amber-900/10 to-transparent",
    borderHover: "hover:border-amber-500/50",
    workflowPath: "/workflows/Rag Chatbot with Knowledgebase Management.json",
  },
  {
    title: "Facebook Auto-Posting",
    category: "Content Automation",
    description:
      "A scheduled pipeline that writes the post with Gemini, publishes it through the Graph API, logs it and reports back on Telegram.",
    stack: "n8n · Gemini · Facebook Graph API · Google Sheets · Telegram",
    features: [
      "Schedule-triggered, no manual step",
      "Gemini writes the copy",
      "Publishes via the Facebook Graph API",
      "Every post logged, status alerted to Telegram",
    ],
    details: {
      realTime: "Posts go out on schedule whether or not anyone logs in.",
      bestFor: "Creators and small businesses.",
    },
    caseStudy: {
      problem:
        "Consistent posting is what moves a page and it is the first thing to slip. Schedulers fix the timing but still need someone to write the post.",
      solution:
        "A schedule trigger starts the run, a Gemini agent with a memory buffer writes the copy, the Graph API publishes it, Google Sheets keeps the log and Telegram reports whether it worked.",
      result:
        "21 nodes publishing without anyone opening the app. Open the map to trace it.",
    },
    icon: <Share2 className="w-7 h-7" />,
    gradient: "from-purple-900/40 via-purple-900/10 to-transparent",
    borderHover: "hover:border-purple-500/50",
    workflowPath: "/workflows/Facebook Autopost with Ai.json",
  },
  {
    title: "UGC Video Ad Pipeline",
    category: "AI Advertising",
    description:
      "Reads product rows from a spreadsheet, writes the ad copy with an LLM, and drives a video-generation API through to a finished UGC-style ad.",
    stack: "n8n · OpenRouter · OpenAI · Video generation API · Google Sheets",
    features: [
      "Spreadsheet-driven input",
      "LLM-written ad copy",
      "Polls the video API until the render is ready",
      "Scheduled batch runs",
    ],
    details: {
      realTime: "A product row becomes a finished video ad.",
      bestFor: "Marketing agencies and advertisers.",
    },
    caseStudy: {
      problem:
        "UGC-style video converts, but producing it means briefing a creator and waiting. Testing ten variations of an angle is not realistic on that cycle.",
      solution:
        "A scheduled graph reads product data from Google Sheets, writes and optimises the copy through OpenRouter and OpenAI, then calls a video-generation API and waits on it until the render is ready.",
      result:
        "28 nodes turning a spreadsheet into video ads. Open the map to trace it.",
    },
    icon: <Video className="w-7 h-7" />,
    gradient: "from-rose-900/40 via-rose-900/10 to-transparent",
    borderHover: "hover:border-rose-500/50",
    workflowPath: "/workflows/UGC Ads Veo & Sora.json",
  },
];

export default function Showcase() {
  const [selectedWorkflow, setSelectedWorkflow] = useState<unknown>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [viewerTitle, setViewerTitle] = useState("");
  const [loadingPath, setLoadingPath] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openWorkflow = async (
    e: React.MouseEvent,
    path: string,
    title: string,
  ) => {
    e.stopPropagation();
    setLoadingPath(path);
    setLoadError(null);
    setViewerTitle(title);
    try {
      const response = await fetch(path);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setSelectedWorkflow(await response.json());
      setIsViewerOpen(true);
    } catch (error) {
      console.error("Failed to load workflow:", error);
      setLoadError(
        `The "${title}" workflow map could not be loaded. Please try again.`,
      );
    } finally {
      setLoadingPath(null);
    }
  };

  const openCaseStudy = (solution: Solution) => {
    setSelectedSolution(solution);
    setIsModalOpen(true);
  };

  const renderCard = (solution: Solution, idx: number) => (
    <motion.div
      key={solution.title}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
      onClick={() => openCaseStudy(solution)}
      className={`group relative bg-slate-900/40 backdrop-blur-xl rounded-[2rem] border border-white/5 overflow-hidden transition-all duration-500 ${solution.borderHover} hover:shadow-2xl hover:-translate-y-2 flex flex-col cursor-pointer`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-b ${solution.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
      />

      <div className="p-7 sm:p-8 relative z-10 flex flex-col flex-grow">
        <div className="flex items-center justify-between gap-3 mb-7">
          <div className="w-14 h-14 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-500">
            {solution.icon}
          </div>
          <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-300 border border-white/10 text-right">
            {solution.category}
          </span>
        </div>

        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
            {solution.title}
          </h3>
          {solution.liveUrl && (
            <a
              href={solution.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-blue-400 hover:text-blue-300 transition-colors"
            >
              Live <ExternalLink className="w-3 h-3" />
            </a>
          )}
          {solution.privateNote && (
            <span
              title={solution.privateNote}
              className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-slate-500"
            >
              <Lock className="w-3 h-3" /> Private
            </span>
          )}
        </div>

        <p className="text-sm text-slate-400 font-light leading-relaxed mb-6">
          {solution.description}
        </p>

        <p className="text-[10px] font-bold text-slate-500 tracking-wide mb-6 leading-relaxed">
          {solution.stack}
        </p>

        <div className="mb-7 space-y-4 bg-white/[0.03] rounded-2xl p-5 border border-white/5 mt-auto">
          <div className="flex items-start gap-3">
            <Zap className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">
                In practice
              </p>
              <p className="text-[11px] text-slate-300 leading-normal">
                {solution.details.realTime}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Target className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">
                Built for
              </p>
              <p className="text-[11px] text-slate-300 leading-normal font-medium">
                {solution.details.bestFor}
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-6 border-t border-white/10">
          {solution.workflowPath && (
            <button
              onClick={(e) =>
                openWorkflow(e, solution.workflowPath!, solution.title)
              }
              disabled={loadingPath === solution.workflowPath}
              className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white transition-all active:scale-[0.98] disabled:opacity-50"
            >
              <ArrowRight className="w-3 h-3" />
              <span>
                {loadingPath === solution.workflowPath ? "Loading" : "Map"}
              </span>
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              openCaseStudy(solution);
            }}
            className="flex-1 py-3 bg-blue-600/10 hover:bg-blue-600 border border-blue-500/20 rounded-xl flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white transition-all active:scale-[0.98]"
          >
            <Eye className="w-3 h-3" />
            <span>Case study</span>
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section
      id="solutions"
      className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-slate-950"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center mb-14 sm:mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-blue-500 font-bold tracking-widest uppercase text-xs sm:text-sm mb-4 block">
              Selected Work
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 tracking-tighter uppercase text-white">
              Products &amp; Automations
            </h2>
            <div className="w-20 h-1.5 bg-blue-500 rounded-full mx-auto mb-6" />
            <p className="text-slate-400 max-w-2xl font-light text-base sm:text-lg">
              Four applications and five production workflows. Open any card for
              the case study, or open a map to trace the workflow node by node.
            </p>
          </motion.div>
        </div>

        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-8">
          Applications
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {products.map(renderCard)}
        </div>

        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-8">
          n8n Automation Workflows
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {workflows.map(renderCard)}
        </div>
      </div>

      {loadError && (
        <p
          role="alert"
          className="max-w-xl mx-auto mt-10 text-center text-sm text-rose-300 bg-rose-500/10 border border-rose-500/20 rounded-2xl px-6 py-4 relative z-10"
        >
          {loadError}
        </p>
      )}

      <Suspense fallback={null}>
        {isViewerOpen && (
          <WorkflowViewer
            workflowJson={selectedWorkflow}
            isOpen={isViewerOpen}
            onClose={() => setIsViewerOpen(false)}
            title={viewerTitle}
          />
        )}

        {isModalOpen && (
          <CaseStudyModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            solution={selectedSolution}
          />
        )}
      </Suspense>
    </section>
  );
}

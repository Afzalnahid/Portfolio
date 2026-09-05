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
  /** Absent for work that is not an n8n graph, which hides the "Map" button. */
  workflowPath?: string;
}

const solutions: Solution[] = [
  {
    title: "Multi-Tenant AI Chatbot Platform",
    category: "SaaS Product",
    description:
      "A self-serve platform that lets small businesses deploy AI customer-service agents to Facebook, Instagram, WhatsApp and their own website — built end to end, from database schema to the embeddable widget.",
    stack: "Next.js 14 · Supabase pgvector · Gemini · Meta Graph API · Vercel",
    features: [
      "Per-tenant knowledge bases with vector retrieval",
      "Database-level isolation on every query",
      "One-click OAuth channel connection",
      "Shadow-DOM widget with origin allow-listing",
      "Broadcast messaging with segment targeting",
      "Payment-gateway integration",
    ],
    details: {
      realTime:
        "Businesses connect a channel and go live without touching a token.",
      bestFor: "Small businesses running ecommerce or a service agency.",
    },
    caseStudy: {
      problem:
        "Small businesses want an AI agent on their channels, but every existing route demands developer work: finding page IDs, pasting access tokens, wiring webhooks. Most owners stop at the first configuration screen.",
      solution:
        "A full multi-tenant SaaS — schema design, tenant isolation enforced at the database on every query, REST endpoints, an admin dashboard, an embeddable Shadow-DOM widget, and OAuth onboarding that asks the owner for nothing but a click. One codebase serves two business models, ecommerce and service agency.",
      result:
        "Owners connect Facebook, Instagram, WhatsApp or their website themselves. Answers are grounded in each tenant's own pricing, stock and policy data through pgvector retrieval rather than model memory.",
    },
    icon: <Layers className="w-7 h-7" />,
    gradient: "from-indigo-900/40 via-indigo-900/10 to-transparent",
    borderHover: "hover:border-indigo-500/50",
  },
  {
    title: "Multimodal E-Commerce Chatbot",
    category: "AI & Commerce",
    description:
      "An autonomous 24/7 sales agent on Messenger for premium retail brands. Input routing detects text, image, voice or video and hands each to the right model.",
    stack:
      "n8n · Gemini 2.5 Pro · GPT-4o-mini · Whisper-large-v3 (Groq) · Supabase",
    features: [
      "Intelligent input routing",
      "Vision-language product recognition",
      "Bengali and Banglish voice transcription",
      "Supabase RAG for live price and stock",
    ],
    details: {
      realTime: "Customers search inventory with a photo or a voice note.",
      bestFor: "Retailers and premium brands.",
    },
    caseStudy: {
      problem:
        "Customers send a blurry photo of a product, or a Bengali voice note, and expect a price. A text-only bot cannot read either, so every one of those messages waits for a human.",
      solution:
        "Input routing detects the message type first. Vision-language models identify product motifs and finishes from low-quality photos; Whisper-large-v3 transcribes Bengali and Banglish voice notes; a Supabase RAG layer grounds every price and stock answer in live data. PostgreSQL conversation buffering returns one coherent reply instead of a burst of fragments.",
      result:
        "The agent answers photo and voice enquiries unattended and writes the customer's name, phone and delivery address straight into Google Sheets for fulfilment.",
    },
    icon: <Workflow className="w-7 h-7" />,
    gradient: "from-emerald-900/40 via-emerald-900/10 to-transparent",
    borderHover: "hover:border-emerald-500/50",
    workflowPath: "/workflows/E-commerce chatbot.json",
  },
  {
    title: "Agency Chatbot & Booking Workflow",
    category: "Customer Relations",
    description:
      "A client-facing assistant for service businesses that handles enquiries, remembers context across sessions, syncs to the CRM and runs a complete booking sequence.",
    stack: "n8n · GoHighLevel · Google Calendar · Gemini · Supabase",
    features: [
      "Automated booking sequence",
      "Contextual memory across sessions",
      "CRM synchronisation",
      "Automatic meeting-link generation",
    ],
    details: {
      realTime: "Handles Facebook and web enquiries, then books the meeting.",
      bestFor: "Agencies and service businesses.",
    },
    caseStudy: {
      problem:
        "Enquiries arrive at every hour and each one needs the same sequence: qualify, answer, offer a slot, confirm, add to the CRM. Done by hand it is slow, and the follow-up is the step most often dropped.",
      solution:
        "An n8n assistant with a conversational memory buffer so the thread survives across sessions, GoHighLevel sync so nothing sits outside the CRM, and a booking sequence that checks Google Calendar, generates the meeting link and sends the confirmation itself.",
      result:
        "Enquiry to confirmed booking runs unattended, and the client record exists in the CRM before anyone opens it.",
    },
    icon: <Bot className="w-7 h-7" />,
    gradient: "from-blue-900/40 via-blue-900/10 to-transparent",
    borderHover: "hover:border-blue-500/50",
    workflowPath: "/workflows/Agency cahtbot.json",
  },
  {
    title: "RAG Chatbot with Knowledgebase",
    category: "Knowledge Management",
    description:
      "A document ingestion and semantic retrieval system that gives support teams accurate, source-grounded answers from their own documentation.",
    stack: "Supabase Vector Store · Gemini / OpenAI · n8n",
    features: [
      "Document ingestion pipeline",
      "Semantic search over a vector store",
      "Answers grounded in proprietary docs",
      "Reduced hallucination through data grounding",
    ],
    details: {
      realTime: "Live technical support drawn from private documentation.",
      bestFor: "Support teams and technical SaaS.",
    },
    caseStudy: {
      problem:
        "A general model answers questions about your product from what it absorbed during training. It sounds confident and is often wrong, which is worse than no answer at all when the subject is your own documentation.",
      solution:
        "A retrieval-augmented pipeline: documents are chunked and embedded into a Supabase vector store, and every question is answered from the passages that are actually retrieved rather than from model memory.",
      result:
        "Support answers cite the team's real documentation, and hallucinated answers drop because the model is given the source instead of being asked to recall it.",
    },
    icon: <Database className="w-7 h-7" />,
    gradient: "from-amber-900/40 via-amber-900/10 to-transparent",
    borderHover: "hover:border-amber-500/50",
    workflowPath: "/workflows/Rag Chatbot with Knowledgebase Management.json",
  },
  {
    title: "Autonomous Social Content Engine",
    category: "Content Automation",
    description:
      "A self-running content pipeline that publishes three times a day, analyses what worked, writes the caption and generates the matching visual.",
    stack: "n8n · Gemini · Facebook Graph API · Telegram · Google Sheets",
    features: [
      "Engagement analysis before writing",
      "Bengali caption generation",
      "A 1080x1080 visual per post",
      "Topic and style rotation to avoid repetition",
    ],
    details: {
      realTime: "Publishes three times daily without anyone opening the app.",
      bestFor: "Creators and small businesses.",
    },
    caseStudy: {
      problem:
        "Consistent posting is what moves a page, and it is the first thing to slip. Scheduling tools help with the timing but still need someone to write the copy and make the image.",
      solution:
        "A pipeline that reads recent post engagement, writes Bengali captions in response to it, generates a matching 1080x1080 visual for each post, and rotates topic and visual style so the feed does not repeat itself. Every post is logged centrally with real-time Telegram status alerts.",
      result:
        "Three posts a day publish on their own, and a Telegram message says what went out and whether it succeeded.",
    },
    icon: <Share2 className="w-7 h-7" />,
    gradient: "from-purple-900/40 via-purple-900/10 to-transparent",
    borderHover: "hover:border-purple-500/50",
    workflowPath: "/workflows/Facebook Autopost with Ai.json",
  },
  {
    title: "UGC Video Ad Automation",
    category: "AI Advertising",
    description:
      "Converts product data sheets into influencer-style video advertisements with optimised ad copy, taking manual creative production out of the campaign cycle.",
    stack: "Kie.ai (Veo / Sora) · GPT-4o · HeyGen · Google Sheets API",
    features: [
      "AI video generation",
      "Ad copy optimisation",
      "Spreadsheet-driven input",
      "High-engagement UGC formats",
    ],
    details: {
      realTime: "Turns a product sheet row into a finished video ad.",
      bestFor: "Marketing agencies and advertisers.",
    },
    caseStudy: {
      problem:
        "UGC-style video converts, but producing it means briefing a creator, waiting, reviewing and re-shooting. Testing ten variations of an angle is not realistic on that cycle.",
      solution:
        "A pipeline that reads product data from Google Sheets, writes and optimises the ad copy with GPT-4o, and generates influencer-style video through Veo, Sora and HeyGen.",
      result:
        "Creative production leaves the campaign cycle, so variations can be generated and tested instead of commissioned one at a time.",
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

  return (
    <section
      id="solutions"
      className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-slate-950"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center mb-14 sm:mb-20 text-center">
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
              Systems I have shipped
            </h2>
            <div className="w-20 h-1.5 bg-blue-500 rounded-full mx-auto mb-6" />
            <p className="text-slate-400 max-w-2xl font-light text-base sm:text-lg">
              One SaaS product and five production automations. Open any card for
              the case study, or open the map to trace the workflow node by node.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {solutions.map((solution, idx) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (idx % 3) * 0.12 }}
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

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 leading-tight">
                  {solution.title}
                </h3>

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
                        {loadingPath === solution.workflowPath
                          ? "Loading"
                          : "Map"}
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
          ))}
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

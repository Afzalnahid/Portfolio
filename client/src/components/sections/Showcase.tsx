import { motion } from "framer-motion";
import { Bot, Share2, Workflow, ArrowRight, CheckCircle2, Database, Video, Zap, Cpu, Target, Eye } from "lucide-react";
import { useState } from "react";
import WorkflowViewer from "../WorkflowViewer";
import CaseStudyModal from "../CaseStudyModal";

const solutions = [
  {
    title: "Agency Chatbot",
    category: "Customer Relations",
    description:
      "An intelligent chatbot designed for agencies to manage complex bookings, answer client queries, and handle customer relations securely.",
    features: [
      "Automated Booking Workflows",
      "Contextual Memory Buffer",
      "CRM Integration",
    ],
    details: {
      realTime: "Instantly handles Facebook/Web messages & bookings.",
      credentials: "FB Graph API, Google Gemini, Supabase.",
      bestFor: "Agencies & Service Businesses.",
    },
    icon: <Bot className="w-7 h-7" />,
    accent: "bg-blue-500",
    gradient: "from-blue-900/40 via-blue-900/10 to-transparent",
    borderHover: "hover:border-blue-500/50",
    workflowPath: "/workflows/Agency cahtbot.json",
  },
  {
    title: "E-Commerce Chatbot",
    category: "AI & Commerce",
    description:
      "An advanced ecosystem for retail brands utilizing Gemini 2.5 Pro for visual discovery, Whisper-large-v3 for voice commerce, and Supabase RAG for real-time inventory",
    features: [
      "Intelligent Input Routing",
      "Vision-Language Models",
      "Voice Commerce Integration",
    ],
    details: {
      realTime: "Users search inventory via photos or voice notes.",
      credentials: "Gemini 2.5 Pro, Groq (Whisper), Supabase.",
      bestFor: "Retailers & Luxury Brands.",
    },
    icon: <Workflow className="w-7 h-7" />,
    accent: "bg-emerald-500",
    gradient: "from-emerald-900/40 via-emerald-900/10 to-transparent",
    borderHover: "hover:border-emerald-500/50",
    workflowPath: "/workflows/E-commerce chatbot.json",
  },
  {
    title: "Facebook Autopost with AI",
    category: "Content Automation",
    description:
      "A fully automated content pipeline that analyzes engagement, generates AI copy in multiple languages, and creates high-quality visual assets. Integrates directly with social APIs for seamless scheduling",
    features: [
      "AI Copywriting Pipeline",
      "Dynamic Visual Creation",
      "Automated Multi-format Scheduling",
    ],
    details: {
      realTime: "Scheduled AI research & unique content generation.",
      credentials: "FB Page API, Gemini, HuggingFace, Telegram.",
      bestFor: "Creators & Small Businesses.",
    },
    icon: <Share2 className="w-7 h-7" />,
    accent: "bg-purple-500",
    gradient: "from-purple-900/40 via-purple-900/10 to-transparent",
    borderHover: "hover:border-purple-500/50",
    workflowPath: "/workflows/Facebook Autopost with Ai.json",
  },
  {
    title: "RAG Chatbot with Knowledgebase",
    category: "Knowledge Management",
    description:
      "A specialized chatbot leveraging Retrieval-Augmented Generation (RAG) connected to a Vector Store to provide highly accurate, grounded answers from your proprietary data.",
    features: [
      "Vector Store Integration",
      "Real-time Data Access",
      "Reduced AI Hallucinations",
    ],
    details: {
      realTime: "Live technical support based on private docs.",
      credentials: "OpenAI/Gemini, Supabase Vector Store (RAG).",
      bestFor: "Support Teams & Technical SaaS.",
    },
    icon: <Database className="w-7 h-7" />,
    accent: "bg-amber-500",
    gradient: "from-amber-900/40 via-amber-900/10 to-transparent",
    borderHover: "hover:border-amber-500/50",
    workflowPath: "/workflows/Rag Chatbot with Knowledgebase Management.json",
  },
  {
    title: "UGC Ads Veo & Sora",
    category: "AI Advertising",
    description:
      "Automated generation pipeline for User-Generated Content (UGC) style video advertisements leveraging advanced video AI models for high engagement and conversion.",
    features: [
      "AI Video Generation",
      "Ad Copy Optimization",
      "High Engagement Formats",
    ],
    details: {
      realTime: "Converts product sheets into influencer-style ads.",
      credentials: "Kie.ai (Veo/Sora), G-Sheets API, GPT-4o.",
      bestFor: "Marketing Agencies & Advertisers.",
    },
    icon: <Video className="w-7 h-7" />,
    accent: "bg-rose-500",
    gradient: "from-rose-900/40 via-rose-900/10 to-transparent",
    borderHover: "hover:border-rose-500/50",
    workflowPath: "workflows/UGC Ads Veo & Sora.json",
  },
];

export default function Showcase() {
  const [selectedWorkflow, setSelectedWorkflow] = useState<any>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [viewerTitle, setViewerTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const [selectedSolution, setSelectedSolution] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openWorkflow = async (e: React.MouseEvent, path: string, title: string) => {
    e.stopPropagation();
    setIsLoading(true);
    setViewerTitle(title);
    try {
      const response = await fetch(path);
      const data = await response.json();
      setSelectedWorkflow(data);
      setIsViewerOpen(true);
    } catch (error) {
      console.error("Failed to load workflow:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openCaseStudy = (solution: any) => {
    setSelectedSolution(solution);
    setIsModalOpen(true);
  };

  return (
    <section
      id="solutions"
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-slate-950"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-blue-500 font-bold tracking-widest uppercase text-sm mb-4 block">
              Product Showcase
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter uppercase text-white">
              n8n workflows
            </h2>
            <div className="w-20 h-1.5 bg-blue-500 rounded-full mx-auto mb-6" />
            <p className="text-slate-400 max-w-2xl font-light text-lg">
              Production-ready automation ecosystems designed to scale operations,
              reduce manual overhead, and drive intelligent engagement.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {solutions.map((solution, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              onClick={() => openCaseStudy(solution)}
              className={`group relative bg-slate-900/40 backdrop-blur-xl rounded-[2rem] border border-white/5 overflow-hidden transition-all duration-500 ${solution.borderHover} hover:shadow-2xl hover:-translate-y-2 flex flex-col cursor-pointer`}
            >
              <div className={`absolute inset-0 bg-gradient-to-b ${solution.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

              <div className="p-8 relative z-10 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-8">
                  <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-500`}>
                    {solution.icon}
                  </div>
                  <div className="flex items-center gap-2">
                     <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-300 border border-white/10">
                        {solution.category}
                      </span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
                  {solution.title}
                </h3>
                
                <div className="mb-8 space-y-4 bg-white/[0.03] rounded-2xl p-5 border border-white/5">
                  <div className="flex items-start gap-3">
                    <Zap className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">Real-Time Ops</p>
                      <p className="text-[11px] text-slate-300 leading-normal">{solution.details.realTime}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Target className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">Target Audience</p>
                      <p className="text-[11px] text-slate-300 leading-normal font-medium">{solution.details.bestFor}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-auto pt-6 border-t border-white/10">
                   <button 
                    onClick={(e) => openWorkflow(e, solution.workflowPath, solution.title)}
                    disabled={isLoading}
                    className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white transition-all active:scale-[0.98] disabled:opacity-50"
                  >
                    <ArrowRight className="w-3 h-3" />
                    <span>{isLoading ? "..." : "Map"}</span>
                  </button>
                  <button 
                    className="flex-1 py-3 bg-blue-600/10 hover:bg-blue-600 border border-blue-500/20 rounded-xl flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white transition-all active:scale-[0.98]"
                  >
                    <Eye className="w-3 h-3" />
                    <span>Story</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <WorkflowViewer 
        workflowJson={selectedWorkflow}
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        title={viewerTitle}
      />

      <CaseStudyModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        solution={selectedSolution}
      />
    </section>
  );
}

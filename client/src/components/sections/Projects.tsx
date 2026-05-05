const projects = [
  {
    title: "Multimodal E-Commerce Chatbot",
    description:
      "Advanced ecosystem for retail brands using Gemini 2.5 Pro for visual discovery, Whisper-large-v3 for voice commerce, and Supabase RAG for real-time inventory.",
    tags: ["Gemini 2.5 Pro", "Whisper", "Supabase", "n8n"],
    icon: "💎",
    color: "from-blue-600/20 to-transparent",
  },
  {
    title: "Booking & Consultation Workflow",
    description: (
      <>
        Complex booking sequence for{" "}
        <a
          href="https://www.facebook.com/profile.php?id=61586879968082"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline"
        >
          AutoLogic Systems
        </a>{" "}
        integrating Google Calendar and automated meeting link generation.
      </>
    ),
    tags: ["n8n", "GHL", "Google Calendar"],
    icon: "📅",
    color: "from-blue-600/20 to-transparent",
  },
  {
    title: "AI Advertising (UGC Ads)",
    description:
      "Created AI-driven screen recordings and video generation ads using HeyGen and Seedance 2.0 for high engagement.",
    tags: ["AI", "HeyGen", "Seedance 2.0"],
    icon: "🎬",
    color: "from-purple-600/20 to-transparent",
  },
  {
    title: "Internal Automation Ecosystem",
    description:
      "Comprehensive automation infrastructure to manage professional services and streamline client engagement.",
    tags: ["n8n", "Workflow Design", "Automation"],
    icon: "⚙️",
    color: "from-cyan-600/20 to-transparent",
  },
  {
    title: "Vector Store Migration",
    description:
      "Expert migration of complex project data to Supabase vector stores for grounded AI database responses.",
    tags: ["Supabase", "AI", "Data Migration"],
    icon: "🧬",
    color: "from-emerald-600/20 to-transparent",
  },
  {
    title: "AI Automation Intern Tasks",
    description: (
      <>
        Executing SaaS-based project workflows and AI-driven automation at{" "}
        <a
          href="https://www.autolinium.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white font-medium hover:underline"
        >
          Autolinium Ltd
        </a>
        .
      </>
    ),
    tags: ["SaaS", "AI Automation", "Autolinium"],
    icon: "🤖",
    color: "from-amber-600/20 to-transparent",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-center tracking-tighter uppercase">
            Featured Projects
          </h2>
          <div className="w-20 h-1.5 bg-purple-500 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="group bg-slate-800/20 rounded-2xl border border-white/5 overflow-hidden hover:border-white/10 transition-all duration-500 hover:-translate-y-1"
            >
              <div
                className={`h-40 bg-gradient-to-br ${project.color} flex items-center justify-center relative overflow-hidden`}
              >
                <div className="text-7xl group-hover:scale-125 transition-transform duration-500 z-10">
                  {project.icon}
                </div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] opacity-50" />
              </div>

              <div className="p-8">
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-purple-400 transition-colors">
                  {project.title}
                </h3>
                <div className="text-slate-400 text-sm mb-6 leading-relaxed font-light">
                  {project.description}
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="px-3 py-1 bg-white/5 text-slate-300 text-[10px] font-bold uppercase tracking-widest rounded-md border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <button className="px-10 py-4 bg-transparent border border-white/10 hover:border-white/30 text-white font-bold rounded-full transition-all duration-300 uppercase tracking-widest text-sm backdrop-blur-sm">
            Explore All Projects
          </button>
        </div>
      </div>
    </section>
  );
}

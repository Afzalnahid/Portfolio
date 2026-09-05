import nahid2 from "@/nahid2.webp";

const experience = [
  {
    role: "AI Automation Intern",
    org: "Autolinium Ltd",
    place: "Software Technology Park, Agrabad, Chittagong",
    period: "Apr 2026 — Present",
    href: "https://www.autolinium.com",
    points: [
      "Build SaaS project workflows and AI-driven automation features inside a production engineering team.",
      "Migrated complex project datasets into Supabase vector stores, producing grounded AI responses and measurably reducing hallucinated answers.",
      "Contribute to workflow architecture, integration testing and the deployment of client-facing features.",
    ],
  },
  {
    role: "Independent AI Solutions Engineer",
    org: "Freelance & Consulting",
    place: "Cumilla, Bangladesh",
    period: "2026 — Present",
    points: [
      "Architected a multi-tenant SaaS chatbot platform on Next.js 14 and Supabase — schema, tenant isolation, API endpoints, admin dashboard, embeddable widget and payment integration.",
      "Designed retrieval-augmented agents over pgvector so pricing, stock and policy answers come from live client data rather than model memory.",
      "Built multimodal systems handling text, image, voice and video across Messenger, Instagram, WhatsApp and web.",
      "Engineered one-click OAuth onboarding so non-technical owners connect their own channels without handling tokens or IDs.",
      "Own the full cycle: discovery, architecture, build, QA, deployment and post-launch monitoring through execution-log analysis.",
    ],
  },
];

const education = [
  {
    period: "2020 — 2024",
    title: "Bachelor of Pharmacy (B.Pharm)",
    place: "Northern University Bangladesh",
    accent: "bg-blue-600",
    accentText: "text-blue-400",
  },
  {
    period: "Graduated 2018",
    title: "Higher Secondary Certificate, Science",
    place: "Comilla Govt. College",
    accent: "bg-slate-700",
    accentText: "text-slate-500",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/30 relative"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      <div className="max-w-6xl mx-auto relative">
        <div className="flex flex-col items-center mb-14 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 text-center tracking-tighter uppercase">
            About Me
          </h2>
          <div className="w-20 h-1.5 bg-blue-600 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
              <img
                src={nahid2}
                alt="Noray Afzal Nahid"
                loading="lazy"
                width={500}
                height={500}
                className="w-full h-auto object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6 text-base sm:text-lg text-slate-400 leading-relaxed font-light">
            <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-white first-letter:mr-3 first-letter:float-left">
              I am an{" "}
              <span className="text-white font-medium">
                AI solutions engineer
              </span>{" "}
              who designs and ships AI-powered software products end to end —
              from database schema and API architecture, through retrieval
              pipelines and model orchestration, to the interfaces clients
              actually use.
            </p>
            <p>
              My work spans{" "}
              <span className="text-blue-400 font-medium">
                multi-tenant SaaS
              </span>{" "}
              development,{" "}
              <span className="text-cyan-400 font-medium">
                retrieval-augmented AI agents
              </span>
              , multimodal chatbots across Meta messaging channels, and the{" "}
              <span className="text-blue-500 font-medium">automation layer</span>{" "}
              that keeps it all running unattended.
            </p>
            <p>
              I am comfortable owning a system from requirement discovery to
              production monitoring — and just as comfortable translating the
              architecture into terms a non-technical stakeholder can act on.
            </p>
          </div>
        </div>

        <div className="mt-16 sm:mt-20">
          <h3 className="text-2xl font-bold mb-8 text-white flex items-center gap-3">
            <span className="w-8 h-px bg-blue-500" /> Experience
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {experience.map((job) => (
              <div
                key={job.role}
                className="relative pl-6 border-l border-slate-800"
              >
                <div className="absolute -left-1.5 top-1.5 w-3 h-3 bg-blue-600 rounded-full border-2 border-slate-950" />
                <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">
                  {job.period}
                </p>
                <h4 className="text-white font-bold text-lg leading-tight">
                  {job.role}
                </h4>
                <p className="text-slate-500 mb-4">
                  {job.href ? (
                    <a
                      href={job.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-slate-300 hover:underline transition-colors"
                    >
                      {job.org}
                    </a>
                  ) : (
                    job.org
                  )}
                  <span className="block text-xs mt-0.5 text-slate-600">
                    {job.place}
                  </span>
                </p>
                <ul className="space-y-3">
                  {job.points.map((point) => (
                    <li
                      key={point}
                      className="text-sm text-slate-400 font-light leading-relaxed flex gap-3"
                    >
                      <span className="mt-2 w-1 h-1 rounded-full bg-blue-500 shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 sm:mt-20 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
              <span className="w-8 h-px bg-blue-500" /> Education
            </h3>
            <ul className="space-y-6">
              {education.map((item) => (
                <li
                  key={item.title}
                  className="relative pl-6 border-l border-slate-800"
                >
                  <div
                    className={`absolute -left-1.5 top-1.5 w-3 h-3 ${item.accent} rounded-full border-2 border-slate-950`}
                  />
                  <p
                    className={`text-sm font-bold ${item.accentText} uppercase tracking-widest mb-1`}
                  >
                    {item.period}
                  </p>
                  <h4 className="text-white font-bold text-lg">{item.title}</h4>
                  <p className="text-slate-500">{item.place}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
              <span className="w-8 h-px bg-blue-500" /> Languages
            </h3>
            <div className="flex flex-wrap gap-4">
              <div className="px-4 py-2 bg-slate-800/50 rounded-lg border border-white/5 text-sm font-medium text-slate-300">
                Bangla — Native
              </div>
              <div className="px-4 py-2 bg-slate-800/50 rounded-lg border border-white/5 text-sm font-medium text-slate-300">
                English — Professional working proficiency
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />
    </section>
  );
}

import nahid2 from "@/nahid2.webp";

const experience = [
  {
    role: "Full-Stack Developer",
    org: "Self-employed",
    place: "Remote",
    period: "Aug 2026 — Present",
    points: [
      "Building getvoicium, a multi-tenant AI chatbot SaaS, solo — from architecture to deployment — with Next.js, Supabase (pgvector), Google Gemini and RAG.",
      "Developing full-stack ERP software for Nandi Real Estate and Developers Pvt. Ltd. (ongoing).",
    ],
  },
  {
    role: "Software Developer Intern (Full-Stack & AI Automation)",
    org: "Autolinium",
    place: "Remote",
    period: "Mar 2026 — Aug 2026",
    href: "https://www.autolinium.com",
    points: [
      "Built automation workflows and internal web dashboards for business operations.",
      "Contributed to ezpzbd.com, an AI-powered EdTech platform tutoring HSC students in Physics, Chemistry and Math — trained the AI tutors on the learning content and question data.",
      "Delivered a WhatsApp-based sales-management SaaS for Champion — built the WhatsApp API integration for automated daily reminders, lead management and sales-team performance tracking.",
      "Developed ERP software for Nandi Real Estate and Developers Pvt. Ltd. (full-stack).",
      "Built Facebook, Instagram, WhatsApp and Telegram chatbots and AI-powered Facebook auto-posting using n8n and LLMs.",
    ],
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
              I am a{" "}
              <span className="text-white font-medium">full-stack developer</span>{" "}
              and AI automation engineer who ships real products. In under a year
              I have built a SaaS platform solo and contributed to four
              production applications.
            </p>
            <p>
              That work spans{" "}
              <span className="text-blue-400 font-medium">
                web development
              </span>{" "}
              (Next.js, Node.js),{" "}
              <span className="text-cyan-400 font-medium">
                backend and database
              </span>{" "}
              work (Supabase, PostgreSQL), and{" "}
              <span className="text-blue-500 font-medium">AI automation</span>{" "}
              with n8n, LLMs and chatbots.
            </p>
            <p>
              I build fast with AI-assisted development and turn business
              problems into working software. I am currently looking for a{" "}
              <span className="text-white font-medium">
                full-time or contract remote role
              </span>
              .
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
                  {job.period} &bull; {job.place}
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
            <div className="relative pl-6 border-l border-slate-800">
              <div className="absolute -left-1.5 top-1.5 w-3 h-3 bg-blue-600 rounded-full border-2 border-slate-950" />
              <p className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-1">
                2020 — 2024
              </p>
              <h4 className="text-white font-bold text-lg">
                B.Pharm (Bachelor of Pharmacy)
              </h4>
              <p className="text-slate-500">Northern University Bangladesh</p>
            </div>
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

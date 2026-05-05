export default function About() {
  return (
    <section
      id="about"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/30 relative"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      <div className="max-w-4xl mx-auto relative">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-center tracking-tighter uppercase">
            About Me
          </h2>
          <div className="w-20 h-1.5 bg-blue-600 rounded-full" />
        </div>

        <div className="space-y-8 text-lg text-slate-400 leading-relaxed font-light">
          <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-white first-letter:mr-3 first-letter:float-left">
            I am Noray Afzal Nahid, an{" "}
            <span className="text-white font-medium">Automation Expert</span>{" "}
            dedicated to streamlining complex business processes. I specialize
            in leveraging powerful tools like{" "}
            <span className="text-blue-400 font-medium">n8n</span>,{" "}
            <span className="text-cyan-400 font-medium">Make.com</span>, and{" "}
            <span className="text-blue-500 font-medium">GoHighLevel (GHL)</span>{" "}
            to transform intricate technical challenges into simple, efficient
            workflows.
          </p>
          <p>
            My approach is centered on efficiency and empowerment. By
            automating repetitive tasks, I help businesses save valuable time
            and provide them with the tools needed for better decision-making.
            Currently, I serve as the{" "}
            <span className="text-white font-medium italic">
              CEO & Lead Technical Consultant
            </span>{" "}
            at <a href="https://www.facebook.com/profile.php?id=61586879968082" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">AutoLogic Systems</a>, where I
            lead automation strategies for diverse business clients.
          </p>
          <p>
            In April 2026, I reached a significant milestone by joining{" "}
            <a href="https://www.autolinium.com" target="_blank" rel="noopener noreferrer" className="text-white font-medium hover:underline">Autolinium Ltd</a> as an
            AI Automation Intern, where I collaborate on SaaS-based project
            workflows and execute AI-driven automation tasks.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
              <span className="w-8 h-px bg-blue-500" /> Education
            </h3>
            <ul className="space-y-6">
              <li className="relative pl-6 border-l border-slate-800">
                <div className="absolute -left-1.5 top-1.5 w-3 h-3 bg-blue-600 rounded-full border-2 border-slate-950" />
                <p className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-1">
                  2020 — 2024
                </p>
                <h4 className="text-white font-bold text-lg">
                  Bachelor of Pharmacy (B.Pharm)
                </h4>
                <p className="text-slate-500">Northern University Bangladesh</p>
              </li>
              <li className="relative pl-6 border-l border-slate-800">
                <div className="absolute -left-1.5 top-1.5 w-3 h-3 bg-slate-700 rounded-full border-2 border-slate-950" />
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">
                  Graduated 2018
                </p>
                <h4 className="text-white font-bold text-lg">
                  H.S.C in Science
                </h4>
                <p className="text-slate-500">Comilla Govt. College</p>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
              <span className="w-8 h-px bg-blue-500" /> Success & Achievements
            </h3>
            <ul className="space-y-6">
              <li className="relative pl-6 border-l border-slate-800">
                <div className="absolute -left-1.5 top-1.5 w-3 h-3 bg-emerald-600 rounded-full border-2 border-slate-950" />
                <h4 className="text-white font-bold text-lg">
                  Vector Store Migration
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Expertly migrated complex project data to Supabase vector
                  stores ensuring grounded AI responses.
                </p>
              </li>
              <li className="relative pl-6 border-l border-slate-800">
                <div className="absolute -left-1.5 top-1.5 w-3 h-3 bg-emerald-600 rounded-full border-2 border-slate-950" />
                <h4 className="text-white font-bold text-lg">
                  <a href="https://www.autolinium.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Autolinium Appointment</a>
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Appointed as AI Automation Intern at <a href="https://www.autolinium.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Autolinium Ltd</a> in April
                  2026.
                </p>
              </li>
            </ul>

            <h3 className="text-2xl font-bold mb-6 mt-12 text-white flex items-center gap-3">
              <span className="w-8 h-px bg-blue-500" /> Languages
            </h3>
            <div className="flex gap-4">
              <div className="px-4 py-2 bg-slate-800/50 rounded-lg border border-white/5 text-sm font-medium text-slate-300">
                Bangla (Native)
              </div>
              <div className="px-4 py-2 bg-slate-800/50 rounded-lg border border-white/5 text-sm font-medium text-slate-300">
                English (Professional)
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />
    </section>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-ground relative"
    >
      <div className="max-w-6xl mx-auto relative">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="label text-brand mb-4">About</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-fg leading-[1.1] mb-8">
              A pharmacy degree, then a year of shipping software.
            </h2>

            <div className="space-y-5 text-base sm:text-lg text-body leading-relaxed font-normal">
              <p>
                I came to software from outside it. In under a year I have built
                a{" "}
                <span className="text-fg font-medium">
                  multi-tenant SaaS platform on my own
                </span>{" "}
                and contributed to four production applications — web
                development in Next.js and Node.js, backend and database work on
                Supabase and PostgreSQL, and AI automation with n8n, LLMs and
                chatbots.
              </p>
              <p>
                I build fast with AI-assisted development and turn business
                problems into working software. What I am looking for now is a{" "}
                <span className="text-fg font-medium">
                  full-time or contract remote role
                </span>{" "}
                where I can keep doing that on a team.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-10">
            <div>
              <p className="label text-subtle mb-5">Education</p>
              <div className="rounded-2xl border border-white/8 bg-surface/40 p-6">
                <p className="label text-brand-bright mb-2">2020 — 2024</p>
                <h3 className="font-display text-base font-bold text-fg leading-tight">
                  B.Pharm (Bachelor of Pharmacy)
                </h3>
                <p className="text-sm text-body mt-1">
                  Northern University Bangladesh
                </p>
              </div>
            </div>

            <div>
              <p className="label text-subtle mb-5">Languages</p>
              <div className="flex flex-wrap gap-2.5">
                <span className="px-4 py-2 rounded-full bg-surface/60 border border-white/8 text-sm font-medium text-fg">
                  Bangla — native
                </span>
                <span className="px-4 py-2 rounded-full bg-surface/60 border border-white/8 text-sm font-medium text-fg">
                  English — professional
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

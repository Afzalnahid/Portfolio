import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BadgeCheck, ArrowUp, ExternalLink } from "lucide-react";

// Dates and titles come from the two Autolinium certificates, which are shown
// below them. Never edit one without the other — the mismatch between the site
// and these documents is what prompted this section.
const roles = [
  {
    org: "Self-employed",
    title: "Full-Stack Developer",
    period: "Aug 2026 — Present",
    place: "Remote",
    points: [
      "Building getvoicium, a multi-tenant AI chatbot SaaS, solo — from architecture to deployment — with Next.js, Supabase (pgvector), Google Gemini and RAG.",
      "Developing full-stack ERP software for Nandi Real Estate and Developers Pvt. Ltd.",
    ],
  },
  {
    org: "Autolinium",
    title: "AI Automation Specialist",
    period: "11 Jul — 10 Sep 2026",
    place: "Chattogram Software Technology Park, Agrabad",
    promoted: true,
    points: [
      "Confirmed into a full-time position on the strength of performance during the internship.",
      "Designed, developed and deployed AI automation solutions for clients using n8n and JavaScript.",
      "Workflow automation, API integration and the engineering and support work around them.",
    ],
  },
  {
    org: "Autolinium",
    title: "AI Automation Intern",
    period: "10 Apr — 10 Jul 2026",
    place: "Chattogram Software Technology Park, Agrabad",
    points: [
      "Built automation workflows and internal web dashboards for business operations.",
      "Contributed to ezpzbd.com, an AI EdTech platform — trained the AI tutors on the learning content and board-exam question data.",
      "Delivered a WhatsApp-based sales-management SaaS for Champion, building the WhatsApp API integration.",
      "Built Facebook, Instagram, WhatsApp and Telegram chatbots and AI-powered Facebook auto-posting with n8n and LLMs.",
    ],
  },
];

const certificates = [
  {
    title: "Experience Certificate",
    issuer: "Autolinium",
    detail: "AI Automation Specialist · 5 months · Ref AUT/HR/EXP/2026-015",
    thumb: "/certificates/experience-thumb.webp",
    full: "/certificates/experience.webp",
  },
  {
    title: "Internship Completion",
    issuer: "Autolinium",
    detail: "AI Automation Intern · 3 months · Apr – Jul 2026",
    thumb: "/certificates/internship-thumb.webp",
    full: "/certificates/internship.webp",
  },
];

export default function Credentials() {
  const [open, setOpen] = useState<(typeof certificates)[number] | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <section
      id="experience"
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-ground-2 border-y border-white/5"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-14 sm:mb-16 max-w-2xl">
          <p className="label text-brand-bright mb-4">Experience &amp; credentials</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-[2.9rem] font-bold text-fg leading-[1.08] mb-5">
            Intern in April. Full-time by July.
          </h2>
          <p className="text-body font-normal text-base sm:text-lg leading-relaxed">
            Autolinium confirmed me into a full-time role three months in, on the
            strength of the internship. Both certificates are below — read them
            rather than take my word for it.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14">
          <div className="lg:col-span-7">
            <ol className="relative">
              {roles.map((role, idx) => (
                <motion.li
                  key={role.title + role.period}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="relative pl-8 pb-10 last:pb-0 border-l border-white/10 last:border-l-transparent"
                >
                  <span
                    className={`absolute -left-[7px] top-1 w-3.5 h-3.5 rounded-full border-2 border-ground-2 ${
                      role.promoted ? "bg-brand-bright" : "bg-brand/50"
                    }`}
                  />

                  {role.promoted && (
                    <span className="inline-flex items-center gap-1.5 mb-3 px-2.5 py-1 rounded-full bg-brand/12 border border-brand/25 text-brand-bright text-[11px] font-semibold">
                      <ArrowUp className="w-3 h-3" />
                      Promoted from intern
                    </span>
                  )}

                  <p className="label text-subtle mb-2">
                    {role.period} &middot; {role.place}
                  </p>
                  <h3 className="font-display text-lg font-bold text-fg leading-tight">
                    {role.title}
                  </h3>
                  <p className="text-sm text-body mb-4">{role.org}</p>

                  <ul className="space-y-2.5">
                    {role.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-3 text-sm text-body font-normal leading-relaxed"
                      >
                        <span className="mt-2 w-1 h-1 rounded-full bg-brand shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-5">
            <p className="label text-subtle mb-5">Verified documents</p>
            <div className="space-y-4">
              {certificates.map((cert) => (
                <button
                  key={cert.title}
                  onClick={() => setOpen(cert)}
                  className="group w-full text-left flex gap-5 p-4 rounded-2xl border border-white/8 bg-surface/50 hover:border-brand/40 hover:bg-surface transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-bright"
                >
                  <img
                    src={cert.thumb}
                    alt=""
                    loading="lazy"
                    className="w-20 h-24 object-cover object-top rounded-lg border border-white/10 shrink-0 bg-white"
                  />
                  <span className="min-w-0 flex flex-col">
                    <span className="inline-flex items-center gap-1.5 text-brand-bright mb-1.5">
                      <BadgeCheck className="w-4 h-4 shrink-0" />
                      <span className="font-display text-sm font-bold text-fg">
                        {cert.title}
                      </span>
                    </span>
                    <span className="text-xs text-body mb-2">{cert.issuer}</span>
                    <span className="font-mono text-[11.5px] text-subtle leading-relaxed">
                      {cert.detail}
                    </span>
                    <span className="mt-auto pt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold text-subtle group-hover:text-brand-bright transition-colors">
                      View full document <ExternalLink className="w-3 h-3" />
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${open.title} from ${open.issuer}`}
            className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6"
          >
            <div
              className="absolute inset-0 bg-ground/95 backdrop-blur-md"
              onClick={() => setOpen(null)}
            />

            <motion.div
              initial={{ scale: 0.97, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              className="relative w-full max-w-4xl max-h-[94vh] flex flex-col rounded-2xl border border-white/12 bg-surface overflow-hidden shadow-2xl"
            >
              <div className="shrink-0 flex items-start justify-between gap-4 p-4 sm:p-5 border-b border-white/10">
                <div className="min-w-0">
                  <p className="font-display text-base font-bold text-fg leading-tight">
                    {open.title}
                  </p>
                  <p className="font-mono text-[11.5px] text-subtle mt-1.5 break-words">
                    {open.detail}
                  </p>
                </div>
                <button
                  onClick={() => setOpen(null)}
                  aria-label="Close"
                  className="p-2 shrink-0 rounded-full text-body hover:text-fg hover:bg-white/5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-bright"
                >
                  <X size={20} />
                </button>
              </div>

              {/* The document itself, on white, scrolling inside its own row. */}
              <div className="flex-1 min-h-0 overflow-auto bg-white p-3 sm:p-5">
                <img
                  src={open.full}
                  alt={`${open.title} issued by ${open.issuer}`}
                  className="w-full h-auto mx-auto max-w-[860px] rounded-md"
                />
              </div>

              <div className="shrink-0 flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5 border-t border-white/10">
                <p className="text-[12.5px] text-subtle">
                  Issued by {open.issuer}
                </p>
                <a
                  href={open.full}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-brand hover:bg-brand-bright text-ground text-[13px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-bright"
                >
                  Open full size <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

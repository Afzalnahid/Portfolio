import { Link } from "wouter";
import { ArrowLeft, Printer, Mail, Phone, Globe, Github, Linkedin, MapPin } from "lucide-react";

// The single source of truth for the CV. The site's Credentials section reads
// the same dates from the Autolinium certificates — keep the two in step.
const experience = [
  {
    title: "Full-Stack Developer",
    org: "Self-employed",
    period: "Aug 2026 — Present",
    place: "Remote",
    points: [
      "Building getvoicium, a multi-tenant AI chatbot SaaS, solo — from architecture to deployment — with Next.js, Supabase (pgvector), Google Gemini and RAG.",
      "Developing full-stack ERP software for Nandi Real Estate and Developers Pvt. Ltd. (ongoing).",
    ],
  },
  {
    title: "AI Automation Specialist",
    org: "Autolinium",
    period: "11 Jul — 10 Sep 2026",
    place: "Chattogram Software Technology Park, Agrabad",
    note: "Confirmed into a full-time position on the strength of performance during the three-month internship.",
    points: [
      "Designed, developed and deployed AI automation solutions for clients using n8n and JavaScript.",
      "Workflow automation, API integration, and the engineering and support work around them.",
    ],
  },
  {
    title: "AI Automation Intern",
    org: "Autolinium",
    period: "10 Apr — 10 Jul 2026",
    place: "Chattogram Software Technology Park, Agrabad",
    points: [
      "Built automation workflows and internal web dashboards for business operations.",
      "Contributed to ezpzbd.com, an AI-powered EdTech platform tutoring HSC students — trained the AI tutors on the learning content and board-exam question data.",
      "Delivered a WhatsApp-based sales-management SaaS for Champion — built the WhatsApp API integration for automated daily reminders, lead management and sales-team performance tracking.",
      "Built Facebook, Instagram, WhatsApp and Telegram chatbots and AI-powered Facebook auto-posting using n8n and LLMs.",
    ],
  },
];

const projects = [
  {
    name: "getvoicium",
    meta: "Solo SaaS · getvoicium.com",
    stack: "Next.js · Supabase (pgvector) · Google Gemini · RAG",
    text: "Multi-tenant AI chatbot platform answering customers in Bangla across Facebook, Instagram, WhatsApp and a website widget. Per-client knowledge base with RAG retrieval, product catalogue, broadcasts and billing.",
  },
  {
    name: "ezpzbd",
    meta: "AI EdTech · ezpzbd.com",
    stack: "AI tutors · Voice explanation · Board-exam data",
    text: "AI tutoring platform for HSC students with multiple subject tutors and voice explanations in Bangla and English. Trained the AI on board-exam solutions and learning data.",
  },
  {
    name: "Champion Sales-Management SaaS",
    meta: "WhatsApp automation · Client system",
    stack: "WhatsApp Cloud API · Automation · Web dashboard",
    text: "Tracks a sales team and head office entirely through WhatsApp — daily reminders, lead management and rep ratings. Built the WhatsApp API integration.",
  },
  {
    name: "Nandi Real Estate ERP",
    meta: "Full-stack ERP · Ongoing",
    stack: "Full-stack web application · Relational database",
    text: "Full-stack ERP system for a real-estate development company.",
  },
];

const skills = [
  {
    label: "Full-Stack / Web",
    items: "JavaScript, React, Next.js, Node.js, Supabase, PostgreSQL, REST APIs, HTML/CSS, Git",
  },
  {
    label: "AI / Automation",
    items: "n8n, LLM integration, OpenAI API, Google Gemini, AI-assisted development, RAG / vector search, chatbot development, WhatsApp / Telegram / Meta (Facebook, Instagram) APIs, webhooks, prompt engineering",
  },
];

const contacts = [
  { icon: <Phone className="w-3.5 h-3.5" />, text: "+880 1690-000732", href: "tel:+8801690000732" },
  { icon: <Mail className="w-3.5 h-3.5" />, text: "nahidafzal97@gmail.com", href: "mailto:nahidafzal97@gmail.com" },
  { icon: <MapPin className="w-3.5 h-3.5" />, text: "Comilla, Bangladesh — open to remote", href: null },
  { icon: <Globe className="w-3.5 h-3.5" />, text: "nahid-afzal-portfolio.vercel.app", href: "https://nahid-afzal-portfolio.vercel.app" },
  { icon: <Github className="w-3.5 h-3.5" />, text: "github.com/Afzalnahid", href: "https://github.com/Afzalnahid" },
  { icon: <Linkedin className="w-3.5 h-3.5" />, text: "linkedin.com/in/norayafzalnahid", href: "https://www.linkedin.com/in/norayafzalnahid" },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="resume-section mb-10">
      <h2 className="label text-brand border-b border-white/10 pb-2 mb-6">{title}</h2>
      {children}
    </section>
  );
}

export default function Resume() {
  return (
    <div className="min-h-screen bg-ground text-fg font-roboto">
      <div className="no-print sticky top-0 z-20 bg-ground/90 backdrop-blur border-b border-white/5">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-body hover:text-fg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to portfolio
          </Link>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand hover:bg-brand-bright text-ground text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-bright"
          >
            <Printer className="w-4 h-4" />
            Print / Save as PDF
          </button>
        </div>
      </div>

      <main className="resume-page max-w-3xl mx-auto px-6 py-12 sm:py-16">
        <header className="mb-10 pb-8 border-b border-white/10">
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold leading-none mb-3">
            Noray Afzal Nahid
          </h1>
          <p className="text-lg text-brand-bright font-medium mb-6">
            Full-Stack Developer &middot; AI Automation Specialist
          </p>
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
            {contacts.map((c) => (
              <li key={c.text} className="flex items-center gap-2.5 text-sm text-body">
                <span className="text-subtle shrink-0">{c.icon}</span>
                {c.href ? (
                  <a href={c.href} className="hover:text-fg transition-colors break-all">
                    {c.text}
                  </a>
                ) : (
                  <span>{c.text}</span>
                )}
              </li>
            ))}
          </ul>
        </header>

        <Section title="Summary">
          <p className="text-[15px] text-body leading-relaxed font-normal">
            Full-stack developer and AI automation engineer who ships real
            products. In under a year I have built a SaaS platform solo and
            contributed to four production applications — spanning web
            development (Next.js, Node.js), backend and database work (Supabase,
            PostgreSQL), and AI automation (n8n, LLMs, chatbots). Promoted from
            intern to a full-time AI Automation Specialist at Autolinium within
            three months. Seeking a full-time or contract remote role.
          </p>
        </Section>

        <Section title="Experience">
          <div className="space-y-8">
            {experience.map((job) => (
              <article key={job.title + job.period}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1">
                  <h3 className="font-display text-base font-bold text-fg">
                    {job.title} <span className="text-body font-medium">— {job.org}</span>
                  </h3>
                  <p className="font-mono text-[11.5px] text-subtle">{job.period}</p>
                </div>
                <p className="text-xs text-subtle mb-3">{job.place}</p>
                {job.note && (
                  <p className="text-sm text-brand-bright font-medium mb-3 leading-snug">
                    {job.note}
                  </p>
                )}
                <ul className="space-y-2">
                  {job.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm text-body font-normal leading-relaxed">
                      <span className="mt-[9px] w-1 h-1 rounded-full bg-brand shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Section>

        <Section title="Selected projects">
          <div className="space-y-6">
            {projects.map((p) => (
              <article key={p.name}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-display text-base font-bold text-fg">{p.name}</h3>
                  <p className="font-mono text-[11.5px] text-subtle">{p.meta}</p>
                </div>
                <p className="font-mono text-[11.5px] text-subtle mt-1 mb-2">{p.stack}</p>
                <p className="text-sm text-body font-normal leading-relaxed">{p.text}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section title="Technical skills">
          <dl className="space-y-4">
            {skills.map((s) => (
              <div key={s.label} className="grid sm:grid-cols-[150px_1fr] gap-1 sm:gap-6">
                <dt className="font-display text-sm font-bold text-fg">{s.label}</dt>
                <dd className="text-sm text-body font-normal leading-relaxed">{s.items}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section title="Certifications">
          <ul className="space-y-3">
            <li className="text-sm text-body font-normal leading-relaxed">
              <span className="text-fg font-medium">Experience Certificate</span> — Autolinium,
              AI Automation Specialist, five months. Ref AUT/HR/EXP/2026-015, issued 10 September 2026.
            </li>
            <li className="text-sm text-body font-normal leading-relaxed">
              <span className="text-fg font-medium">Certificate of Completion</span> — Autolinium,
              three-month AI Automation internship, April to July 2026.
            </li>
          </ul>
        </Section>

        <Section title="Education">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="font-display text-base font-bold text-fg">
              B.Pharm (Bachelor of Pharmacy)
              <span className="text-body font-medium"> — Northern University Bangladesh</span>
            </h3>
            <p className="font-mono text-[11.5px] text-subtle">2020 — 2024</p>
          </div>
        </Section>

        <Section title="Languages">
          <p className="text-sm text-body font-normal">
            Bangla — native &nbsp;·&nbsp; English — professional working proficiency
          </p>
        </Section>
      </main>
    </div>
  );
}

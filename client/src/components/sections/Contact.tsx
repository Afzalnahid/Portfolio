import { Mail, Linkedin, Github, MessageCircle, FileText, Globe, CalendarDays } from "lucide-react";
import { Link } from "wouter";
import { CV_URL } from "./Hero";
import { BOOKING } from "@/lib/booking";
import { useBooking } from "@/contexts/BookingContext";

const links = [
  {
    name: "Email",
    value: BOOKING.email,
    href: `mailto:${BOOKING.email}`,
    icon: <Mail className="w-5 h-5" />,
    accent: "text-brand-bright",
    external: false,
  },
  {
    name: "WhatsApp",
    value: "+880 1690-000732",
    href: `https://wa.me/${BOOKING.whatsapp}`,
    icon: <MessageCircle className="w-5 h-5" />,
    accent: "text-brand-bright",
    external: true,
  },
  {
    name: "LinkedIn",
    value: "in/norayafzalnahid",
    href: "https://www.linkedin.com/in/norayafzalnahid",
    icon: <Linkedin className="w-5 h-5" />,
    accent: "text-brand-bright",
    external: true,
  },
  {
    name: "GitHub",
    value: "github.com/Afzalnahid",
    href: "https://github.com/Afzalnahid",
    icon: <Github className="w-5 h-5" />,
    accent: "text-fg/80",
    external: true,
  },
];

export default function Contact() {
  const { openBooking } = useBooking();

  return (
    <section
      id="contact"
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[820px] h-[520px] max-w-[130vw] bg-brand/[0.07] blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="max-w-2xl mb-10">
          <p className="label text-brand mb-4">Get in touch</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-[2.9rem] font-bold text-white leading-[1.08] mb-5">
            Looking for a full-time or contract remote role.
          </h2>
          <p className="text-muted font-light text-base sm:text-lg leading-relaxed">
            Full-stack or AI automation. The quickest way to reach me is email
            or WhatsApp.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3.5 mb-6">
          <Link
            href={CV_URL}
            className="inline-flex items-center justify-center gap-2.5 px-8 h-14 rounded-xl bg-brand hover:bg-brand-bright text-ground text-[15px] font-semibold transition-colors shadow-lg shadow-brand/20 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-bright"
          >
            <FileText className="w-4 h-4" />
            View CV
          </Link>
          <button
            onClick={() => openBooking()}
            className="inline-flex items-center justify-center gap-2.5 px-8 h-14 rounded-xl bg-white/5 border border-white/15 hover:bg-white/10 text-white text-[15px] font-semibold transition-colors active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-bright"
          >
            <CalendarDays className="w-4 h-4" />
            {BOOKING.label}
          </button>
        </div>

        <p className="flex items-center gap-2 text-[13px] text-muted/75 mb-3">
          <Globe className="w-3.5 h-3.5" />
          Comilla, Bangladesh &mdash; open to remote, worldwide
        </p>

        {/* The quiet door: clients who want project work still find it, without
            the page sounding undecided about what it is asking for. */}
        <p className="text-[13px] text-muted/60 mb-14">
          Also available for contract and project work.
        </p>

        <div className="grid sm:grid-cols-2 gap-3">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="group flex items-center gap-5 p-6 rounded-2xl border border-white/8 bg-surface/40 hover:border-white/20 hover:bg-surface/70 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-bright"
            >
              <span
                className={`w-11 h-11 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${link.accent} group-hover:scale-105 transition-transform`}
              >
                {link.icon}
              </span>
              <span className="min-w-0">
                <span className="label text-muted/55 block mb-1">{link.name}</span>
                <span className="block text-[15px] font-medium text-fg/90 truncate">
                  {link.value}
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

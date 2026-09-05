import {
  Mail,
  Linkedin,
  Github,
  MessageCircle,
  CalendarDays,
  Download,
  Globe,
} from "lucide-react";
import { CV_URL } from "./Hero";

const BOOKING_URL = "https://calendar.app.google/2kkn9abjZreibAJx6";

const contactLinks = [
  {
    name: "Email",
    value: "nahidafzal97@gmail.com",
    href: "mailto:nahidafzal97@gmail.com",
    icon: <Mail className="w-6 h-6" />,
    color: "from-cyan-500/10 to-cyan-600/5",
    border: "hover:border-cyan-400",
    text: "text-cyan-400",
    external: false,
  },
  {
    name: "WhatsApp",
    value: "+880 1690-000732",
    href: "https://wa.me/8801690000732",
    icon: <MessageCircle className="w-6 h-6" />,
    color: "from-green-500/10 to-green-600/5",
    border: "hover:border-green-400",
    text: "text-green-400",
    external: true,
  },
  {
    name: "LinkedIn",
    value: "in/norayafzalnahid",
    href: "https://www.linkedin.com/in/norayafzalnahid",
    icon: <Linkedin className="w-6 h-6" />,
    color: "from-blue-500/10 to-blue-600/5",
    border: "hover:border-blue-400",
    text: "text-blue-400",
    external: true,
  },
  {
    name: "GitHub",
    value: "github.com/Afzalnahid",
    href: "https://github.com/Afzalnahid",
    icon: <Github className="w-6 h-6" />,
    color: "from-slate-500/10 to-slate-600/5",
    border: "hover:border-slate-300",
    text: "text-slate-300",
    external: true,
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] max-w-full bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 text-center tracking-tighter uppercase">
            Let&apos;s Work Together
          </h2>
          <div className="w-20 h-1.5 bg-white rounded-full" />
        </div>

        <p className="text-center text-slate-400 mb-10 text-base sm:text-lg font-light max-w-2xl mx-auto">
          I am looking for a{" "}
          <span className="text-white font-medium">
            full-time or contract remote role
          </span>{" "}
          as a full-stack or AI automation developer. Open to project work too —
          the quickest way to reach me is email or WhatsApp.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
          <a
            href={CV_URL}
            download
            className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-black uppercase tracking-widest transition-colors shadow-lg shadow-blue-600/25 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400"
          >
            <Download className="w-4 h-4" />
            Download CV
          </a>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-white/5 border border-white/15 hover:bg-white/10 text-white text-xs font-black uppercase tracking-widest transition-colors active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400"
          >
            <CalendarDays className="w-4 h-4" />
            Book a call
          </a>
        </div>

        <p className="text-center text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-14 flex items-center justify-center gap-2">
          <Globe className="w-3.5 h-3.5" />
          Comilla, Bangladesh &mdash; open to remote, worldwide
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contactLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className={`group block p-7 sm:p-8 bg-gradient-to-r ${link.color} border border-white/5 rounded-2xl ${link.border} transition-all duration-300 hover:shadow-2xl hover:shadow-black/20 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400`}
            >
              <div className="flex items-center gap-5 sm:gap-6">
                <div
                  className={`p-4 shrink-0 rounded-xl bg-slate-900/50 border border-white/5 ${link.text} group-hover:scale-110 transition-transform duration-500 shadow-inner`}
                >
                  {link.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">
                    {link.name}
                  </p>
                  <p
                    className={`text-base sm:text-lg font-bold ${link.text} tracking-tight truncate`}
                  >
                    {link.value}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

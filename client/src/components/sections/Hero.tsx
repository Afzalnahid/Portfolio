import { Button } from "@/components/ui/button";
import {
  Linkedin,
  Github,
  Mail,
  MessageCircle,
  Download,
  MapPin,
} from "lucide-react";
import heroImage from "@/heroimage.webp";
import { motion } from "framer-motion";

export const CV_URL = "/Noray-Afzal-Nahid-CV.pdf";

const socials = [
  {
    label: "GitHub",
    icon: <Github size={14} />,
    href: "https://github.com/Afzalnahid",
  },
  {
    label: "LinkedIn",
    icon: <Linkedin size={14} />,
    href: "https://www.linkedin.com/in/norayafzalnahid",
  },
  {
    label: "WhatsApp",
    icon: <MessageCircle size={14} />,
    href: "https://wa.me/8801690000732",
  },
  {
    label: "Email",
    icon: <Mail size={14} />,
    href: "mailto:nahidafzal97@gmail.com",
  },
];

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col justify-between overflow-hidden bg-black">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />

      {/* Two overlays: a left-to-right wash for text contrast on desktop, and a
          stronger bottom-up wash so the headline stays readable on phones. */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 md:from-black/40" />

      <div className="relative z-10 h-24" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 flex-grow flex flex-col justify-center">
        <div className="max-w-2xl space-y-7 md:space-y-9">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[11px] sm:text-xs font-black uppercase tracking-[0.3em] text-[#58a6ff]"
          >
            Full-Stack Developer &bull; AI Automation Expert (n8n)
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] text-white uppercase tracking-tighter"
          >
            I SHIP <br />
            <span className="text-[#58a6ff]">REAL PRODUCTS</span> <br />
            NOT DEMOS
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-base sm:text-lg text-slate-300 font-light max-w-xl leading-relaxed"
          >
            In under a year I have built a SaaS platform solo and contributed to
            four production applications — across Next.js and Node.js, Supabase
            and PostgreSQL, and AI automation with n8n and LLMs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              asChild
              className="bg-[#1b72e8] hover:bg-[#1559b3] text-white font-bold px-9 py-7 text-sm rounded-full transition-colors uppercase tracking-widest shadow-lg shadow-blue-600/20 active:scale-95"
            >
              <a href={CV_URL} download>
                <Download className="w-4 h-4" />
                Download CV
              </a>
            </Button>
            <Button
              variant="outline"
              className="bg-white/5 border-white/20 hover:bg-white/10 hover:text-white text-white font-bold px-9 py-7 text-sm rounded-full transition-colors uppercase tracking-widest active:scale-95"
              onClick={() =>
                document
                  .getElementById("solutions")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              See my work
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <MapPin className="w-3.5 h-3.5" />
            Comilla, Bangladesh &bull; open to remote, worldwide
          </motion.p>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pb-10 md:pb-12">
        <div className="flex gap-3">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-slate-900/80 border border-white/10 text-slate-300 hover:text-white hover:border-white/30 transition-colors rounded-full flex items-center justify-center backdrop-blur-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

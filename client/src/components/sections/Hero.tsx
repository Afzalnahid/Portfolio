import { Button } from "@/components/ui/button";
import { Linkedin, Facebook, Mail, MessageCircle, Github } from "lucide-react";
import heroImage from "@/heroimage.webp";
import { motion } from "framer-motion";

const socials = [
  {
    label: "LinkedIn",
    icon: <Linkedin size={14} />,
    href: "https://www.linkedin.com/in/norayafzalnahid",
  },
  {
    label: "Facebook",
    icon: <Facebook size={14} />,
    href: "https://www.facebook.com/share/1WyK1mVSVe/",
  },
  {
    label: "WhatsApp",
    icon: <MessageCircle size={14} />,
    href: "https://wa.me/8801690000732",
  },
  {
    label: "GitHub",
    icon: <Github size={14} />,
    href: "https://github.com/Afzalnahid",
  },
  {
    label: "Email",
    icon: <Mail size={14} />,
    href: "mailto:nahidafzal97@gmail.com",
  },
];

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col justify-between overflow-hidden bg-black">
      {/* Background image. Decorative, so it stays a background rather than an <img>. */}
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
        <div className="max-w-2xl space-y-8 md:space-y-10">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[11px] sm:text-xs font-black uppercase tracking-[0.3em] text-[#58a6ff]"
          >
            AI Solutions Engineer &bull; Product Builder &bull; Automation Architect
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] text-white uppercase tracking-tighter"
          >
            I BUILD <br />
            <span className="text-[#58a6ff]">AI PRODUCTS</span> <br />
            END TO END
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-base sm:text-lg text-slate-300 font-light max-w-lg leading-relaxed"
          >
            From database schema and API architecture through retrieval
            pipelines and model orchestration, to the interface your customers
            actually use &mdash; and the automation that keeps it running
            unattended.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              className="bg-[#1b72e8] hover:bg-[#1559b3] text-white font-bold px-10 py-7 text-sm rounded-full transition-colors uppercase tracking-widest shadow-lg shadow-blue-600/20 active:scale-95"
              onClick={() => scrollTo("contact")}
            >
              Get in touch
            </Button>
            <Button
              variant="outline"
              className="bg-white/5 border-white/20 hover:bg-white/10 hover:text-white text-white font-bold px-10 py-7 text-sm rounded-full transition-colors uppercase tracking-widest active:scale-95"
              onClick={() => scrollTo("solutions")}
            >
              See the workflows
            </Button>
          </motion.div>
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

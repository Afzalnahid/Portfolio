import { Button } from "@/components/ui/button";
import { Linkedin, Github, Mail, MessageCircle, Download, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import HeroScene from "@/components/HeroScene";
import heroImage from "@/heroimage.webp";
import { useBooking } from "@/contexts/BookingContext";

export const CV_URL = "/Noray-Afzal-Nahid-CV.pdf";

const socials = [
  { label: "GitHub", icon: <Github size={15} />, href: "https://github.com/Afzalnahid" },
  { label: "LinkedIn", icon: <Linkedin size={15} />, href: "https://www.linkedin.com/in/norayafzalnahid" },
  { label: "WhatsApp", icon: <MessageCircle size={15} />, href: "https://wa.me/8801690000732" },
  { label: "Email", icon: <Mail size={15} />, href: "mailto:nahidafzal97@gmail.com" },
];

export default function Hero() {
  const { openBooking } = useBooking();

  return (
    <section className="relative flex flex-col justify-center overflow-hidden bg-slate-950 pt-28 pb-14 sm:pt-32 sm:pb-20">
      {/* The photograph is kept, pushed well back so the constellation reads. */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.13] grayscale"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/70 to-slate-950" />
      <div className="absolute -top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[900px] max-w-[130vw] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          <div className="lg:col-span-7 space-y-7">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="label text-[#58a6ff]"
            >
              Full-Stack Developer &middot; AI Automation (n8n)
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="font-display text-[2.6rem] leading-[1.03] sm:text-6xl lg:text-[4.4rem] font-extrabold text-white"
            >
              I ship real products,
              <br />
              <span className="text-[#58a6ff]">not demos.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="text-lg text-slate-300/90 font-light max-w-xl leading-relaxed"
            >
              In under a year I built a multi-tenant SaaS platform on my own and
              shipped four production applications &mdash; Next.js and Node.js,
              Supabase and PostgreSQL, and AI automation with n8n and LLMs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-3.5 pt-1"
            >
              <Button
                asChild
                className="h-14 px-8 rounded-xl bg-[#1b72e8] hover:bg-[#1559b3] text-white text-[15px] font-semibold shadow-lg shadow-blue-600/20 active:scale-[0.98] transition"
              >
                <a href={CV_URL} download>
                  <Download className="w-4 h-4" />
                  Download CV
                </a>
              </Button>
              <Button
                variant="outline"
                onClick={() => openBooking()}
                className="h-14 px-8 rounded-xl bg-white/5 border-white/15 hover:bg-white/10 hover:text-white text-white text-[15px] font-semibold active:scale-[0.98] transition"
              >
                Book a call
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap items-center gap-x-6 gap-y-4 pt-3"
            >
              <p className="flex items-center gap-2 text-[13px] text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <MapPin className="w-3.5 h-3.5" />
                Comilla, Bangladesh &middot; open to remote
              </p>
              <div className="flex gap-2.5">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-white/25 transition-colors flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.15 }}
            className="lg:col-span-5 order-first lg:order-last"
          >
            <HeroScene className="w-full h-[240px] sm:h-[320px] lg:h-[480px]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

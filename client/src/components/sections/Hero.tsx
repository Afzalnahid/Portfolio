import { Button } from "@/components/ui/button";
import {
  Linkedin,
  Facebook,
  Mail,
  Search,
} from "lucide-react";
import HeroDesign from "@/heroimage.jpg";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-black">
      {/* Background Image - The reference design */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HeroDesign})` }}
      />
      
      {/* Gradient Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/10" />

      {/* Top Section - Spacing for Navbar */}
      <div className="relative z-10 h-24" />

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 flex-grow flex flex-col justify-center">
        <div className="max-w-2xl space-y-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-2"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight text-white uppercase tracking-tighter">
              STREAMLINE <br />
              <span className="text-[#58a6ff]">PROCESSES</span> <br />
              & EMPOWER GROWTH
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Button
              className="bg-[#1b72e8] hover:bg-[#1559b3] text-white font-bold px-10 py-7 text-sm rounded-full transition-all duration-300 uppercase tracking-widest shadow-lg shadow-blue-600/20 active:scale-95"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Get In Touch
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Bottom Section - Social Icons */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pb-12">
        <div className="flex gap-3">
          {[
            {
              icon: <Linkedin size={14} />,
              href: "https://www.linkedin.com/in/norayafzalnahid",
            },
            {
              icon: <Facebook size={14} />,
              href: "https://www.facebook.com/share/1WyK1mVSVe/",
            },
            {
              icon: <Mail size={14} />,
              href: "mailto:nahidafzal97@gmail.com",
            },
            {
              icon: <Search size={14} />,
              href: "#",
            },
          ].map((social, i) => (
            <a
              key={i}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-slate-900/80 border border-white/10 text-slate-300 hover:text-white hover:border-white/30 transition-all duration-300 rounded-full flex items-center justify-center backdrop-blur-md"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

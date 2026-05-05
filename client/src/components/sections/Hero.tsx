import { Button } from "@/components/ui/button";
import {
  Linkedin,
  Facebook,
  Mail,
  MessageCircle,
  Globe,
} from "lucide-react";
import HeroReference from "@/HeroReference.jpeg";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden group/hero">
      {/* Background Image with Zoom Effect */}
      <motion.div
        className="absolute inset-0 bg-cover bg-[center_20%] bg-no-repeat opacity-50 scale-105 transition-all duration-1000 ease-in-out"
        style={{ 
          backgroundImage: `url(${HeroReference})`,
          transformOrigin: '50% 25%' // Focus zoom on the face area
        }}
        whileHover={{ scale: 1.4, opacity: 1 }}
      />
      {/* Gradient overlay - fades slightly on group hover to reveal image */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-slate-950/80 md:bg-gradient-to-r md:from-slate-950/90 md:via-slate-950/50 md:to-transparent transition-opacity duration-1000 group-hover/hero:opacity-40" />

      {/* Futuristic Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center md:items-start text-center md:text-left gap-12">
        {/* Main content */}
        <div className="max-w-3xl space-y-8 animate-fade-in">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-white uppercase drop-shadow-2xl tracking-tight">
              STREAMLINE{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                PROCESSES
              </span>{" "}
              <br /> & EMPOWER GROWTH
            </h1>
            <p className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-2xl font-light tracking-wide drop-shadow-md">
              Hi, I'm Noray Afzal Nahid, an{" "}
              <span className="font-semibold text-white">
                Automation Expert
              </span>{" "}
              specializing in streamlining complex business processes using n8n,
              Make.com, and GoHighLevel. I break down intricate technical
              problems into efficient workflows.
            </p>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-6 pt-4">
            <Button
              className="group relative bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-6 text-sm rounded-full transition-all duration-300 uppercase tracking-widest overflow-hidden shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_35px_rgba(37,99,235,0.6)]"
              onClick={() =>
                document
                  .getElementById("solutions")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <span className="relative z-10">View My Projects</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Button>
            <Button
              variant="outline"
              className="border-2 border-white/30 text-white hover:bg-white hover:text-slate-950 bg-transparent font-bold px-8 py-6 text-sm rounded-full transition-all duration-300 uppercase tracking-widest backdrop-blur-sm"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Get In Touch
            </Button>
          </div>

          {/* Social links */}
          <div className="flex justify-center md:justify-start gap-4 pt-8">
            {[
              {
                icon: <Linkedin className="w-5 h-5" />,
                href: "https://www.linkedin.com/in/norayafzalnahid",
              },
              {
                icon: <Facebook className="w-5 h-5" />,
                href: "https://www.facebook.com/share/1WyK1mVSVe/",
              },
              {
                icon: <Mail className="w-5 h-5" />,
                href: "mailto:nahidafzal97@gmail.com",
              },
              {
                icon: <MessageCircle className="w-5 h-5" />,
                href: "https://wa.me/8801690000732",
              },
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-slate-800/40 border border-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-700/60 transition-all duration-300 rounded-full hover:scale-110 backdrop-blur-sm"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

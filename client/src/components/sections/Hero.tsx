import { Button } from "@/components/ui/button";
import {
  Linkedin,
  Facebook,
  Mail,
  MessageCircle,
  MoreHorizontal,
  Globe,
  ThumbsUp,
  MessageSquare,
  Repeat2,
  Send as SendIcon,
} from "lucide-react";
import HeroImage from "@/Hero.jpeg";
import Nahid2Image from "@/nahid2.png";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity scale-105 animate-pulse-slow"
        style={{ backgroundImage: `url(${HeroImage})` }}
      />
      {/* Gradient overlay to make text readable on the left */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-slate-950/30" />

      {/* Futuristic Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left content */}
        <div className="max-w-3xl space-y-8 animate-fade-in w-full md:w-3/5">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-white uppercase drop-shadow-2xl tracking-tight">
              INTELLIGENT{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                AUTOMATION
              </span>{" "}
              <br /> & AI SOLUTIONS
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl font-light tracking-wide">
              Hi, I'm Noray Afzal Nahid, a passionate{" "}
              <span className="font-semibold text-white">
                AI Automation Expert
              </span>{" "}
              specializing in building scalable n8n workflows and intuitive
              chatbots to drive growth.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 pt-4">
            <Button
              className="group relative bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-6 text-sm rounded-full transition-all duration-300 uppercase tracking-widest overflow-hidden shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_35px_rgba(37,99,235,0.6)]"
              onClick={() =>
                document
                  .getElementById("projects")
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
          <div className="flex gap-4 pt-8">
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

        {/* Right Image - LinkedIn Style Canvas */}
        <div className="w-full md:w-2/5 flex justify-center md:justify-end animate-fade-in relative mt-10 md:mt-0">
          <div className="absolute inset-0 bg-blue-500/10 blur-[120px] rounded-full animate-pulse-slow"></div>
          <a
            href="https://www.linkedin.com/in/norayafzalnahid"
            target="_blank"
            rel="noopener noreferrer"
            className="relative block w-72 md:w-80 lg:w-[26rem] bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] transform md:rotate-2 hover:rotate-0 transition-all duration-500 border border-slate-200/50 overflow-hidden text-left group/card"
          >
            {/* LinkedIn Header */}
            <div className="p-4 pb-2 flex items-start gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-200 shrink-0 shadow-sm">
                <img
                  src={Nahid2Image}
                  className="w-full h-full object-cover object-top bg-slate-50"
                  alt="Avatar"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-bold text-slate-900 leading-none group-hover/card:text-blue-600 transition-colors truncate">
                    Noray Afzal Nahid
                  </p>
                  <MoreHorizontal className="w-5 h-5 text-slate-400 shrink-0" />
                </div>
                <p className="text-[11px] text-slate-500 mt-1 truncate font-medium">
                  AI Automation Expert | n8n | Chatbots
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
                  1d • <Globe className="w-2.5 h-2.5" />
                </p>
              </div>
            </div>

            {/* Post Text */}
            <div className="px-4 pb-2">
              <p className="text-[13px] text-slate-800 leading-relaxed font-normal">
                Crafting intelligent automation to drive growth. 🚀🤖 Let's
                transform your business processes! <br />
                <span className="text-blue-600 font-semibold hover:underline cursor-pointer">
                  #AI #Automation #n8n
                </span>
              </p>
            </div>

            {/* The actual image */}
            <div className="relative aspect-square w-full bg-gradient-to-b from-slate-50 to-slate-200 border-y border-slate-100 flex items-end justify-center overflow-hidden">
              <img
                src={Nahid2Image}
                alt="Noray Afzal Nahid"
                className="w-[85%] h-auto object-contain drop-shadow-2xl transform group-hover/card:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity" />
            </div>

            {/* LinkedIn Footer Stats */}
            <div className="px-4 py-2 flex justify-between items-center text-[10px] text-slate-500 border-b border-slate-50">
              <div className="flex items-center gap-1">
                <div className="flex -space-x-1">
                  <div className="w-3.5 h-3.5 rounded-full bg-blue-500 flex items-center justify-center border border-white z-10">
                    <ThumbsUp className="w-[7px] h-[7px] text-white fill-white" />
                  </div>
                  <div className="w-3.5 h-3.5 rounded-full bg-red-500 flex items-center justify-center border border-white">
                    <svg viewBox="0 0 24 24" width="7" height="7" fill="white">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                    </svg>
                  </div>
                </div>
                <span>428</span>
              </div>
              <div className="flex gap-2">
                <span>42 comments</span>
                <span>•</span>
                <span>12 reposts</span>
              </div>
            </div>

            {/* LinkedIn Actions */}
            <div className="px-2 py-1 flex justify-between items-center bg-white">
              {[
                { icon: <ThumbsUp className="w-4 h-4" />, label: "Like" },
                {
                  icon: <MessageSquare className="w-4 h-4" />,
                  label: "Comment",
                },
                { icon: <Repeat2 className="w-4 h-4" />, label: "Repost" },
                { icon: <SendIcon className="w-4 h-4" />, label: "Send" },
              ].map((action, i) => (
                <div
                  key={action.label}
                  className="flex-1 flex flex-col items-center gap-0.5 py-2 rounded hover:bg-slate-50 transition-colors text-slate-500"
                >
                  {action.icon}{" "}
                  <span className="text-[10px] font-semibold">
                    {action.label}
                  </span>
                </div>
              ))}
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

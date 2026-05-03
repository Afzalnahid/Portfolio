import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Facebook, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import HeroImage from "../Hero.jpeg";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const projects = [
    {
      title: "Evalora F-Commerce Chatbot",
      description: "AI-powered jewelry chatbot with image recognition and multi-language support",
      tags: ["n8n", "AI", "E-Commerce"],
      icon: "💎",
    },
    {
      title: "Viral Talking Food Video Generator",
      description: "Automated system for generating engaging food content with AI narration",
      tags: ["n8n", "AI", "Automation"],
      icon: "🎬",
    },
    {
      title: "AI Image Classifier",
      description: "Product matching system using computer vision and machine learning",
      tags: ["AI", "ML", "Classification"],
      icon: "🖼️",
    },
    {
      title: "Multi-Platform Chatbots",
      description: "Unified chatbot solution across Facebook Messenger, WhatsApp, and Telegram",
      tags: ["n8n", "Chatbot", "Integration"],
      icon: "💬",
    },
    {
      title: "20+ n8n Workflows",
      description: "Custom automation workflows for various business processes and integrations",
      tags: ["n8n", "Automation", "Integration"],
      icon: "⚙️",
    },
    {
      title: "Facebook Messenger Bot",
      description: "Intelligent bot for customer engagement and lead generation",
      tags: ["n8n", "Chatbot", "Social"],
      icon: "📱",
    },
  ];

  const services = [
    {
      title: "n8n Automation",
      description: "Build powerful, scalable workflows to automate your business processes",
      icon: "⚙️",
    },
    {
      title: "Chatbot Development",
      description: "Create intelligent chatbots for customer support and engagement",
      icon: "🤖",
    },
    {
      title: "AI Solutions",
      description: "Implement cutting-edge AI technology to solve complex problems",
      icon: "✨",
    },
    {
      title: "Chatbot Specialist",
      description: "Expert consultation and implementation of advanced chatbot systems",
      icon: "💡",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-slate-950/95 backdrop-blur-md border-b border-slate-800" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Afzal Nahid
          </div>
          <div className="flex gap-6 text-sm font-medium">
            <a href="#about" className="hover:text-cyan-400 transition-colors">
              About
            </a>
            <a href="#services" className="hover:text-cyan-400 transition-colors">
              Services
            </a>
            <a href="#projects" className="hover:text-cyan-400 transition-colors">
              Projects
            </a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-start pt-20 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HeroImage})` }}
        />
        {/* Gradient overlay to make text readable on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-transparent" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Left content */}
          <div className="max-w-3xl space-y-8 animate-fade-in">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-poppins leading-tight text-white uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] tracking-wide">
                INTELLIGENT AUTOMATION <br /> & AI SOLUTIONS
              </h1>
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl font-inter">
                Hi, I'm Afzal Nahid, a passionate <span className="font-semibold text-white">AI Automation Expert</span> specializing in building scalable n8n workflows and intuitive chatbots to drive growth.
              </p>
            </div>

            <div className="flex flex-wrap gap-6 pt-4">
              <Button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-8 py-6 text-sm rounded-full shadow-[0_0_20px_rgba(59,130,246,0.6)] hover:shadow-[0_0_30px_rgba(59,130,246,0.8)] transition-all duration-300 uppercase tracking-wider"
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              >
                View My Projects
              </Button>
              <Button
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-slate-900 bg-transparent font-bold px-8 py-6 text-sm rounded-full transition-all duration-300 uppercase tracking-wider"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Get In Touch
              </Button>
            </div>
            
            {/* Social links */}
            <div className="flex gap-4 pt-8">
              <a
                href="https://www.linkedin.com/in/norayafzalnahid"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-slate-300 hover:text-white transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://www.facebook.com/share/1WyK1mVSVe/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-slate-300 hover:text-white transition-all duration-300 hover:scale-110"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="mailto:nahidafzal97@gmail.com"
                className="p-3 text-slate-300 hover:text-white transition-all duration-300 hover:scale-110"
              >
                <Mail className="w-6 h-6" />
              </a>
              <a
                href="https://wa.me/8801690000732"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-slate-300 hover:text-white transition-all duration-300 hover:scale-110"
              >
                <MessageCircle className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-8 text-center">About Me</h2>
          <div className="space-y-6 text-lg text-slate-300 leading-relaxed">
            <p>
              I'm an AI Automation Expert based in Bangladesh with a passion for transforming businesses through intelligent automation. With expertise in n8n, I've successfully built and deployed 20+ complex workflows that streamline operations, reduce manual work, and unlock new possibilities.
            </p>
            <p>
              My journey in automation began with a simple observation: most businesses waste countless hours on repetitive tasks. I decided to change that. Today, I specialize in creating intelligent systems that work 24/7, learning and adapting to your business needs.
            </p>
            <p>
              From AI-powered chatbots that engage customers across multiple platforms to sophisticated image classifiers and viral content generators, I combine cutting-edge technology with practical business solutions. Every project I undertake is designed with one goal in mind: to deliver measurable value and sustainable growth.
            </p>
            <p>
              When I'm not building workflows, you'll find me exploring new AI technologies, optimizing automation processes, or helping businesses discover the potential of intelligent automation.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-16 text-center">Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="group p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold font-outfit mb-3 text-cyan-400 group-hover:text-purple-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-300 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-16 text-center">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="group p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl border border-slate-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1"
              >
                <div className="text-5xl mb-4">{project.icon}</div>
                <h3 className="text-xl font-bold font-outfit mb-2 text-purple-400 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-300 text-sm mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-xs font-semibold rounded-full border border-cyan-500/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-8 text-center">Let's Connect</h2>
          <p className="text-center text-slate-300 mb-12 text-lg">
            Ready to transform your business with intelligent automation? Let's discuss your project.
          </p>

          <div className="space-y-6">
            {/* Email */}
            <a
              href="mailto:nahidafzal97@gmail.com"
              className="block p-6 bg-gradient-to-r from-cyan-500/10 to-cyan-600/10 border border-cyan-500/30 rounded-lg hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <Mail className="w-8 h-8 text-cyan-400 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-sm text-slate-400">Email</p>
                  <p className="text-lg font-semibold text-cyan-400">nahidafzal97@gmail.com</p>
                </div>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/8801690000732"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-500/30 rounded-lg hover:border-green-400 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <MessageCircle className="w-8 h-8 text-green-400 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-sm text-slate-400">WhatsApp</p>
                  <p className="text-lg font-semibold text-green-400">+880 169 000 0732</p>
                </div>
              </div>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/norayafzalnahid"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/30 rounded-lg hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <Linkedin className="w-8 h-8 text-blue-400 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-sm text-slate-400">LinkedIn</p>
                  <p className="text-lg font-semibold text-blue-400">Afzal Nahid</p>
                </div>
              </div>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/share/1WyK1mVSVe/"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-gradient-to-r from-purple-500/10 to-purple-600/10 border border-purple-500/30 rounded-lg hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <Facebook className="w-8 h-8 text-purple-400 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-sm text-slate-400">Facebook</p>
                  <p className="text-lg font-semibold text-purple-400">Afzal Nahid</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center text-slate-400">
          <p>© 2026 Afzal Nahid. All rights reserved. | AI Automation Expert</p>
        </div>
      </footer>
    </div>
  );
}

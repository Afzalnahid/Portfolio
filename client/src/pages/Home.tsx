import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import MapSection from "@/components/sections/MapSection";
import Contact from "@/components/sections/Contact";
import AiChat from "@/components/AiChat";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-roboto selection:bg-blue-500/30">
      <Navbar />

      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <MapSection />
        <Contact />
      </main>

      <AiChat />

      <footer className="bg-slate-950 border-t border-white/5 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm font-bold tracking-widest text-slate-500 uppercase">
            © 2026 <span className="text-white">Noray Afzal Nahid</span> • AI
            Automation Expert
          </div>
          <div className="flex gap-8 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

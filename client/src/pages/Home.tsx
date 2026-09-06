import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Stats from "@/components/sections/Stats";
import Showcase from "@/components/sections/Showcase";
import Credentials from "@/components/sections/Credentials";
import Toolkit from "@/components/sections/Toolkit";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-ground text-fg font-roboto selection:bg-brand/30">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-5 focus:py-3 focus:rounded-full focus:bg-brand focus:text-white focus:text-xs focus:font-bold focus:uppercase focus:tracking-widest"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main" className="relative z-10">
        <Hero />
        <Stats />
        <Showcase />
        <Credentials />
        <About />
        <Toolkit />
        <Contact />
      </main>

      <footer className="bg-ground border-t border-white/5 py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div className="text-sm font-bold tracking-widest text-subtle">
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-white">Noray Afzal Nahid</span> &bull;
            Full-Stack Developer
          </div>
          <div className="flex gap-8 text-[11px] font-bold text-subtle uppercase tracking-widest">
            <a
              href="mailto:nahidafzal97@gmail.com"
              className="hover:text-white transition-colors"
            >
              Email
            </a>
            <a
              href="https://www.linkedin.com/in/norayafzalnahid"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/Afzalnahid"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

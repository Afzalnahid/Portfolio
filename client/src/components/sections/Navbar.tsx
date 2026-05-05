import { useState, useEffect } from "react";
import { useLocation } from "wouter";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-slate-950/80 backdrop-blur-xl border-b border-white/5 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div
            className="text-xl font-black tracking-tighter bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent uppercase cursor-pointer"
            onClick={() => setLocation("/")}
          >
            Nahid<span className="text-white ml-0.5">.</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-[13px] font-bold uppercase tracking-widest">
            {[
              { name: "About", href: "#about" },
              { name: "Solutions", href: "#solutions" },
              { name: "Contact", href: "#contact" },
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="relative group text-slate-400 hover:text-white transition-colors duration-300"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Mobile menu trigger - currently decorative */}
          <div className="md:hidden w-8 h-8 flex flex-col justify-center gap-1.5 cursor-pointer">
            <div className="w-full h-0.5 bg-white rounded-full" />
            <div className="w-2/3 h-0.5 bg-white rounded-full ml-auto" />
          </div>
        </div>
      </nav>
    </>
  );
}

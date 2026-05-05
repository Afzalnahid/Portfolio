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
            className="text-lg font-black tracking-[0.2em] text-white uppercase cursor-pointer"
            onClick={() => setLocation("/")}
          >
            Nahid<span className="text-[#58a6ff]">.</span>
          </div>
          <div className="hidden md:flex items-center gap-10 text-[11px] font-black uppercase tracking-[0.3em]">
            {[
              { name: "About", href: "#about" },
              { name: "Projects", href: "#solutions" },
              { name: "Contact", href: "#contact" },
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-white/70 hover:text-white transition-colors duration-300"
              >
                {item.name}
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

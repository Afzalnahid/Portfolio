import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { name: "About", href: "#about" },
  { name: "Solutions", href: "#solutions" },
  { name: "Process", href: "#process" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the mobile menu on Escape, and stop the page behind it from scrolling.
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMenuOpen]);

  const goHome = () => {
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled || isMenuOpen
            ? "bg-slate-950/85 backdrop-blur-xl border-b border-white/5 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <button
            type="button"
            onClick={goHome}
            className="text-lg font-black tracking-[0.2em] text-white uppercase rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
          >
            Nahid<span className="text-[#58a6ff]">.</span>
          </button>

          <div className="hidden md:flex items-center gap-10 text-[11px] font-black uppercase tracking-[0.3em]">
            {links.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-white/70 hover:text-white transition-colors duration-300 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
              >
                {item.name}
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="md:hidden w-11 h-11 -mr-2 flex items-center justify-center text-white rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-xl pt-24 px-6"
          >
            <nav className="flex flex-col">
              {links.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.25 }}
                  className="py-6 border-b border-white/5 text-2xl font-black uppercase tracking-tight text-white/80 hover:text-white transition-colors"
                >
                  {item.name}
                </motion.a>
              ))}
            </nav>

            <a
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className="mt-10 block w-full text-center bg-[#1b72e8] hover:bg-[#1559b3] text-white font-bold py-4 rounded-full uppercase tracking-widest text-xs transition-colors"
            >
              Get in touch
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

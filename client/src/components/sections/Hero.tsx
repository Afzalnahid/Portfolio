import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Linkedin, Github, Mail, MessageCircle, FileText, MapPin } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import portrait from "@/nahid-hero.webp";
import backdrop from "@/heroimage.webp";
import { useBooking } from "@/contexts/BookingContext";
import { gsap, SplitText, useGSAP, MOTION_OK, FINE_POINTER, EASE_OUT } from "@/lib/motion";

export const CV_URL = "/resume";

const socials = [
  { label: "GitHub", icon: <Github size={15} />, href: "https://github.com/Afzalnahid" },
  { label: "LinkedIn", icon: <Linkedin size={15} />, href: "https://www.linkedin.com/in/norayafzalnahid" },
  { label: "WhatsApp", icon: <MessageCircle size={15} />, href: "https://wa.me/8801690000732" },
  { label: "Email", icon: <Mail size={15} />, href: "mailto:nahidafzal97@gmail.com" },
];

export default function Hero() {
  const { openBooking } = useBooking();

  // The room starts dark and the light comes up a beat after load. The text is
  // never hidden by this — only the photograph and the room behind it are lit,
  // so nothing a recruiter needs is waiting on an animation.
  const [lit, setLit] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setLit(true);
      return;
    }
    const timer = window.setTimeout(() => setLit(true), 550);
    return () => window.clearTimeout(timer);
  }, []);

  // GSAP (the "Signal" pass, 2026-11-08): the headline's words rise out of a
  // mask and a green line draws under "not demos."; the portrait leans towards
  // the mouse and drifts a little slower than the page on scroll. All of it is
  // skipped under prefers-reduced-motion, and the words are never hidden by
  // anything but GSAP itself.
  const section = useRef<HTMLElement>(null);
  const headline = useRef<HTMLHeadingElement>(null);
  const underline = useRef<HTMLSpanElement>(null);
  const portraitWrap = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      const split = SplitText.create(headline.current, { type: "words", mask: "words" });
      gsap.set(underline.current, { "--u": 0 });
      gsap.timeline({ delay: 0.1 })
        .from(split.words, { yPercent: 110, duration: 0.9, ease: EASE_OUT, stagger: 0.07 })
        .to(underline.current, { "--u": 1, duration: 0.7, ease: "power2.inOut" }, "-=0.35");

      gsap.to(portraitWrap.current, {
        yPercent: 7,
        ease: "none",
        scrollTrigger: { trigger: section.current, start: "top top", end: "bottom top", scrub: true },
      });
      return () => split.revert();
    });

    mm.add(FINE_POINTER, () => {
      const el = section.current;
      if (!el || !card.current) return;
      const rotY = gsap.quickTo(card.current, "rotationY", { duration: 0.7, ease: EASE_OUT });
      const rotX = gsap.quickTo(card.current, "rotationX", { duration: 0.7, ease: EASE_OUT });
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        rotY(((e.clientX - r.left) / r.width - 0.5) * 10);
        rotX(-((e.clientY - r.top) / r.height - 0.5) * 7);
      };
      const leave = () => { rotY(0); rotX(0); };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    });
  }, { scope: section });

  return (
    <section ref={section} className="relative flex flex-col justify-center overflow-hidden bg-ground pt-28 pb-16 sm:pt-32 sm:pb-24">
      {/* The room. Almost black until the light is switched on. */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center grayscale"
        style={{ backgroundImage: `url(${backdrop})` }}
        initial={false}
        animate={{ opacity: lit ? 0.12 : 0.015 }}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ground via-ground/70 to-ground" />

      {/* The lamp itself: a warm pool of light that blooms when it comes on. */}
      <motion.div
        className="absolute -top-1/4 right-0 w-[760px] h-[760px] max-w-[120vw] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(96,165,250,0.16), rgba(37,99,235,0.05) 45%, transparent 70%)" }}
        initial={false}
        animate={{ opacity: lit ? 1 : 0, scale: lit ? 1 : 0.75 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          <div className="lg:col-span-7 space-y-7">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="label text-[#4ADE9B]"
            >
              AI Automation &amp; Product Engineer &middot; n8n, LLMs, Next.js
            </motion.p>

            <h1
              ref={headline}
              className="font-display text-[2.6rem] leading-[1.03] sm:text-6xl lg:text-[4.2rem] font-extrabold text-white"
            >
              I ship real products,
              <br />
              <span ref={underline} className="signal-underline text-[#4ADE9B]">not demos.</span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="text-lg text-fg font-normal max-w-xl leading-relaxed"
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
              <span data-magnetic className="flex flex-col">
              <Button
                asChild
                className="h-14 px-8 rounded-xl bg-brand hover:bg-brand-bright text-ground text-[15px] font-semibold shadow-lg shadow-brand/20 active:scale-[0.98] transition"
              >
                <Link href={CV_URL}>
                  <FileText className="w-4 h-4" />
                  View CV
                </Link>
              </Button>
              </span>
              <span data-magnetic className="flex flex-col">
              <Button
                variant="outline"
                onClick={() => openBooking()}
                className="h-14 px-8 rounded-xl bg-white/5 border-white/15 hover:bg-white/10 hover:text-white text-white text-[15px] font-semibold active:scale-[0.98] transition"
              >
                Book a call
              </Button>
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap items-center gap-x-6 gap-y-4 pt-3"
            >
              <p className="flex items-center gap-2 text-[13px] text-body">
                <span className="w-2 h-2 rounded-full bg-brand-bright animate-pulse" />
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
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-body hover:text-white hover:border-white/25 transition-colors flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-bright"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Portrait. Swap the import above when a new photograph arrives. */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="lg:col-span-5 order-first lg:order-last"
          >
            <div ref={portraitWrap} className="relative mx-auto w-full max-w-[300px] sm:max-w-[360px] lg:max-w-none" style={{ perspective: "1000px" }}>
              <motion.div
                className="absolute -inset-8 bg-brand/12 blur-[70px] rounded-full pointer-events-none"
                initial={false}
                animate={{ opacity: lit ? 1 : 0 }}
                transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
              />

              <div ref={card} className="relative rounded-[1.75rem] overflow-hidden border border-white/12 bg-ground shadow-2xl shadow-black/60 will-change-transform">
                <motion.img
                  src={portrait}
                  alt="Noray Afzal Nahid"
                  width={400}
                  height={400}
                  fetchPriority="high"
                  className="w-full h-full object-cover aspect-square"
                  initial={false}
                  animate={{
                    filter: lit
                      ? "brightness(1) saturate(0.9) contrast(1.05)"
                      : "brightness(0.22) saturate(0.25) contrast(1.15)",
                  }}
                  transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
                />

                {/* The light falling across him from the lamp's side. */}
                <motion.div
                  className="absolute inset-0 pointer-events-none mix-blend-soft-light"
                  style={{ background: "linear-gradient(200deg, rgba(191,219,254,0.55) 0%, rgba(191,219,254,0.12) 35%, transparent 62%)" }}
                  initial={false}
                  animate={{ opacity: lit ? 1 : 0 }}
                  transition={{ duration: 1.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-ground/75 via-transparent to-ground/15 pointer-events-none" />

                <motion.div
                  className="absolute inset-x-0 bottom-0 p-5"
                  initial={false}
                  animate={{ opacity: lit ? 1 : 0.25 }}
                  transition={{ duration: 1.4, delay: 0.35 }}
                >
                  <p className="font-display text-base font-semibold text-white leading-tight">
                    Noray Afzal Nahid
                  </p>
                  <p className="label text-body mt-1.5">Comilla, Bangladesh</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import { MapView } from "@/components/Map";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";

export default function MapSection() {
  return (
    <section
      id="reach"
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-center tracking-tighter uppercase">
            Global Reach
          </h2>
          <div className="w-20 h-1.5 bg-blue-500 rounded-full mb-6" />
          <p className="text-slate-400 text-center max-w-2xl font-light text-lg">
            Empowering businesses across borders with{" "}
            <span className="text-white font-medium">
              intelligent workflows
            </span>{" "}
            and scalable AI solutions.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl group"
        >
          {/* Map Overlay for Cinematic Feel */}
          <div className="absolute inset-0 bg-blue-500/5 pointer-events-none z-10 group-hover:bg-transparent transition-colors duration-700" />
          <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] pointer-events-none z-10" />

          <MapView
            className="w-full h-[500px] grayscale brightness-[0.7] contrast-[1.2] hover:grayscale-0 hover:brightness-100 transition-all duration-1000"
            initialZoom={3}
            initialCenter={{ lat: 23.685, lng: 90.3563 }} // Centered near Bangladesh
          />

          <div className="absolute bottom-8 left-8 z-20 bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-white/5 max-w-xs shadow-2xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <Globe className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-white">
                Active Deployments
              </span>
            </div>
            <p className="text-sm text-slate-300 font-light leading-relaxed">
              Managing 20+ live automations for clients in South Asia, Europe,
              and North America.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
}

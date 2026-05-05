import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "James Wilson",
    role: "CEO, TechFlow Agency",
    text: "Nahid's n8n workflows saved our team 20+ hours a week. His deep understanding of AI and automation logic is unmatched.",
    avatar: "JW"
  },
  {
    name: "Sarah Chen",
    role: "Operations Director",
    text: "The E-commerce chatbot he built for us doubled our engagement rate. The vision-to-product feature is a game changer.",
    avatar: "SC"
  },
  {
    name: "Marcus Thorne",
    role: "Founder, GrowthOps",
    text: "Fast, reliable, and highly professional. He didn't just build a tool; he designed a full business ecosystem.",
    avatar: "MT"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="text-blue-500 font-bold tracking-widest uppercase text-sm mb-4 block">Social Proof</span>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">Client Stories</h2>
          <div className="w-20 h-1.5 bg-blue-500 rounded-full mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white/5 backdrop-blur-sm p-8 rounded-[2rem] border border-white/5 relative group"
            >
              <Quote className="absolute top-6 right-8 w-10 h-10 text-white/5 group-hover:text-blue-500/20 transition-colors" />
              <p className="text-slate-300 text-sm leading-relaxed mb-8 font-light italic">
                "{t.text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-sm">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-tight">{t.name}</h4>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

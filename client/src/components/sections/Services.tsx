const services = [
  {
    title: "n8n Automation",
    description:
      "Build powerful, scalable workflows to automate your business processes and connect your favorite tools.",
    icon: "⚙️",
    color: "from-blue-500/20 to-blue-600/5",
    border: "group-hover:border-blue-500/50",
  },
  {
    title: "Chatbot Development",
    description:
      "Create intelligent, context-aware chatbots for customer support, lead gen, and engagement.",
    icon: "🤖",
    color: "from-cyan-500/20 to-cyan-600/5",
    border: "group-hover:border-cyan-500/50",
  },
  {
    title: "AI Solutions",
    description:
      "Implement cutting-edge AI technology to solve complex problems and extract insights from your data.",
    icon: "✨",
    color: "from-purple-500/20 to-purple-600/5",
    border: "group-hover:border-purple-500/50",
  },
  {
    title: "Workflow Specialist",
    description:
      "Expert consultation and audit of your existing processes to identify automation opportunities.",
    icon: "💡",
    color: "from-emerald-500/20 to-emerald-600/5",
    border: "group-hover:border-emerald-500/50",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-center tracking-tighter uppercase">
            My Services
          </h2>
          <div className="w-20 h-1.5 bg-cyan-500 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              className={`group p-10 bg-gradient-to-br ${service.color} rounded-3xl border border-white/5 ${service.border} transition-all duration-500 hover:-translate-y-2 relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 p-8 text-6xl opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500">
                {service.icon}
              </div>

              <div className="relative z-10">
                <div className="text-4xl mb-6 bg-slate-800/50 w-16 h-16 flex items-center justify-center rounded-2xl border border-white/10">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-400 leading-relaxed text-lg font-light">
                  {service.description}
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-white/5 flex items-center text-sm font-bold text-blue-500 uppercase tracking-widest group-hover:gap-2 transition-all">
                Learn More <span className="text-xl">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

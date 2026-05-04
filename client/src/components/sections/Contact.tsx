import { Mail, Linkedin, Facebook, MessageCircle } from "lucide-react";

const contactLinks = [
  {
    name: "Email",
    value: "nahidafzal97@gmail.com",
    href: "mailto:nahidafzal97@gmail.com",
    icon: <Mail className="w-6 h-6" />,
    color: "from-cyan-500/10 to-cyan-600/5",
    border: "hover:border-cyan-400",
    text: "text-cyan-400",
  },
  {
    name: "WhatsApp",
    value: "+880 1690-000732",
    href: "https://wa.me/8801690000732",
    icon: <MessageCircle className="w-6 h-6" />,
    color: "from-green-500/10 to-green-600/5",
    border: "hover:border-green-400",
    text: "text-green-400",
  },
  {
    name: "LinkedIn",
    value: "Noray Afzal Nahid",
    href: "https://www.linkedin.com/in/norayafzalnahid",
    icon: <Linkedin className="w-6 h-6" />,
    color: "from-blue-500/10 to-blue-600/5",
    border: "hover:border-blue-400",
    text: "text-blue-400",
  },
  {
    name: "Facebook",
    value: "Noray Afzal Nahid",
    href: "https://www.facebook.com/share/1WyK1mVSVe/",
    icon: <Facebook className="w-6 h-6" />,
    color: "from-purple-500/10 to-purple-600/5",
    border: "hover:border-purple-400",
    text: "text-purple-400",
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-center tracking-tighter uppercase">
            Let's Connect
          </h2>
          <div className="w-20 h-1.5 bg-white rounded-full" />
        </div>

        <p className="text-center text-slate-400 mb-16 text-lg font-light max-w-2xl mx-auto">
          Ready to transform your business with{" "}
          <span className="text-white font-medium">intelligent automation</span>
          ? Let's discuss your project and build something amazing together.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contactLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target={link.name !== "Email" ? "_blank" : undefined}
              rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
              className={`group block p-8 bg-gradient-to-r ${link.color} border border-white/5 rounded-2xl ${link.border} transition-all duration-300 hover:shadow-2xl hover:shadow-black/20 hover:-translate-y-1`}
            >
              <div className="flex items-center gap-6">
                <div
                  className={`p-4 rounded-xl bg-slate-900/50 border border-white/5 ${link.text} group-hover:scale-110 transition-transform duration-500 shadow-inner`}
                >
                  {link.icon}
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">
                    {link.name}
                  </p>
                  <p
                    className={`text-lg font-bold ${link.text} tracking-tight`}
                  >
                    {link.value}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-20 p-10 bg-slate-900/40 rounded-3xl border border-white/5 grid grid-cols-1 md:grid-cols-2 gap-8 backdrop-blur-sm">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-2 text-white">Home Office</h3>
            <p className="text-slate-400 font-light text-sm">
              Nazrul Avenue, Kandirpar, Cumilla, Bangladesh.
            </p>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-2 text-white">Workplace</h3>
            <p className="text-slate-400 font-light text-sm">
              Software Technology Park, Agrabad, Chittagong.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/30 relative"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      <div className="max-w-4xl mx-auto relative">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-center tracking-tighter uppercase">
            About Me
          </h2>
          <div className="w-20 h-1.5 bg-blue-600 rounded-full" />
        </div>

        <div className="space-y-8 text-lg text-slate-400 leading-relaxed font-light">
          <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-white first-letter:mr-3 first-letter:float-left">
            I'm an AI Automation Expert based in Bangladesh with a passion for
            transforming businesses through intelligent automation. With
            expertise in <span className="text-white font-medium">n8n</span>,
            I've successfully built and deployed 20+ complex workflows that
            streamline operations, reduce manual work, and unlock new
            possibilities.
          </p>
          <p>
            My journey in automation began with a simple observation: most
            businesses waste countless hours on repetitive tasks. I decided to
            change that. Today, I specialize in creating{" "}
            <span className="text-blue-400 font-medium">
              intelligent systems
            </span>{" "}
            that work 24/7, learning and adapting to your business needs.
          </p>
          <p>
            From AI-powered chatbots that engage customers across multiple
            platforms to sophisticated image classifiers and viral content
            generators, I combine cutting-edge technology with practical
            business solutions. Every project I undertake is designed with one
            goal in mind: to deliver{" "}
            <span className="text-white font-medium italic underline decoration-blue-500 underline-offset-4">
              measurable value
            </span>{" "}
            and sustainable growth.
          </p>
          <p>
            When I'm not building workflows, you'll find me exploring new AI
            technologies, optimizing automation processes, or helping businesses
            discover the potential of intelligent automation.
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />
    </section>
  );
}

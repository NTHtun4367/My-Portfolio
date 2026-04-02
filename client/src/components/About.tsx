import { motion } from "framer-motion";

export default function AboutNarrative() {
  const metrics = [
    { value: "2+", label: "Years Exp.", color: "text-sky-500" },
    { value: "10+", label: "Projects", color: "text-purple-500" },
    { value: "10+", label: "Tech Stack", color: "text-green-500" },
    { value: "24/7", label: "Learning", color: "text-orange-500" },
  ];

  return (
    <motion.section id="about" className="pt-36 px-6 relative overflow-hidden">
      <div className="absolute inset-0 flex justify-around items-center opacity-[0.02] select-none pointer-events-none">
        {metrics.map((m, i) => (
          <span key={i} className="text-[18vw] font-black tracking-tighter">
            {m.value}
          </span>
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Main Header */}
        <div className="mb-20 space-y-4 flex flex-col items-center text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold text-white tracking-tighter"
          >
            About <span className="text-blue-400">Me</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Metrics Grid */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-8">
              {metrics.map((metric, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: idx * 0.1 }}
                >
                  <p className={`text-4xl font-bold font-mono ${metric.color}`}>
                    {metric.value}
                  </p>
                  <p className="text-zinc-500 text-xs uppercase tracking-widest mt-1">
                    {metric.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Narrative Content */}
          <div className="lg:col-span-7 lg:pl-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-12"
            >
              {/* Bio Block */}
              <p className="text-zinc-300 text-xl leading-relaxed font-light">
                I'm{" "}
                <span className="text-white font-medium">
                  Full-Stack Developer
                </span>{" "}
                with 2+ years of experience in the React ecosystem. I specialize
                in building robust backends with Node.js and crafting
                pixel-perfect, high-performance frontends.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="flex flex-wrap items-start gap-16 pt-24">
          {/* Technical Philosophy Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className=" flex-1 space-y-4"
          >
            <div className="flex items-center gap-4">
              <div className="h-px w-8 bg-blue-500/50" />
              <h4 className="text-white font-bold text-lg uppercase tracking-wider">
                Technical Philosophy
              </h4>
            </div>
            <p className="text-zinc-500 text-base leading-relaxed">
              I believe in <span className="text-zinc-300">Type-Safety</span>{" "}
              and <span className="text-zinc-300">Clean Architecture</span>.
              Using TypeScript, I ensure that the data flow is
              predictable and the codebase remains maintainable as the product
              scales.
            </p>
          </motion.div>

          {/* Learning Path Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 space-y-4"
          >
            <div className="flex items-center gap-4">
              <div className="h-px w-8 bg-purple-500/50" />
              <h4 className="text-white font-bold text-lg uppercase tracking-wider">
                Current Learning Path
              </h4>
            </div>
            <p className="text-zinc-500 text-base leading-relaxed">
              Currently deep-diving into{" "}
              <span className="text-zinc-300 font-medium">Python for AI</span>{" "}
              and{" "}
              <span className="text-zinc-300 font-medium">React Native</span>.
              My goal is to integrate intelligent features into cross-platform
              mobile applications, bridging the gap between web logic and native
              mobile AI.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiDownload } from "react-icons/fi";
import { HiArrowUpRight } from "react-icons/hi2";
import { containerVariants, itemVariants } from "../utils/variants";

export default function Hero() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const NAME = "Nay Thu Htun.";

  useEffect(() => {
    let timeout: any;

    if (!isDeleting && index === NAME.length) {
      const pause = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(pause);
    }

    if (isDeleting && index === 0) {
      setIsDeleting(false);
      return;
    }

    const speed = isDeleting ? 50 : 80 + Math.random() * 60;

    timeout = setTimeout(() => {
      const next = isDeleting ? index - 1 : index + 1;
      setIndex(next);
      setText(NAME.substring(0, next));
    }, speed);

    return () => clearTimeout(timeout);
  }, [index, isDeleting]);

  return (
    <>
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center pt-12 px-6 overflow-hidden"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-12"
        >
          {/* left column */}
          <div className="flex flex-col items-start">
            <motion.p
              variants={itemVariants}
              className="text-zinc-400 mb-2 font-medium tracking-wide"
            >
              FullStack Developer
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="text-6xl sm:text-7xl md:text-7xl font-bold leading-tight text-white tracking-tighter"
            >
              Hello I&apos;m <br />
              <span className="font-mono text-blue-400">
                {text}
                <span className="ml-1 animate-pulse">|</span>
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-8 text-zinc-400 max-w-xl text-lg font-light leading-relaxed"
            >
              A 21-year-old developer motivated to build modern and useful web
              apps. I enjoy turning ideas into real products with clean code.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-wrap items-center gap-5"
            >
              <a
                href="#projects"
                className="flex items-center gap-2 px-6 py-3 bg-blue-400 text-white rounded-full hover:bg-blue-400/10 transition-colors font-semibold"
              >
                View Projects <HiArrowUpRight />
              </a>

              <a
                href="#cv"
                className="flex items-center gap-2 px-6 py-3 border-2 border-dashed border-blue-400 text-blue-400 rounded-full hover:bg-blue-400/10 transition-colors font-semibold"
              >
                Download CV <FiDownload />
              </a>
            </motion.div>
          </div>

          {/* right column */}
          <motion.div
            variants={itemVariants}
            className="relative flex items-center justify-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute w-80 h-80 sm:w-112.5 sm:h-112.5 rounded-full border-4 border-dashed border-blue-400/50"
            />

            <div className="w-64 h-64 sm:w-95 sm:h-95 rounded-full overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl relative z-10">
              <img
                src="/path-to-your-photo.jpg"
                alt="Nay Thu Htun"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Code Block */}
      {/* <motion.div
        variants={{
          hidden: { y: 25, opacity: 0 },
          visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
          },
        }}
        className="max-w-6xl mx-auto hidden md:block bg-zinc-900/80 border border-zinc-800 p-6 rounded-3xl font-mono text-xs text-zinc-500 shadow-2xl backdrop-blur-sm"
      >
        <div className="flex gap-1.5 mb-5">
          <div className="size-3 rounded-full bg-red-500/80" />
          <div className="size-3 rounded-full bg-yellow-500/80" />
          <div className="size-3 rounded-full bg-green-500/80" />
        </div>
        <code className="block text-blue-400">const</code> developer = {"{"}
        <code className="ml-4 block">
          name: <span className="text-emerald-400">'Nay Thu Htun'</span>,
        </code>
        <code className="ml-4 block">
          role: <span className="text-emerald-400">'Full Stack'</span>,
        </code>
        <code className="ml-4 block">
          tech: [<span className="text-emerald-400">'React', 'Node', 'TS'</span>
          ],
        </code>
        <code className="ml-4 block">
          seeking: <span className="text-cyan-400">true</span>
        </code>
        {"};"}
      </motion.div> */}
    </>
  );
}

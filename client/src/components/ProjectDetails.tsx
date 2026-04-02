import { motion } from "framer-motion";
import {
  HiArrowLeft,
  HiOutlinePuzzlePiece,
  HiOutlineLightBulb,
  HiOutlineCpuChip,
} from "react-icons/hi2";
import { SiGithub } from "react-icons/si";
import { FiExternalLink } from "react-icons/fi";

interface ProjectDetailsProps {
  project: any;
  onBack: () => void;
}

export default function ProjectDetails({
  project,
  onBack,
}: ProjectDetailsProps) {
  return (
    // --- User's Provided Details Structure ---
    <motion.section
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-[#0a0a0c] py-24 px-6 text-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Navigation */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-zinc-500 hover:text-white mb-12 transition-colors group"
        >
          <HiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-16">
          {/* Main Content */}
          <div className="space-y-12">
            {/* Header Content */}
            <div>
              <span className="text-blue-400 font-mono text-sm uppercase tracking-[0.3em]">
                {project.category}
              </span>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mt-4 bg-linear-to-b from-white to-zinc-500 bg-clip-text text-transparent">
                {project.title}
              </h1>
            </div>

            {/* Image Container */}
            <div className="rounded-[3rem] overflow-hidden border border-zinc-800 aspect-video relative group">
              <img
                src={project.image}
                className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                alt={project.title}
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0c] via-transparent to-transparent opacity-60" />
            </div>

            {/* Description Sections */}
            <div className="space-y-10">
              {/* Problem/Solution Section (User mentioned approach) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-zinc-800">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-blue-400">
                    <HiOutlinePuzzlePiece size={20} />
                    <h3 className="font-bold uppercase tracking-widest text-xs">
                      The Problem
                    </h3>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {project.problem}
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-green-400">
                    <HiOutlineLightBulb size={20} />
                    <h3 className="font-bold uppercase tracking-widest text-xs">
                      The Solution
                    </h3>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* General About */}
              <div className="space-y-6 pt-8 border-t border-zinc-800">
                <h2 className="text-3xl font-bold tracking-tight">
                  About the project
                </h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-zinc-400 text-lg leading-relaxed">
                    {project.longDescription}
                  </p>
                </div>
              </div>

              {/* Key Features (User mentioned approach) */}
              <div className="space-y-8 pt-8 border-t border-zinc-800">
                <h3 className="text-2xl font-bold">Key Capabilities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.features?.map((feature: any, i: number) => (
                    <div
                      key={i}
                      className="p-8 bg-zinc-900/30 border border-zinc-800 rounded-[2rem] hover:bg-zinc-900/50 transition-colors"
                    >
                      <h4 className="text-white font-bold mb-2">
                        {feature.name}
                      </h4>
                      <p className="text-zinc-500 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-12">
            {/* Tech Stack Box (User's provided structure) */}
            <div className="bg-zinc-900/50 border border-zinc-800 p-10 rounded-[2.5rem] sticky top-12 space-y-10">
              <div>
                <h3 className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] font-bold mb-8 flex items-center gap-2">
                  <HiOutlineCpuChip className="text-blue-500" size={16} />{" "}
                  Technologies used
                </h3>
                <div className="flex flex-wrap gap-3">
                  {project.tech.map((t: any, i: number) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 px-4 py-2.5 bg-zinc-800/60 rounded-xl border border-zinc-700/50 text-zinc-300"
                    >
                      <span className="text-xl text-blue-400">{t.icon}</span>
                      <span className="text-xs font-medium tracking-tight">
                        {t.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Links (User mentioned approach) */}
              <div className="pt-8 border-t border-zinc-800 flex flex-col sm:flex-row gap-4">
                <a
                  href={project.github}
                  target="_blank"
                  className="flex items-center justify-center gap-2 px-6 py-3.5 bg-zinc-800 border border-zinc-700 rounded-xl hover:bg-zinc-700/50 transition-all text-sm font-medium"
                >
                  <SiGithub size={18} /> GitHub Repo
                </a>
                <a
                  href={project.live}
                  target="_blank"
                  className="flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20 text-sm"
                >
                  Live Preview <FiExternalLink />
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </motion.section>
  );
}

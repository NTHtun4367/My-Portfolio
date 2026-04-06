import { motion } from "framer-motion";
import { useParams, useNavigate, Link } from "react-router";
import { useGetProjectQuery } from "../store/slices/projectApi";
import {
  HiArrowLeft,
  HiOutlinePuzzlePiece,
  HiOutlineLightBulb,
  HiOutlineCpuChip,
} from "react-icons/hi2";
import { SiGithub } from "react-icons/si";
import { FiExternalLink } from "react-icons/fi";
import { IconMap } from "../common/Icons";
import { Badge } from "./ui/badge";
import Footer from "./Footer";
import Navbar from "./NavBar";
import ScrollToTop from "./ScrollToTop";

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: project, isLoading } = useGetProjectQuery(id!);

  if (isLoading)
    return (
      <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center text-white">
        Loading Details...
      </div>
    );
  if (!project)
    return (
      <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center text-white">
        Project not found.
      </div>
    );

  return (
    <div className="bg-[#0a0a0c] ">
      <Navbar />
      <motion.section
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.4 }}
        className="min-h-screen py-28 md:py-36 px-6 text-white"
      >
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-zinc-500 hover:text-white mb-12 transition-colors group"
          >
            <HiArrowLeft className="group-hover:-translate-x-1 transition-transform" />{" "}
            Back to Projects
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-16">
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row items-start gap-3 md:gap-0 md:items-end justify-between">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mt-4 bg-linear-to-b from-white to-zinc-500 bg-clip-text text-transparent">
                  {project.title}
                </h1>
                <Badge className="text-blue-400 text-[10px] md:text-xs uppercase tracking-widest p-3 md:p-5">
                  {project.category}
                </Badge>
              </div>

              <div className="rounded-[2.5rem] overflow-hidden border border-zinc-800 aspect-video relative group">
                <img
                  src={project.image?.url}
                  className="w-full h-full object-cover transition-all duration-700"
                  alt={project.title}
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0c] via-transparent to-transparent opacity-60" />
              </div>

              <div className="space-y-10">
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

                <div className="space-y-6 pt-8 border-t border-zinc-800">
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                    About the project
                  </h2>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                      {project.longDescription}
                    </p>
                  </div>
                </div>

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

            <aside className="space-y-12">
              <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-[2.5rem] sticky top-36 space-y-10">
                <div>
                  <h3 className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] font-bold mb-8 flex items-center gap-2">
                    <HiOutlineCpuChip className="text-blue-500" size={16} />{" "}
                    Technologies used
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {project.tech?.map((techName: string, i: number) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 px-3 py-1 bg-zinc-800/60 rounded-lg border border-zinc-700/50 text-zinc-300"
                      >
                        <span className="text-xl text-blue-400">
                          {IconMap[techName] || IconMap["react"]}
                        </span>
                        <span className="text-xs font-medium capitalize tracking-tight">
                          {techName}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 border-t border-zinc-800 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Link
                    to={project.github}
                    target="_blank"
                    className="flex-1 px-6 py-3.5 bg-zinc-800 border border-zinc-700 rounded-xl hover:bg-zinc-700/50 transition-all text-sm font-medium"
                  >
                    <span className="flex items-center justify-center gap-2 text-xs">
                      <SiGithub size={18} /> GitHub Repo
                    </span>
                  </Link>
                  <Link
                    to={project.live}
                    target="_blank"
                    className="flex-1 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold transition-all shadow-lg text-sm"
                  >
                    <span className="flex items-center justify-center gap-2 text-xs">
                      Live Preview <FiExternalLink />
                    </span>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </motion.section>
      <ScrollToTop />
      <Footer />
    </div>
  );
}

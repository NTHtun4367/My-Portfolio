import { motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi2";
import { useNavigate } from "react-router";
import { useGetProjectsQuery } from "../store/slices/projectApi";
import { IconMap } from "../common/Icons";
import { ProjectSkeleton } from "./skeleton/ProjectSkeleton";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Projects() {
  const navigate = useNavigate();
  const { data: projects, isLoading } = useGetProjectsQuery();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      id="projects"
      className="min-h-screen pt-36 md:px-6 text-white"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-20 space-y-4 flex flex-col items-center text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold tracking-tighter"
          >
            Featured <span className="text-blue-400">Works</span>
          </motion.h2>
          <p className="text-zinc-500 font-mono">
            A curated selection of my recent full-stack projects.
          </p>
        </div>

        {/* Conditional Rendering: Skeleton vs Content */}
        {isLoading ? (
          <ProjectSkeleton />
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {projects?.map((project: any) => (
              <motion.div
                key={project._id}
                variants={cardVariants as any}
                onClick={() => navigate(`/project/${project._id}`)}
                className="group relative flex flex-col bg-zinc-900/20 border border-zinc-800 rounded-[2.5rem] overflow-hidden cursor-pointer hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="absolute top-6 left-6 z-20">
                  <div className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full">
                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="relative aspect-4/3 overflow-hidden">
                  <img
                    src={project.image?.url}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-50 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

                  {/* Tech Stack Icons Section */}
                  <div className="absolute bottom-4 left-6 right-6 flex items-center gap-2 overflow-hidden">
                    {project.tech
                      ?.slice(0, 4)
                      .map((techName: string, idx: number) => (
                        <div
                          key={idx}
                          className="p-2 bg-white/5 backdrop-blur-md rounded-lg border border-white/10 text-zinc-300"
                        >
                          {IconMap[techName] || IconMap["react"]}
                        </div>
                      ))}

                    {/* Logic for showing +N remaining items */}
                    {project.tech?.length > 4 && (
                      <div className="px-2 py-1 bg-white/5 backdrop-blur-md rounded-lg border border-white/10 text-zinc-400 text-sm font-bold font-mono">
                        +{project.tech.length - 4}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-8 pt-2 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-2xl font-bold group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <div className="size-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                      <HiArrowRight className="text-blue-400" />
                    </div>
                  </div>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-6 line-clamp-3">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}

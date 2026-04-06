import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export function ProjectSkeleton() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
    >
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="flex flex-col bg-zinc-900/20 border border-zinc-800 rounded-[2.5rem] overflow-hidden"
        >
          {/* Top Category Badge Skeleton */}
          <div className="relative aspect-4/3 bg-zinc-800/50 animate-pulse">
            <div className="absolute top-6 left-6 z-20">
              <div className="w-20 h-6 bg-zinc-700/50 rounded-full" />
            </div>

            {/* Tech Icons Skeleton */}
            <div className="absolute bottom-4 left-6 right-6 flex items-center gap-2">
              {[...Array(3)].map((_, j) => (
                <div
                  key={j}
                  className="size-10 bg-zinc-700/50 rounded-lg border border-white/5"
                />
              ))}
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="p-8 pt-6 flex-1 flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div className="h-8 w-3/4 bg-zinc-800/50 rounded-lg animate-pulse" />
              <div className="size-10 rounded-full bg-zinc-800/50 animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-zinc-800/30 rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-zinc-800/30 rounded animate-pulse" />
              <div className="h-4 w-4/6 bg-zinc-800/30 rounded animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  );
}

import { motion } from "framer-motion";
import { HiSparkles } from "react-icons/hi2";
import { IconMap } from "../common/Icons";

const SKILL_GROUPS = [
  {
    title: "Fullstack Expertise",
    description: "Main stack for building scalable web apps",
    skills: [
      { name: "React", icon: IconMap["react"], color: "text-cyan-400" },
      { name: "Next.js", icon: IconMap["nextjs"], color: "text-white" },
      {
        name: "TypeScript",
        icon: IconMap["typescript"],
        color: "text-blue-600",
      },
      { name: "Node.js", icon: IconMap["node"], color: "text-green-500" },
      { name: "Tailwind", icon: IconMap["tailwind"], color: "text-sky-400" },
      { name: "Redux / RTK", icon: IconMap["redux"], color: "text-purple-500" },
      {
        name: "Zustand",
        icon: <span className="font-bold">Z</span>,
        color: "text-amber-700",
      },
      { name: "Shadcn UI", icon: IconMap["shadcn"], color: "text-white" },
      {
        name: "Framer Motion",
        icon: IconMap["framer"],
        color: "text-pink-500",
      },
    ],
  },
  {
    title: "Backend & Database",
    description: "Architecture and data management",
    skills: [
      { name: "Express", icon: IconMap["express"], color: "text-zinc-400" },
      { name: "MongoDB", icon: IconMap["mongodb"], color: "text-emerald-500" },
      { name: "Mongoose", icon: IconMap["mongoose"], color: "text-red-600" },
      {
        name: "PostgreSQL",
        icon: IconMap["postgresql"],
        color: "text-indigo-400",
      },
      { name: "MySQL", icon: IconMap["mysql"], color: "text-blue-400" },
      { name: "Drizzle", icon: IconMap["drizzle"], color: "text-[#C5F74F]" },
      {
        name: "Cloudinary",
        icon: IconMap["cloudinary"],
        color: "text-blue-400",
      },
      {
        name: "REST APIs",
        icon: <HiSparkles />,
        color: "text-yellow-500",
      },
    ],
  },
  {
    title: "Academic Foundation",
    description: "Core Computer Science from University",
    skills: [
      { name: "C Language", icon: IconMap["c"], color: "text-blue-500" },
      { name: "C++", icon: IconMap["cpp"], color: "text-blue-600" },
      { name: "Java", icon: IconMap["java"], color: "text-orange-500" },
      { name: "PHP", icon: IconMap["php"], color: "text-indigo-400" },
      { name: "HTML5", icon: IconMap["html"], color: "text-orange-500" },
      { name: "CSS3", icon: IconMap["css"], color: "text-blue-500" },
      {
        name: "JavaScript",
        icon: IconMap["javascript"],
        color: "text-yellow-400",
      },
    ],
  },
  {
    title: "Tools & Learning",
    description: "Workflow, DevOps & Future paths",
    skills: [
      { name: "Git", icon: IconMap["git"], color: "text-orange-600" },
      { name: "GitHub", icon: IconMap["github"], color: "text-white" },
      { name: "Docker", icon: IconMap["docker"], color: "text-blue-500" },
      { name: "Figma", icon: IconMap["figma"], color: "text-purple-400" },
      { name: "Postman", icon: IconMap["postman"], color: "text-orange-500" },
      { name: "Cypress", icon: IconMap["cypress"], color: "text-emerald-400" },
      {
        name: "React Native",
        icon: IconMap["react"],
        color: "text-cyan-400",
        isLearning: true,
      },
      {
        name: "Python (AI)",
        icon: IconMap["python"],
        color: "text-yellow-500",
        isLearning: true,
      },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function Skills() {
  return (
    <section id="skills" className="pt-36 md:px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-20 space-y-4 flex flex-col items-center text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white tracking-tighter"
          >
            Skills & <span className="text-blue-400">Expertise</span>
          </motion.h2>
          <p className="text-zinc-500 font-mono text-base">
            Bridging University Foundation with Fullstack Industry Standards
          </p>
        </div>

        {/* Grouped Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SKILL_GROUPS.map((group, index) => (
            <motion.div
              key={index}
              variants={cardVariants as any}
              className="group relative bg-zinc-900/40 border border-zinc-800 p-6 rounded-[2rem] overflow-hidden hover:border-blue-400/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl flex flex-col"
            >
              {/* Background Glow */}
              <div className="absolute -top-24 -right-24 size-48 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/50 transition-colors duration-500" />

              <div className="relative z-10 flex flex-col h-full">
                <h3 className="text-lg font-bold text-white mb-1">
                  {group.title}
                </h3>
                <p className="text-zinc-500 text-[12px] mb-6 font-light leading-relaxed h-8">
                  {group.description}
                </p>

                <div className="flex flex-wrap gap-2.5">
                  {group.skills.map((skill, sIndex) => (
                    <div
                      key={sIndex}
                      className="relative flex items-center gap-2 bg-zinc-800/30 border border-zinc-700/50 px-2.5 py-1.5 rounded-lg group/skill hover:bg-zinc-800 hover:border-zinc-600 transition-all duration-300"
                    >
                      <span
                        className={`text-base ${skill.color} transition-transform group-hover/skill:scale-110 duration-300`}
                      >
                        {skill.icon}
                      </span>
                      <span className="text-zinc-300 text-[11px] font-medium whitespace-nowrap">
                        {skill.name}
                      </span>

                      {skill.isLearning && (
                        <div className="absolute -top-1 -right-1 bg-blue-500 text-white p-0.5 rounded-full shadow-lg animate-pulse">
                          <HiSparkles className="size-2" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

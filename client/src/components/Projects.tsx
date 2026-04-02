import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowRight } from "react-icons/hi2";
import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiRedux,
  SiPostgresql,
} from "react-icons/si";
import ProjectDetails from "./ProjectDetails";

// --- FAKE DATA (MOCK DATA) START ---
const PROJECTS_DATA = [
  {
    id: "agribridge",
    title: "AgriBridge",
    category: "Full Stack / AI",
    image:
      "https://images.unsplash.com/photo-1523348830342-d0187cf0c28d?q=80&w=2070&auto=format&fit=crop",
    description:
      "A digital ecosystem connecting farmers and merchants in Ayeyarwady Region with AI integration.",
    longDescription:
      "AgriBridge is a comprehensive solution designed to modernize the agricultural sector. It features a real-time market price tracker, a secure merchant-farmer marketplace, and an AI-driven advisory system that helps farmers diagnose crop diseases and get professional advice instantly.",
    problem:
      "Farmers in rural areas lack access to real-time market prices and expert agricultural advice, leading to low profits and crop failures.",
    solution:
      "Integrated Groq AI API for instant consultation and a MERN-based dashboard for real-time price monitoring and secure trading.",
    github: "https://github.com/yourusername/agribridge",
    live: "https://agribridge-demo.com",
    tech: [
      { name: "React", icon: <SiReact /> },
      { name: "Node.js", icon: <SiNodedotjs /> },
      { name: "TypeScript", icon: <SiTypescript /> },
      { name: "MongoDB", icon: <SiMongodb /> },
      { name: "Redux", icon: <SiRedux /> },
      { name: "Tailwind", icon: <SiTailwindcss /> },
    ],
    features: [
      {
        name: "AI Consultant",
        description: "Groq API integration for crop disease diagnosis.",
      },
      {
        name: "Price Tracker",
        description: "Real-time updates of local crop prices.",
      },
      {
        name: "Merchant Marketplace",
        description:
          "Role-based system handling merchant_preorders and merchant_disputes.",
      },
    ],
  },
  {
    id: "shopnest",
    title: "ShopNest",
    category: "E-Commerce",
    image:
      "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=2089&auto=format&fit=crop",
    description:
      "A modern e-commerce platform with real-time inventory management and secure checkout.",
    longDescription:
      "ShopNest is a high-performance e-commerce application focusing on seamless user experience. Built with Next.js and PostgreSQL, it includes features like advanced filtering, real-time stock updates, and a robust admin panel for order management.",
    problem:
      "Small businesses struggle with inventory management and secure online payment processing.",
    solution:
      "Developed a scalable architecture using PostgreSQL and Drizzle ORM to handle complex relational data efficiently.",
    github: "https://github.com/yourusername/shopnest",
    live: "https://shopnest-demo.com",
    tech: [
      { name: "Next.js", icon: <SiReact /> },
      { name: "PostgreSQL", icon: <SiPostgresql /> },
      { name: "Drizzle ORM", icon: <SiTypescript /> },
      { name: "Tailwind", icon: <SiTailwindcss /> },
      { name: "Framer", icon: <SiFramer /> },
    ],
    features: [
      {
        name: "Inventory System",
        description: "Automated stock tracking and alerts.",
      },
      {
        name: "Secure Payments",
        description: "Integration with Stripe for reliable checkout.",
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

export default function Projects() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedProject = PROJECTS_DATA.find((p) => p.id === selectedId);

  return (
    <>
      <AnimatePresence mode="wait">
        {!selectedId ? (
          <motion.section
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            id="projects"
            className="min-h-screen pt-36 px-6 text-white"
          >
            <div className="max-w-6xl mx-auto">
              {/* Section Header */}
              <div className="mb-20 space-y-4 flex flex-col items-center text-center">
                <motion.h2
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-5xl md:text-6xl font-bold text-white tracking-tighter"
                >
                  Featured <span className="text-blue-400">Works</span>
                </motion.h2>
                <p className="text-zinc-500 font-mono text-base">
                  A curated selection of my recent full stack projects.
                </p>
              </div>

              {/* Grid with New Card Design */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
              >
                {PROJECTS_DATA.map((project) => (
                  <motion.div
                    key={project.id}
                    variants={cardVariants as any}
                    onClick={() => setSelectedId(project.id)}
                    className="group relative flex flex-col bg-zinc-900/20 border border-zinc-800 rounded-[2.5rem] overflow-hidden cursor-pointer hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
                  >
                    {/* Top Overlay: Category Tag */}
                    <div className="absolute top-6 left-6 z-20">
                      <div className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full">
                        <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Image Area */}
                    <div className="relative aspect-4/3 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-50 group-hover:grayscale-0"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

                      {/* Tech Stack Floating Bar */}
                      <div className="absolute bottom-4 left-6 right-6 flex gap-2 overflow-hidden">
                        {project.tech.slice(0, 4).map((t, idx) => (
                          <div
                            key={idx}
                            className="p-2 bg-white/5 backdrop-blur-md rounded-lg border border-white/10 text-zinc-300"
                          >
                            {t.icon}
                          </div>
                        ))}
                        {project.tech.length > 4 && (
                          <div className="flex items-center px-2 bg-white/5 backdrop-blur-md rounded-lg border border-white/10 text-[10px] text-zinc-400">
                            +{project.tech.length - 4}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-8 pt-2 flex-1 flex flex-col">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
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

                    {/* Animated Border Glow */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/5 rounded-[2.5rem] transition-all pointer-events-none" />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.section>
        ) : (
          selectedProject && (
            <ProjectDetails
              key="details"
              project={selectedProject}
              onBack={() => setSelectedId(null)}
            />
          )
        )}
      </AnimatePresence>
    </>
  );
}

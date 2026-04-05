import type { JSX } from "react";
import { FaGithub, FaLinkedin, FaCode } from "react-icons/fa";
import { HiOutlineCpuChip, HiOutlineLockClosed } from "react-icons/hi2"; // Added HiOutlineLockClosed
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiFramer,
  SiGit,
  SiDocker,
  SiDrizzle,
  SiFigma,
  SiMysql,
  SiCloudinary,
  SiPython,
  SiRedux,
  SiShadcnui,
  SiMongoose,
  SiCplusplus,
  SiC,
  SiOpenjdk,
  SiPhp,
  SiCypress,
  SiPostman,
  SiStripe, // Added SiStripe
} from "react-icons/si";

export const IconMap: Record<string, JSX.Element> = {
  // Social & Branding
  github: <FaGithub className="text-white" />,
  linkedin: <FaLinkedin className="text-blue-400" />,

  // Languages
  html: <SiHtml5 className="text-orange-500" />,
  css: <SiCss className="text-blue-500" />,
  javascript: <SiJavascript className="text-yellow-400" />,
  typescript: <SiTypescript className="text-blue-600" />,
  python: <SiPython className="text-yellow-500" />,
  cpp: <SiCplusplus className="text-blue-600" />,
  c: <SiC className="text-blue-500" />,
  java: <SiOpenjdk className="text-orange-500" />,
  php: <SiPhp className="text-indigo-400" />,

  // Frontend Frameworks & Libraries
  react: <SiReact className="text-cyan-400" />,
  nextjs: <SiNextdotjs className="text-white" />,
  redux: <SiRedux className="text-purple-500" />,
  framer: <SiFramer className="text-pink-500" />,
  tailwind: <SiTailwindcss className="text-sky-400" />,
  shadcn: <SiShadcnui className="text-white" />,

  // Backend & Database
  node: <SiNodedotjs className="text-green-500" />,
  express: <SiExpress className="text-zinc-400" />,
  mongodb: <SiMongodb className="text-emerald-500" />,
  mongoose: <SiMongoose className="text-red-600" />,
  postgresql: <SiPostgresql className="text-indigo-400" />,
  mysql: <SiMysql className="text-blue-400" />,
  drizzle: <SiDrizzle className="text-[#C5F74F]" />,

  // Payments & Auth
  stripe: <SiStripe className="text-[#635BFF]" />,
  authjs: <HiOutlineLockClosed className="text-zinc-400" />,

  // Tools & DevOps
  git: <SiGit className="text-orange-600" />,
  docker: <SiDocker className="text-blue-500" />,
  figma: <SiFigma className="text-purple-400" />,
  cloudinary: <SiCloudinary className="text-blue-400" />,
  cypress: <SiCypress className="text-emerald-400" />,
  postman: <SiPostman className="text-orange-500" />,
  groq: <HiOutlineCpuChip className="text-orange-500" />,

  code: <FaCode className="text-blue-500" />,
  default: <FaCode className="text-blue-500" />,
};

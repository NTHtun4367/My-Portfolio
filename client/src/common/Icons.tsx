import { FaGithub, FaLinkedin, FaCode } from "react-icons/fa";
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
} from "react-icons/si";

export const IconMap = {
  // Social & Branding
  github: <FaGithub />,
  linkedin: <FaLinkedin />,

  // Languages
  html: <SiHtml5 />,
  css: <SiCss />,
  javascript: <SiJavascript />,
  typescript: <SiTypescript />,
  python: <SiPython />,
  cpp: <SiCplusplus />,
  c: <SiC />,
  java: <SiOpenjdk />,
  php: <SiPhp />,

  // Frontend Frameworks & Libraries
  react: <SiReact />,
  nextjs: <SiNextdotjs />,
  redux: <SiRedux />,
  framer: <SiFramer />,
  tailwind: <SiTailwindcss />,
  shadcn: <SiShadcnui />,

  // Backend & Database
  node: <SiNodedotjs />,
  express: <SiExpress />,
  mongodb: <SiMongodb />,
  mongoose: <SiMongoose />,
  postgresql: <SiPostgresql />,
  mysql: <SiMysql />,
  drizzle: <SiDrizzle />,

  // Tools & DevOps
  git: <SiGit />,
  docker: <SiDocker />,
  figma: <SiFigma />,
  cloudinary: <SiCloudinary />,
  cypress: <SiCypress />,
  postman: <SiPostman />,

  code: <FaCode />,
  default: <FaCode />,
};

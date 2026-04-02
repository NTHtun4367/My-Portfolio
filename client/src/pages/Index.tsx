import Hero from "../components/Hero";
import Navbar from "../components/NavBar";
import { motion } from "framer-motion";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import About from "../components/About";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

function Index() {
  return (
    <div className="relative px-6 bg-neutral-950 overflow-hidden">
      <div
        className="absolute top-0 left-0 inset-0 z-0 opacity-35 "
        style={{
          maskImage:
            "radial-gradient(circle at center, black 30%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 30%, transparent 90%)",
        }}
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="hero-dots"
              x="0"
              y="0"
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1" fill="#9ca3af" fillOpacity="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-dots)" />
        </svg>
      </div>

      <motion.div
        initial={{ x: 0, y: 0, opacity: 0 }}
        animate={{ x: [0, 30, -10], y: [0, -40, 10] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"
      />

      <motion.div
        initial={{ x: 0, y: 0, opacity: 0 }}
        animate={{ x: [0, -60, 0], y: [0, 30, 0], opacity: 1 }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl"
      />

      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />

      <ScrollToTop />
    </div>
  );
}

export default Index;

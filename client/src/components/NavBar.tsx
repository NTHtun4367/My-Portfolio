import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiCode, HiMenu, HiX } from "react-icons/hi";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Parent variant for staggering mobile links
  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: -10 },
    open: { opacity: 1, x: 0 },
  };

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
      className="fixed top-6 inset-x-0 max-w-7xl mx-auto z-50 px-4"
    >
      <div className="flex flex-col bg-zinc-900/40 backdrop-blur-lg border border-zinc-800 rounded-[2rem] shadow-2xl overflow-hidden">
        {/* Main Bar */}
        <div className="flex items-center justify-between p-4 px-6">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-2 font-bold text-xl tracking-tighter"
          >
            <HiCode className="text-blue-500 size-6" />
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-300">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                whileHover={{ scale: 1.05 }}
                className="hover:text-white transition-colors"
              >
                {link.name}
              </motion.a>
            ))}
          </div>

          {/* Right Section: Socials (Desktop) & Hamburger (Mobile) */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-4 text-zinc-400">
              <a
                href="https://github.com/NTHtun4367"
                target="_blank"
                className="hover:text-white hover:scale-110 transition-transform"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://linkedin.com/in/https://mm.linkedin.com/in/nay-thu-htun-372704318"
                target="_blank"
                className="hover:text-blue-400 hover:scale-110 transition-transform"
              >
                <FaLinkedin size={20} />
              </a>
            </div>

            {/* Mobile Toggle Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-zinc-300 hover:text-white transition-colors"
            >
              {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="md:hidden px-6 pb-6 flex flex-col gap-4 border-t border-zinc-800/50 pt-4"
            >
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  variants={itemVariants}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-zinc-300 hover:text-white text-lg font-medium"
                >
                  {link.name}
                </motion.a>
              ))}

              {/* Mobile Socials (visible only on very small screens if hidden in main bar) */}
              <div className="flex sm:hidden gap-4 pt-4 border-t border-zinc-800/50 text-zinc-400">
                <a href="https://github.com/NTHtun4367">
                  <FaGithub size={20} />
                </a>
                <a href="https://linkedin.com/in/https://mm.linkedin.com/in/nay-thu-htun-372704318">
                  <FaLinkedin size={20} />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

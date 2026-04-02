import { motion } from "framer-motion";
import {
  HiOutlineEnvelope,
  HiOutlineMapPin,
  HiOutlineChatBubbleLeftRight,
} from "react-icons/hi2";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-125 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Main Header */}
        <div className="mb-20 space-y-4 flex flex-col items-center text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold text-white tracking-tighter"
          >
            Get in <span className="text-blue-400">Touch</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Column: Info & Socials */}
          <div className="lg:col-span-5 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <p className="text-zinc-400 text-lg leading-relaxed max-w-md">
                I’m currently looking for new opportunities and collaborations.
                Whether you have a question or just want to say hi, my inbox is
                always open.
              </p>
            </motion.div>

            {/* Contact Details */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4 group">
                <div className="size-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:border-blue-500/50 group-hover:text-blue-400 transition-all">
                  <HiOutlineEnvelope className="size-5" />
                </div>
                <div>
                  <p className="text-zinc-500 text-xs uppercase tracking-widest">
                    Email
                  </p>
                  <p className="text-white font-medium">naythu1943@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="size-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:border-purple-500/50 group-hover:text-purple-400 transition-all">
                  <HiOutlineMapPin className="size-5" />
                </div>
                <div>
                  <p className="text-zinc-500 text-xs uppercase tracking-widest">
                    Location
                  </p>
                  <p className="text-white font-medium">
                    Pathein, Ayeyarwaddy, Myanmar
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 pt-4"
            >
              {[
                { icon: <FaGithub />, link: "#", color: "hover:text-white" },
                {
                  icon: <FaLinkedin />,
                  link: "#",
                  color: "hover:text-blue-400",
                },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.link}
                  className={`size-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 text-xl transition-all ${social.color} hover:border-zinc-700`}
                >
                  {social.icon}
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <form className="space-y-6 bg-zinc-900/30 border border-zinc-800/50 p-8 md:p-10 rounded-[2.5rem] backdrop-blur-sm hover:border-blue-500/50 transition-all duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-zinc-500 uppercase tracking-widest ml-1">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-blue-500/50 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono text-zinc-500 uppercase tracking-widest ml-1">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-blue-500/50 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-500 uppercase tracking-widest ml-1">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                />
              </div>

              <button className="w-full group relative flex items-center justify-center gap-3 bg-white text-black font-bold py-4 rounded-2xl overflow-hidden transition-all hover:pr-8">
                <span className="relative z-10">Send Message</span>
                <HiOutlineChatBubbleLeftRight className="size-5 transition-all group-hover:scale-110" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

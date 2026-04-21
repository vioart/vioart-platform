"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="relative py-16 md:py-32 text-center overflow-hidden">
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-50 top-0 w-125 h-125 bg-blue-500/10 blur-[120px]" />
        <div className="absolute right-50 bottom-0 w-125 h-125 bg-purple-500/10 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* TITLE */}
          <p className="text-xs tracking-[0.2em] text-blue-400 uppercase mb-3">
            Kontak
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold">
            Mari{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              Bekerja Sama
            </span>
          </h2>

          <p className="text-gray-400 mt-3 max-w-md mx-auto leading-relaxed text-sm md:text-base">
            Punya ide project atau ingin berkolaborasi? Saya terbuka untuk
            peluang baru, freelance, maupun kerja sama jangka panjang.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-5 mt-8 md:mt-12 max-w-md mx-auto">
            {/* EMAIL */}
            <a
              href="mailto:vioartdeveoper@gmail.com"
              className="group relative px-5 py-2.5 md:px-6 md:py-3 gap-2 md:gap-3 text-sm rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center min-w-[120px] text-gray-300 hover:text-white transition hover:scale-[1.05]"
            >
              <Mail className="w-4 h-4 md:w-4 md:h-4 text-blue-400" />
              Email
              <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-xl -z-10" />
            </a>

            {/* LINKEDIN */}
            <Link
              href="https://linkedin.com/in/vioarvendha"
              target="_blank"
              className="group relative px-5 py-2.5 md:px-6 md:py-3 gap-2 md:gap-3 text-sm rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center min-w-[120px] text-gray-300 hover:text-white transition hover:scale-[1.05]"
            >
              <FaLinkedin className="w-4 h-4 md:w-4 md:h-4 text-blue-400" />
              LinkedIn
              <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-xl -z-10" />
            </Link>

            {/* GITHUB */}
            <Link
              href="https://github.com/vioart"
              target="_blank"
              className="group relative px-5 py-2.5 md:px-6 md:py-3 gap-2 md:gap-3 text-sm rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center min-w-[120px] text-gray-300 hover:text-white transition hover:scale-[1.05]"
            >
              <FaGithub className="w-4 h-4 md:w-4 md:h-4 text-blue-400" />
              GitHub
              <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-xl -z-10" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

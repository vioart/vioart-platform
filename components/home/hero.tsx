"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative py-32 overflow-hidden">

      {/* 🌌 BACKGROUND (FULL WIDTH - NO MORE BOX) */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-[-300px] top-[-300px] w-[1000px] h-[1000px] bg-[radial-gradient(circle,_rgba(59,130,246,0.15)_0%,_transparent_70%)]" />
        <div className="absolute right-[-300px] bottom-[-300px] w-[1000px] h-[1000px] bg-[radial-gradient(circle,_rgba(139,92,246,0.15)_0%,_transparent_70%)]" />
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT */}
        <div>

          {/* LABEL */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs tracking-[0.25em] text-blue-400 uppercase mb-6"
          >
            Full-Stack Developer
          </motion.p>

          {/* TITLE (PERSONAL, BUKAN GENERIC) */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-semibold leading-[1.1]"
          >
            Hi, I&lsquo;m Vio
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              Full-Stack Developer
            </span>
          </motion.h1>

          {/* DESCRIPTION */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-gray-400 max-w-md leading-relaxed"
          >
            Saya fokus pada backend development, REST API, dan arsitektur sistem
            yang scalable dengan pendekatan clean code dan performa optimal.
          </motion.p>

          {/* BUTTON */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex gap-4"
          >
            {/* PRIMARY */}
            <a
              href="/projects"
              className="relative px-6 py-3 rounded-lg text-white overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500" />
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-r from-purple-500 to-blue-500 blur-sm" />
              <span className="relative z-10 font-medium tracking-wide">
                Lihat Project →
              </span>
            </a>

            {/* SECONDARY */}
            <a
              href="#contact"
              className="px-6 py-3 rounded-lg border border-white/10 text-gray-300 hover:bg-white/5 transition"
            >
              Kontak Saya
            </a>
          </motion.div>

        </div>

        {/* RIGHT (FIXED - NO MORE WEIRD CARD) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative flex justify-center"
        >
          
          {/* VISUAL (CLEAN & MEANINGFUL) */}
          <div className="relative flex justify-center">

  {/* FOTO */}
  <div className="relative w-[280px] h-[280px] rounded-full overflow-hidden border border-white/10">
    <img
      src="/profile.png"
      alt="Vio Arvendha"
      className="object-cover w-full h-full"
    />
  </div>

  {/* GLOW */}
  <div className="absolute w-[400px] h-[400px] bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-[120px] -z-10" />

</div>

          {/* GLOW */}
          <div className="absolute w-[450px] h-[450px] bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-[140px] -z-10" />

        </motion.div>

      </div>
    </section>
  );
}
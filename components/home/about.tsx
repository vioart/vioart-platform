"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="relative pt-16 pb-20 md:pt-24 md:pb-28 lg:py-32 overflow-hidden"
    >
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-[-200px] top-[100px] w-[600px] h-[600px] bg-blue-500/10 blur-[120px]" />
        <div className="absolute right-[-200px] bottom-[0px] w-[600px] h-[600px] bg-purple-500/10 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* ================= LEFT IMAGE ================= */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <div className="relative group w-full max-w-sm">
            {/* GLOW */}
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-60 transition" />

            <div className="relative rounded-2xl overflow-hidden border border-white/10">
              <Image
                src="/images/profile.png"
                alt="Vio Arvendha"
                width={420}
                height={420}
                className="object-cover w-full h-[320px] sm:h-[380px] md:h-full group-hover:scale-105 transition duration-500"
              />
            </div>
          </div>
        </motion.div>

        {/* CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left"
        >
          {/* LABEL */}
          <p className="text-xs tracking-[0.2em] text-blue-400 uppercase mb-3">
            Tentang Saya
          </p>

          {/* TITLE */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight mb-4 md:mb-6">
            Hi, saya{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              Vio Arvendha
            </span>
          </h2>

          {/* DESC */}
          <p className="text-gray-400 leading-relaxed mb-6 max-w-md md:max-w-lg mx-auto md:mx-0 text-sm md:text-base">
            Saya adalah Full-Stack Web Developer yang fokus pada backend
            development, REST API, dan arsitektur sistem scalable dengan
            pendekatan clean code dan performa optimal.
          </p>

          {/* SKILLS */}
          <div className="flex flex-wrap justify-center md:justify-start max-w-md md:max-w-none mx-auto md:mx-0 gap-2 md:gap-3 mb-6 md:mb-8">
            {[
              "Backend",
              "REST API",
              "Laravel",
              "Node.js",
              "PostgreSQL",
              "AI",
            ].map((item) => (
              <span
                key={item}
                className="px-3 py-1.5 text-xs md:text-sm rounded-full bg-white/5 border border-white/10 text-gray-300"
              >
                {item}
              </span>
            ))}
          </div>

          {/* BUTTON */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            {/* PRIMARY */}
            <a className="relative w-full sm:w-auto text-center px-6 py-3 rounded-xl text-white overflow-hidden group">
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500" />
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-purple-500 to-blue-500" />

              <span className="relative z-10">Download CV</span>
            </a>

            {/* SECONDARY */}
            <button className="w-full sm:w-auto px-6 py-3 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 transition">
              Kontak Saya
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

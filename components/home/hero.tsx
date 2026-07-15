"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

type Particle = {
  top: number;
  left: number;
  duration: number;
  delay: number;
  size: number;
  xMove: number;
  opacity: number;
  color: "blue" | "purple";
};

export default function Hero() {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 16 }).map((_, i) => {
      const seed = i * 137;

      return {
        top: (seed % 80) + 10,
        left: (seed % 90) + 5,
        duration: 5 + (seed % 5),
        delay: seed % 3,
        size: 10 + (seed % 4),
        xMove: (seed % 40) - 20,
        opacity: 0.2 + (seed % 40) / 100,
        color: seed % 2 === 0 ? "blue" : "purple",
      };
    });
  }, []);

  return (
    <section className="relative bg-[#f7f7f7] rounded-b-[100px] overflow-hidden">
      <motion.div
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-indigo-500/5"
      />

      {/* BIG FLOATING ORBS */}
      <motion.div
        animate={{ y: [0, -60, 0] }}
        transition={{ duration: 14, repeat: Infinity }}
        className="absolute left-30 top-10 w-[320px] h-80 bg-blue-400/20 blur-[160px] rounded-full"
      />

      <motion.div
        animate={{ y: [0, 70, 0] }}
        transition={{ duration: 16, repeat: Infinity }}
        className="absolute right-30 top-40 w-85 h-85 bg-purple-400/20 blur-[160px] rounded-full"
      />

      {/* PARTICLES */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.2, 0.6, 0.2],
            y: [0, -20, 0],
            x: [0, p.xMove, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute rounded-full ${
            p.color === "blue" ? "bg-blue-500" : "bg-purple-500"
          }`}
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
          }}
        />
      ))}

      {/* CURVE */}
      <div className="absolute bottom-0 left-0 w-full h-52 bg-white rounded-t-[70%] md:rounded-t-[100%]" />

      <div className="relative max-w-7xl mx-auto px-4 pt-28 pb-24 text-center">
        {/* GLOW */}
        <div className="absolute left-20 top-20 w-52 h-52 bg-blue-400/20 blur-[120px]" />
        <div className="absolute right-20 top-32 w-52 h-52 bg-purple-400/20 blur-[120px]" />

        {/* LEFT INFO */}
        <div className="hidden md:block absolute left-12 top-[55%] -translate-y-1/2 text-left text-black max-w-65 space-y-2">
          <p className="text-xs text-gray-400 tracking-[0.2em]">ABOUT ME</p>

          <h3 className="font-semibold text-xl leading-snug">
            Backend Developer
          </h3>

          <p className="text-gray-500 text-base leading-relaxed">
            Mengembangkan REST API dan sistem backend yang scalable, efisien, dan siap production.
          </p>
        </div>

        {/* RIGHT INFO */}
        <div className="hidden md:block absolute right-12 top-[55%] -translate-y-1/2 text-right text-black space-y-3">
          <div className="flex justify-end gap-1.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-blue-500 fill-blue-500" />
            ))}
          </div>

          <h2 className="text-2xl font-bold">3 Tahun</h2>

          <p className="text-gray-500 text-sm">Experience</p>
        </div>

        {/* TITLE */}
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight text-black mb-6">
          Membangun Sistem <br />
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
            Scalable & Reliable
          </span>
        </h1>

        {/* IMAGE */}
        <div className="relative flex justify-center mt-1">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute w-125 h-125 bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-[120px] rounded-full"
          />
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Image
              src="/images/character.webp"
              alt="hero"
              width={480}
              height={480}
              className="relative z-10 object-contain"
            />
          </motion.div>

          {/* CTA */}
          <div className="absolute -bottom-2 z-20 flex items-center rounded-full overflow-hidden shadow-xl text-xs md:text-sm border border-white/10 bg-[#020617]">
            <Link
              href="/project"
              className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium inline-block"
            >
              Lihat Project
            </Link>

            <button
              onClick={() =>
                window.open(
                  "https://wa.me/6285702220093?text=Halo Vio, saya tertarik dengan jasa anda :)",
                  "_blank",
                )
              }
              className="px-6 py-2.5 text-white/70 hover:text-white transition"
            >
              Kontak Saya
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

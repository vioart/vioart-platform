"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

type Experience = {
  title: string;
  company: string;
  duration: string;
  description: string;
  points: string[];
  tech: string[];
  type: string;
};

export default function TimelineItem({ exp }: { exp: Experience }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative pl-10 md:pl-12 group"
    >

      {/* DOT */}
      <div className="absolute left-0 top-2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center backdrop-blur-md">

        <Briefcase className="w-5 h-5 text-blue-400" />

        {/* GLOW */}
        <div className="absolute w-4 h-4 md:w-5 md:h-5 bg-blue-500/20 blur-xl rounded-full -z-10 opacity-0 group-hover:opacity-100 transition" />
      </div>

      {/* CARD */}
      <div className="relative p-5 md:p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition duration-300 hover:scale-[1.01] hover:border-blue-400/30">

        {/* BADGE */}
        <div className="flex items-start justify-between gap-3">

  <h3 className="font-semibold text-base md:text-lg text-white leading-snug">
    {exp.title}
  </h3>

  <span className="text-[10px] md:text-xs px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-400/20 whitespace-nowrap">
    {exp.type}
  </span>

</div>

        <p className="text-sm text-gray-400 mt-1">
          {exp.company}
        </p>

        <p className="text-xs text-gray-500 mt-1">
          {exp.duration}
        </p>

        <p className="mt-4 text-gray-300 text-sm md:text-base">
          {exp.description}
        </p>

        <ul className="mt-4 space-y-2">
          {exp.points.map((p, i) => (
            <li key={i} className="text-gray-400 text-sm flex gap-2">
              <span className="mt-1 w-1.5 h-1.5 bg-blue-400 rounded-full" />
              {p}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 mt-5">
          {exp.tech.map((t, i) => (
            <span
              key={i}
              className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300"
            >
              {t}
            </span>
          ))}
        </div>

      </div>
    </motion.div>
  );
}
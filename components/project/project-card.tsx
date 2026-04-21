"use client";

import Image from "next/image";
import Link from "next/link";

type Project = {
  title: string;
  description: string;
  tech: string[];
  slug: string;
  image?: string; // optional (fallback kalau belum ada)
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      
      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl transition duration-300 group-hover:scale-[1.02] group-hover:shadow-xl">

        {/* ================= IMAGE ================= */}
        <div className="relative h-48 md:h-56 overflow-hidden">
          <Image
            src={project.image || "/images/image.png"}
            alt={project.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-110"
          />

          {/* GRADIENT OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </div>

        {/* ================= CONTENT ================= */}
        <div className="p-5 md:p-6">

          {/* TITLE */}
          <h3 className="text-base md:text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition">
            {project.title}
          </h3>

          {/* DESCRIPTION */}
          <p className="text-xs md:text-sm text-gray-400 mb-4 line-clamp-2 leading-relaxed">
            {project.description}
          </p>

          {/* TECH STACK */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t, i) => (
              <span
                key={i}
                className="text-[10px] md:text-xs px-2.5 py-1 md:px-3 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition"
              >
                {t}
              </span>
            ))}
          </div>

        </div>

      </div>

    </Link>
  );
}
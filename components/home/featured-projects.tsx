"use client";

import { motion } from "framer-motion";
import ProjectCard from "@/components/project/project-card";
import Link from "next/link";

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "Platform e-commerce full-stack dengan fitur pembayaran dan manajemen inventori.",
    tech: ["Laravel", "Vue.js", "MySQL", "Redis"],
    slug: "ecommerce-platform",
    image: "/images/copy.png",
  },
  {
    title: "Task Management API",
    description: "RESTful API untuk manajemen tugas dengan fitur real-time.",
    tech: ["Node.js", "Express", "PostgreSQL", "Redis"],
    slug: "task-api",
    image: "/images/copy.png",
  },
  {
    title: "Health Monitoring App",
    description:
      "Aplikasi monitoring kesehatan dengan integrasi wearable device.",
    tech: ["React Native", "Python", "FastAPI"],
    slug: "health-app",
    image: "/images/copy.png",
  },
  {
    title: "Virtual Lab Simulation",
    description: "Simulasi laboratorium VR untuk pembelajaran interaktif.",
    tech: ["Unity", "C#", "Oculus SDK"],
    slug: "vr-lab",
    image: "/images/copy.png",
  },
];

export default function FeaturedProjects() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-[-200px] top-[0px] w-[600px] h-[600px] bg-blue-500/10 blur-[120px]" />
        <div className="absolute right-[-200px] bottom-[0px] w-[600px] h-[600px] bg-purple-500/10 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* HEADER */}
        <div className="max-w-2xl mb-10 md:mb-16">
          <p className="text-xs tracking-[0.2em] text-blue-400 uppercase mb-3">
            Portfolio
          </p>

          <h2 className="text-4xl md:text-5xl font-semibold leading-tight">
            Project{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              Unggulan
            </span>
          </h2>

          <p className="text-gray-400 mt-4">
            Beberapa project terbaik yang saya kerjakan dengan fokus pada
            performa, scalability, dan pengalaman pengguna.
          </p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-5 md:gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 md:mt-16 flex justify-center">
          <Link
            href="/project"
            className="relative px-8 py-4 rounded-xl text-white overflow-hidden group inline-block"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500" />

            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-purple-500 to-blue-500" />

            <span className="relative z-10 flex items-center gap-2">
              Lihat Semua Project →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

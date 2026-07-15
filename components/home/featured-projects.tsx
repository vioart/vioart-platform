"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ProjectCard from "@/components/project/project-card";

type Project = {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  project_url: string | null;
  is_featured: boolean;

  images: {
    id: number;
    image_url: string;
    is_primary: boolean;
  }[];

  techs: {
    tech: {
      id: number;
      name: string;
    };
  }[];

  categories: {
    category: {
      id: number;
      name: string;
      slug: string;
    };
  }[];
};

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/project");

        if (!res.ok) {
          throw new Error("Failed to fetch projects");
        }

        const data: Project[] = await res.json();

        const featured = data
          .filter((project) => project.is_featured)
          .slice(0, 4);

        setProjects(featured);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="relative overflow-hidden py-16 md:py-24 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-[-200px] top-0 h-[600px] w-[600px] bg-blue-500/10 blur-[120px]" />

        <div className="absolute bottom-0 right-[-200px] h-[600px] w-[600px] bg-purple-500/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* HEADER */}

        <div className="mb-10 max-w-2xl md:mb-16">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-blue-400">
            Portfolio
          </p>

          <h2 className="text-4xl font-semibold leading-tight md:text-5xl">
            Project{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Unggulan
            </span>
          </h2>

          <p className="mt-4 text-gray-400">
            Beberapa project terbaik yang saya kerjakan dengan fokus pada
            performa, scalability, dan pengalaman pengguna.
          </p>
        </div>

        {/* Loading */}

        {loading && (
          <div className="py-20 text-center text-gray-400">
            Memuat project...
          </div>
        )}

        {/* Empty */}

        {!loading && projects.length === 0 && (
          <div className="py-20 text-center text-gray-500">
            Belum ada project unggulan.
          </div>
        )}

        {/* GRID */}

        {!loading && projects.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2 md:gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA */}

        <div className="mt-10 flex justify-center md:mt-16">
          <Link
            href="/project"
            className="group relative inline-block overflow-hidden rounded-xl px-8 py-4 text-white"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500" />

            <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 transition group-hover:opacity-100" />

            <span className="relative z-10 flex items-center gap-2">
              Lihat Semua Project →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
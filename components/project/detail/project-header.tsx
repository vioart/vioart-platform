"use client";

import Link from "next/link";
import { ArrowLeft, Code2 } from "lucide-react";

type Category = {
  id: number;
  name: string;
  slug: string;
};

type ProjectHeaderProps = {
  title: string;

  description?: string;

  projectUrl?: string;

  techs?: {
    tech: {
      id: number;
      name: string;
    };
  }[];

  categories?: {
    category: Category;
  }[];
};

const categoryColor: Record<string, string> = {
  website:
    "bg-emerald-500/15 text-emerald-300 border-emerald-400/20",

  "mobile-app":
    "bg-violet-500/15 text-violet-300 border-violet-400/20",

  "ar-vr":
    "bg-pink-500/15 text-pink-300 border-pink-400/20",

  "ai-machine-learning":
    "bg-cyan-500/15 text-cyan-300 border-cyan-400/20",

  iot:
    "bg-orange-500/15 text-orange-300 border-orange-400/20",
};

export default function ProjectHeader({
  title,
  description,
  projectUrl,
  techs = [],
  categories = [],
}: ProjectHeaderProps) {
  return (
    <section className="relative overflow-hidden px-4 pt-32 pb-14 sm:px-6">
      {/* ================= BACKGROUND GLOW ================= */}

      <div className="absolute inset-0 -z-10">
        <div className="absolute left-[-200px] top-20 h-[550px] w-[550px] bg-blue-500/10 blur-[120px]" />

        <div className="absolute right-[-200px] bottom-0 h-[550px] w-[550px] bg-purple-500/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl">
        {/* ================= BACK ================= */}

        <Link
          href="/project"
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
        >
          <ArrowLeft size={17} />

          Kembali ke Project
        </Link>

        {/* ================= CATEGORY ================= */}

        {categories.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {categories.map(({ category }) => (
              <span
                key={category.id}
                className={`
                  rounded-full
                  border
                  px-3
                  py-1.5
                  text-xs
                  font-medium
                  ${
                    categoryColor[category.slug] ??
                    "border-white/10 bg-white/5 text-gray-300"
                  }
                `}
              >
                {category.name}
              </span>
            ))}
          </div>
        )}

        {/* ================= TITLE ================= */}

        <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
          {title}
        </h1>

        {/* ================= DESCRIPTION ================= */}

        {description && (
          <p className="mt-5 max-w-3xl leading-relaxed text-gray-400">
            {description}
          </p>
        )}

        {/* ================= TECH STACK ================= */}

        {techs.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {techs.map(({ tech }) => (
              <span
                key={tech.id}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-gray-300"
              >
                {tech.name}
              </span>
            ))}
          </div>
        )}

        {/* ================= BUTTON ================= */}

        {projectUrl && (
          <div className="mt-8">
            <a
              href={projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 transition hover:bg-white/10"
            >
              <Code2 size={18} />

              Source Code / Demo
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
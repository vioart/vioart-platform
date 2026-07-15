"use client";

import Image from "next/image";
import Link from "next/link";

type Project = {
  id: number;
  title: string;
  slug: string;
  description: string | null;

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
};

export default function ProjectCard({
  project,
}: {
  project: Project;
}) {
  const primaryImage =
    project.images.find((img) => img.is_primary) ??
    project.images[0];

  return (
    <Link
      href={`/project/${project.slug}`}
      className="group block"
    >
      <div
        className="
          relative
          overflow-hidden
          rounded-2xl
          border
          border-white/10
          bg-white/5
          backdrop-blur-xl
          transition
          duration-300
          group-hover:scale-[1.02]
          group-hover:shadow-xl
        "
      >
        {/* ================= IMAGE ================= */}

        <div className="relative h-48 overflow-hidden md:h-56">
          <Image
            src={
              primaryImage?.image_url ??
              "/images/image.png"
            }
            alt={project.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </div>

        {/* ================= CONTENT ================= */}

        <div className="p-5 md:p-6">
          {/* TITLE */}

          <h3 className="mb-2 text-base font-semibold text-white transition group-hover:text-blue-400 md:text-lg">
            {project.title}
          </h3>

          {/* DESCRIPTION */}

          <p className="mb-4 line-clamp-2 text-xs leading-relaxed text-gray-400 md:text-sm">
            {project.description ??
              "Belum ada deskripsi untuk project ini."}
          </p>

          {/* TECH STACK */}

          <div className="flex flex-wrap gap-2">
            {project.techs.map(({ tech }) => (
              <span
                key={tech.id}
                className="
                  rounded-full
                  border
                  border-white/10
                  bg-white/5
                  px-2.5
                  py-1
                  text-[10px]
                  text-gray-300
                  transition
                  hover:bg-white/10
                  md:px-3
                  md:text-xs
                "
              >
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
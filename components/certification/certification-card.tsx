"use client";

import Link from "next/link";
import { Award, ArrowUpRight } from "lucide-react";

type Certification = {
  title: string;
  issuer: string;
  year: string;
  description: string;

  categories: {
    name: string;
    slug: string;
  }[];

  slug: string;
  highlight?: boolean;
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

export default function CertificationCard({
  cert,
}: {
  cert: Certification;
}) {
  return (
    <Link
      href={`/certifications/${cert.slug}`}
      className="group block h-full"
    >
      <div
        className={`
          relative
          h-full
          overflow-hidden
          rounded-3xl
          border
          backdrop-blur-xl
          transition-all
          duration-300
          hover:-translate-y-2
          hover:border-[#54ACBF]/40
          hover:shadow-[0_15px_50px_rgba(84,172,191,0.15)]

          ${
            cert.highlight
              ? "border-[#54ACBF]/40 bg-gradient-to-br from-[#54ACBF]/10 via-[#26658C]/10 to-purple-500/10"
              : "border-white/10 bg-white/5"
          }
        `}
      >
        {/* Hover Glow */}
        <div
          className="
            absolute
            inset-0
            opacity-0
            group-hover:opacity-100
            transition
            duration-500
            bg-gradient-to-br
            from-[#54ACBF]/5
            via-transparent
            to-purple-500/5
          "
        />

        <div className="relative flex h-full flex-col p-7">
          {/* HEADER */}
          <div className="flex items-start justify-between">
            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                border
                border-[#54ACBF]/10
                bg-gradient-to-br
                from-[#54ACBF]/20
                to-[#26658C]/20
                transition
                duration-300
                group-hover:scale-110
              "
            >
              <Award className="h-6 w-6 text-[#54ACBF]" />
            </div>
          </div>

          {/* CONTENT */}
          <div className="mt-6">
            <h3
              className="
                text-xl
                font-semibold
                leading-snug
                text-white
                transition
                group-hover:text-[#7FD9EB]
              "
            >
              {cert.title}
            </h3>

            <p className="mt-3 text-sm text-gray-400">
              {cert.issuer}{" "}
              <span className="text-gray-500">• {cert.year}</span>
            </p>

            <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-gray-400">
              {cert.description}
            </p>
          </div>

          <div className="flex-1" />

          {/* FOOTER */}
          <div className="mt-8 flex items-center justify-between">
<div className="flex flex-wrap gap-2">
  {cert.categories.map((category) => (
    <span
      key={category.slug}
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
            <div
              className="
                flex
                translate-x-2
                items-center
                gap-2
                text-sm
                text-[#54ACBF]
                opacity-0
                transition-all
                duration-300
                group-hover:translate-x-0
                group-hover:opacity-100
              "
            >
              <span>View</span>

              <ArrowUpRight
                size={16}
                strokeWidth={2.2}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
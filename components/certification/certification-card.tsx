"use client";

import Link from "next/link";
import { Award } from "lucide-react";

type Certification = {
  title: string;
  issuer: string;
  year: string;
  category: string;
  slug: string;
  highlight?: boolean;
};

export default function CertificationCard({ cert }: { cert: Certification }) {
  return (
    <Link href={`/certifications/${cert.slug}`} className="group block">

      <div
        className={`relative p-5 md:p-6 rounded-2xl border backdrop-blur-xl transition duration-300 hover:scale-[1.02] cursor-pointer
        ${
          cert.highlight
            ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-400/30"
            : "bg-white/5 border-white/10"
        }`}
      >

        {/* HOVER GLOW */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl -z-10" />

        <div className="flex items-start gap-4">

          {/* ICON */}
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20">
            <Award className="w-5 h-5 text-blue-400" />
          </div>

          {/* CONTENT */}
          <div>

            <h3 className="font-semibold text-lg text-white group-hover:text-blue-400 transition">
              {cert.title}
            </h3>

            <p className="text-sm text-gray-400 mt-1">
              {cert.issuer} · {cert.year}
            </p>

            <span className="inline-block mt-3 text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
              {cert.category}
            </span>

          </div>
        </div>

      </div>

    </Link>
  );
}
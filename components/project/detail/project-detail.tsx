"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Code2,
  ZoomIn,
} from "lucide-react";

type Project = {
  id: number;
  title: string;
  slug: string;
  description: string;
  project_url?: string;

  details?: {
    problem?: string;
    solution?: string;
  };

  features?: {
    content: string;
  }[];

  techs?: {
    tech: {
      id: number;
      name: string;
    };
  }[];

  images?: {
    image_url: string;
    is_primary: boolean;
  }[];
};

type Props = {
  project: Project;
};

export default function ProjectDetail({ project }: Props) {
  const images = project.images ?? [];

  const [current, setCurrent] = useState(0);
  const [preview, setPreview] = useState<string | null>(null);

  const currentImage =
    images[current] ??
    ({
      image_url: "/images/image.png",
      is_primary: true,
    } as const);

  const nextImage = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative pt-32 pb-14 px-4 sm:px-6 overflow-hidden">
        {/* Glow */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-[-200px] top-20 w-[550px] h-[550px] bg-blue-500/10 blur-[120px]" />
          <div className="absolute right-[-200px] bottom-0 w-[550px] h-[550px] bg-purple-500/10 blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto">
          {/* BACK */}
          <Link
            href="/project"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition mb-8"
          >
            <ArrowLeft size={17} />
            Kembali ke Project
          </Link>

          {/* TITLE */}
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
            {project.title}
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-5 max-w-3xl text-gray-400 leading-relaxed">
            {project.description}
          </p>

          {/* TECH */}
          <div className="flex flex-wrap gap-2 mt-8">
            {(project.techs ?? []).map((tech) => (
              <span
                key={tech.tech.id}
                className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-gray-300"
              >
                {tech.tech.name}
              </span>
            ))}
          </div>

          {/* BUTTON */}
          {project.project_url && (
            <div className="mt-8">
              <a
                href={project.project_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 hover:bg-white/10 transition"
              >
                <Code2 size={18} />
                Source Code / Demo
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ================= GALLERY ================= */}
      <section className="pb-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-lg">
            {/* IMAGE */}
            <div className="relative aspect-video">
              <Image
                src={currentImage.image_url}
                alt={project.title}
                fill
                className="object-cover"
              />

              {/* ZOOM */}
              <button
                onClick={() => setPreview(currentImage.image_url)}
                className="absolute right-4 top-4 p-2 rounded-xl bg-black/40 backdrop-blur-md hover:bg-black/60 transition"
              >
                <ZoomIn size={18} />
              </button>

              {/* PREV */}
              {images.length > 1 && (
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 backdrop-blur-md p-2 hover:bg-black/60 transition"
                >
                  <ChevronLeft />
                </button>
              )}

              {/* NEXT */}
              {images.length > 1 && (
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 backdrop-blur-md p-2 hover:bg-black/60 transition"
                >
                  <ChevronRight />
                </button>
              )}

              {/* DOT */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`transition-all rounded-full ${
                        current === i
                          ? "w-7 h-2 bg-blue-500"
                          : "w-2 h-2 bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* THUMBNAIL */}
          {images.length > 1 && (
            <div className="flex gap-3 mt-4 overflow-x-auto scrollbar-hide">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`relative h-20 w-32 flex-shrink-0 rounded-xl overflow-hidden border-2 transition ${
                    current === i
                      ? "border-blue-500"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img.image_url}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="pb-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-14">
          {/* PROBLEM & SOLUTION */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
              <h3 className="text-sm uppercase tracking-widest text-blue-400 font-semibold mb-4">
                Problem
              </h3>

              <p className="text-gray-400 leading-relaxed">
                {project.details?.problem || "-"}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
              <h3 className="text-sm uppercase tracking-widest text-blue-400 font-semibold mb-4">
                Solution
              </h3>

              <p className="text-gray-400 leading-relaxed">
                {project.details?.solution || "-"}
              </p>
            </div>
          </div>

          {/* FEATURES */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Fitur Utama</h3>

            {(project.features ?? []).length === 0 ? (
              <p className="text-gray-500">Tidak ada fitur.</p>
            ) : (
              <ul className="space-y-4">
                {project.features?.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-gray-400"
                  >
                    <span className="mt-2 h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shrink-0" />

                    <span className="leading-relaxed">{feature.content}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* TECHNOLOGY */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">
              Teknologi yang Digunakan
            </h3>

            <div className="flex flex-wrap gap-3">
              {project.techs?.map((tech) => (
                <span
                  key={tech.tech.id}
                  className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 backdrop-blur text-sm hover:border-blue-500 transition"
                >
                  {tech.tech.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= IMAGE PREVIEW ================= */}
      {preview && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setPreview(null)}
        >
          <div
            className="relative max-w-7xl w-full px-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE */}
            <button
              onClick={() => setPreview(null)}
              className="absolute right-6 -top-12 text-white hover:text-blue-400 transition"
            >
              ✕
            </button>

            {/* IMAGE */}
            <div className="relative w-full h-[85vh]">
              <Image
                src={preview}
                alt="Preview"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

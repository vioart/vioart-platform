"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Award,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ZoomIn,
} from "lucide-react";

type Certification = {
  id: number;
  title: string;
  slug: string;

  issuer: string | null;
  year: number | null;
  description: string | null;
  source_url: string | null;

  categories: {
    category: {
      id: number;
      name: string;
      slug: string;
    };
  }[];

  skills: {
    id: number;
    skill: string;
  }[];

  images: {
    id: number;
    image_url: string;
  }[];
};

type Props = {
  certification: Certification;
};

const categoryColor: Record<string, string> = {
  website: "bg-emerald-500/15 text-emerald-300 border-emerald-400/20",

  "mobile-app": "bg-violet-500/15 text-violet-300 border-violet-400/20",

  "ar-vr": "bg-pink-500/15 text-pink-300 border-pink-400/20",

  "ai-machine-learning": "bg-cyan-500/15 text-cyan-300 border-cyan-400/20",

  iot: "bg-orange-500/15 text-orange-300 border-orange-400/20",
};

export default function CertificationDetail({ certification }: Props) {
  const images = certification.images ?? [];

  const [currentIndex, setCurrentIndex] = useState(0);

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const currentImage = images[currentIndex] ?? {
    image_url: "/images/image.png",
  };

  const nextImage = () => {
    if (images.length <= 1) return;

    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    if (images.length <= 1) return;

    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <>
      {/* ================= HERO ================= */}

      <section className="relative pt-32 pb-16 px-4 sm:px-6 overflow-hidden">
        {/* Glow */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-[-220px] top-10 w-[500px] h-[500px] bg-[#54ACBF]/10 blur-[120px]" />
          <div className="absolute right-[-220px] bottom-0 w-[500px] h-[500px] bg-purple-500/10 blur-[120px]" />
        </div>

        <div className="max-w-5xl mx-auto">
          {/* BACK */}
          <Link
            href="/certifications"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition mb-10"
          >
            <ArrowLeft size={17} />
            Kembali ke Sertifikasi
          </Link>

          {/* ICON */}
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#54ACBF]/20 to-[#26658C]/20 border border-[#54ACBF]/10 mb-8">
            <Award className="w-8 h-8 text-[#54ACBF]" />
          </div>

          {/* CATEGORY */}
          {certification.categories.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {certification.categories.map(({ category }) => (
                <span
                  key={category.id}
                  className={`
          inline-flex
          rounded-full
          border
          px-3
          py-1
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

          {/* TITLE */}
          <h1 className="mt-6 text-4xl md:text-5xl font-semibold leading-tight">
            {certification.title}
          </h1>

          {/* ISSUER */}
          <p className="mt-4 text-gray-400">
            {certification.issuer}

            {certification.year && ` • ${certification.year}`}
          </p>

          {/* VERIFY */}
          {certification.source_url && (
            <div className="mt-8">
              <a
                href={certification.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-[#54ACBF]/20 bg-[#54ACBF]/10 px-5 py-3 hover:bg-[#54ACBF]/20 transition"
              >
                <ExternalLink size={18} />
                Lihat Sertifikat
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ================= GALLERY ================= */}

      <section className="pb-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl">
            <div className="relative aspect-video">
              <Image
                src={currentImage.image_url}
                alt={certification.title}
                fill
                className="object-cover"
              />

              {/* Zoom */}
              <button
                onClick={() => setPreviewImage(currentImage.image_url)}
                className="absolute right-4 top-4 p-2 rounded-xl bg-black/40 backdrop-blur-md hover:bg-black/60 transition"
              >
                <ZoomIn size={18} />
              </button>

              {/* Prev */}
              {images.length > 1 && (
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 backdrop-blur-md p-2 hover:bg-black/60 transition"
                >
                  <ChevronLeft />
                </button>
              )}

              {/* Next */}
              {images.length > 1 && (
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 backdrop-blur-md p-2 hover:bg-black/60 transition"
                >
                  <ChevronRight />
                </button>
              )}

              {/* Dots */}
              {images.length > 1 && (
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((img, index) => (
                    <button
                      key={img.id}
                      onClick={() => setCurrentIndex(index)}
                      className={`transition-all rounded-full ${
                        currentIndex === index
                          ? "w-7 h-2 bg-[#54ACBF]"
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
            <div className="mt-5 flex gap-3 overflow-x-auto scrollbar-hide pb-1">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`relative h-20 w-32 shrink-0 overflow-hidden rounded-xl border-2 transition ${
                    currentIndex === index
                      ? "border-[#54ACBF]"
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

          {/* ================= FULLSCREEN PREVIEW ================= */}

          {previewImage && (
            <div
              className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center"
              onClick={() => setPreviewImage(null)}
            >
              <div
                className="relative w-full max-w-7xl px-6"
                onClick={(e) => e.stopPropagation()}
              >
                {/* CLOSE */}
                <button
                  onClick={() => setPreviewImage(null)}
                  className="absolute -top-12 right-6 text-white text-2xl hover:text-[#54ACBF] transition"
                >
                  ✕
                </button>

                {/* IMAGE */}
                <div className="relative w-full h-[80vh] rounded-2xl overflow-hidden">
                  <Image
                    src={previewImage}
                    alt="Certificate Preview"
                    fill
                    className="object-contain"
                  />
                </div>

                {/* PREV */}
                {images.length > 1 && (
                  <button
                    onClick={() => {
                      const next =
                        currentIndex === 0
                          ? images.length - 1
                          : currentIndex - 1;

                      setCurrentIndex(next);
                      setPreviewImage(images[next].image_url);
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/60 backdrop-blur-md p-3 hover:bg-black/80 transition"
                  >
                    <ChevronLeft />
                  </button>
                )}

                {/* NEXT */}
                {images.length > 1 && (
                  <button
                    onClick={() => {
                      const next =
                        currentIndex === images.length - 1
                          ? 0
                          : currentIndex + 1;

                      setCurrentIndex(next);
                      setPreviewImage(images[next].image_url);
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/60 backdrop-blur-md p-3 hover:bg-black/80 transition"
                  >
                    <ChevronRight />
                  </button>
                )}

                {/* Thumbnail */}
                {images.length > 1 && (
                  <div className="mt-6 flex justify-center gap-3 overflow-x-auto scrollbar-hide">
                    {images.map((img, index) => (
                      <button
                        key={img.image_url}
                        onClick={() => {
                          setCurrentIndex(index);
                          setPreviewImage(img.image_url);
                        }}
                        className={`relative h-20 w-32 shrink-0 overflow-hidden rounded-xl border-2 transition ${
                          currentIndex === index
                            ? "border-[#54ACBF]"
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
            </div>
          )}
        </div>
      </section>

      {/* ================= CONTENT ================= */}

      <section className="pb-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-10">
            {/* ABOUT */}
            <div>
              <h2 className="text-2xl font-semibold">Tentang Sertifikasi</h2>

              <p className="mt-5 text-gray-400 leading-8">
                {certification.description ??
                  "Tidak ada deskripsi untuk sertifikasi ini."}
              </p>
            </div>

            {/* SKILLS */}
            {certification.skills.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-semibold">Skill yang Didapat</h2>

                <div className="mt-6 flex flex-wrap gap-3">
                  {certification.skills.map((skill) => (
                    <span
                      key={skill.skill}
                      className="
                        px-4
                        py-2
                        rounded-xl
                        border
                        border-white/10
                        bg-white/5
                        text-sm
                        text-gray-300
                        hover:border-[#54ACBF]/40
                        hover:text-white
                        transition
                      "
                    >
                      {skill.skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

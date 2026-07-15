"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
} from "lucide-react";

type ProjectGalleryProps = {
  images: {
    id: number;
    image_url: string;
    is_primary: boolean;
  }[];
};

export default function ProjectGallery({
  images,
}: ProjectGalleryProps) {
  /*
  ==============================
      SORT PRIMARY IMAGE
  ==============================
  */

  const sortedImages = [...images].sort((a, b) =>
    a.is_primary === b.is_primary
      ? 0
      : a.is_primary
        ? -1
        : 1,
  );

  /*
  ==============================
      STATE
  ==============================
  */

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [previewImage, setPreviewImage] =
    useState<string | null>(null);

  /*
  ==============================
      CURRENT IMAGE
  ==============================
  */

  const currentImage =
    sortedImages[currentIndex] ?? {
      id: 0,
      image_url: "/images/image.png",
      is_primary: true,
    };

  /*
  ==============================
      NAVIGATION
  ==============================
  */

  const nextImage = () => {
    if (sortedImages.length <= 1) return;

    setCurrentIndex((prev) =>
      prev === sortedImages.length - 1
        ? 0
        : prev + 1,
    );
  };

  const prevImage = () => {
    if (sortedImages.length <= 1) return;

    setCurrentIndex((prev) =>
      prev === 0
        ? sortedImages.length - 1
        : prev - 1,
    );
  };

  return (
    <section className="pb-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">

        {/* ================= MAIN IMAGE ================= */}

        <div className="mt-8 relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">

          <div className="relative aspect-video">

            <Image
              src={currentImage.image_url}
              alt="Project Preview"
              fill
              priority
              className="object-cover"
            />

            {/* ================= ZOOM ================= */}

            <button
              onClick={() =>
                setPreviewImage(
                  currentImage.image_url,
                )
              }
              className="
                absolute
                right-4
                top-4
                rounded-xl
                bg-black/50
                p-2
                backdrop-blur-md
                transition
                hover:bg-black/70
              "
            >
              <ZoomIn size={18} />
            </button>

            {/* ================= PREVIOUS ================= */}

            {sortedImages.length > 1 && (
              <button
                onClick={prevImage}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  rounded-full
                  bg-black/50
                  p-2
                  backdrop-blur-md
                  transition
                  hover:bg-black/70
                "
              >
                <ChevronLeft />
              </button>
            )}

            {/* ================= NEXT ================= */}

            {sortedImages.length > 1 && (
              <button
                onClick={nextImage}
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  rounded-full
                  bg-black/50
                  p-2
                  backdrop-blur-md
                  transition
                  hover:bg-black/70
                "
              >
                <ChevronRight />
              </button>
            )}

            {/* ================= DOTS ================= */}

            {sortedImages.length > 1 && (
              <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">

                {sortedImages.map((img, index) => (
                  <button
                    key={img.id}
                    onClick={() =>
                      setCurrentIndex(index)
                    }
                    className={`transition-all rounded-full ${
                      currentIndex === index
                        ? "h-2 w-7 bg-[#54ACBF]"
                        : "h-2 w-2 bg-white/40 hover:bg-white/60"
                    }`}
                  />
                ))}

              </div>
            )}
          </div>
        </div>

        {/* ================= THUMBNAILS ================= */}

        {sortedImages.length > 1 && (
          <div className="mt-5 flex gap-3 overflow-x-auto pb-1 scrollbar-hide">

            {sortedImages.map((img, index) => (
              <button
                key={img.id}
                onClick={() =>
                  setCurrentIndex(index)
                }
                className={`
                  relative
                  h-20
                  w-32
                  shrink-0
                  overflow-hidden
                  rounded-xl
                  border-2
                  transition-all
                  ${
                    currentIndex === index
                      ? "border-[#54ACBF]"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }
                `}
              >
                <Image
                  src={img.image_url}
                  alt={`Thumbnail ${index + 1}`}
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
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md"
            onClick={() => setPreviewImage(null)}
          >
            <div
              className="relative w-full max-w-7xl px-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* ================= CLOSE ================= */}

              <button
                onClick={() => setPreviewImage(null)}
                className="
                  absolute
                  -top-12
                  right-6
                  text-2xl
                  text-white
                  transition
                  hover:text-[#54ACBF]
                "
              >
                ✕
              </button>

              {/* ================= IMAGE ================= */}

              <div className="relative h-[80vh] w-full overflow-hidden rounded-2xl">
                <Image
                  src={previewImage}
                  alt="Preview"
                  fill
                  className="object-contain"
                />
              </div>

              {/* ================= PREVIOUS ================= */}

              {sortedImages.length > 1 && (
                <button
                  onClick={() => {
                    const next =
                      currentIndex === 0
                        ? sortedImages.length - 1
                        : currentIndex - 1;

                    setCurrentIndex(next);
                    setPreviewImage(
                      sortedImages[next].image_url,
                    );
                  }}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    rounded-full
                    bg-black/60
                    p-3
                    backdrop-blur-md
                    transition
                    hover:bg-black/80
                  "
                >
                  <ChevronLeft />
                </button>
              )}

              {/* ================= NEXT ================= */}

              {sortedImages.length > 1 && (
                <button
                  onClick={() => {
                    const next =
                      currentIndex ===
                      sortedImages.length - 1
                        ? 0
                        : currentIndex + 1;

                    setCurrentIndex(next);
                    setPreviewImage(
                      sortedImages[next].image_url,
                    );
                  }}
                  className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    rounded-full
                    bg-black/60
                    p-3
                    backdrop-blur-md
                    transition
                    hover:bg-black/80
                  "
                >
                  <ChevronRight />
                </button>
              )}

              {/* ================= THUMBNAILS ================= */}

              {sortedImages.length > 1 && (
                <div className="mt-6 flex justify-center gap-3 overflow-x-auto scrollbar-hide">
                  {sortedImages.map((img, index) => (
                    <button
                      key={img.id}
                      onClick={() => {
                        setCurrentIndex(index);
                        setPreviewImage(
                          img.image_url,
                        );
                      }}
                      className={`
                        relative
                        h-20
                        w-32
                        shrink-0
                        overflow-hidden
                        rounded-xl
                        border-2
                        transition
                        ${
                          currentIndex === index
                            ? "border-[#54ACBF]"
                            : "border-transparent opacity-60 hover:opacity-100"
                        }
                      `}
                    >
                      <Image
                        src={img.image_url}
                        alt={`Preview ${index + 1}`}
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
  );
}
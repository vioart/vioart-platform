"use client";

import { useState } from "react";
import { X } from "lucide-react";

type ProjectDetail = {
  id: number;
  title: string;
  slug: string;
  project_url: string;
  description: string;
  is_featured: boolean;

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

  categories?: {
    category: {
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
  open: boolean;
  onClose: () => void;
  data: ProjectDetail | null;
};

export default function ProjectDetailModal({ open, onClose, data }: Props) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  if (!open || !data) return null;

  const primaryImage = (data.images ?? []).find((img) => img.is_primary);
  const otherImages = (data.images ?? []).filter((img) => !img.is_primary);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={(e) => {
        if (selectedImage) return;
        onClose();
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-4xl rounded-2xl shadow-xl p-6 overflow-y-auto max-h-[90vh]"
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-[#023859]">
            Detail Project
          </h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="h-px bg-gray-200 mb-6" />

        <div className="space-y-8 text-sm text-gray-800">
          {/* 🔥 HEADER */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#023859] leading-tight">
              {data.title}
            </h3>

            <div className="flex items-center flex-wrap gap-2 mt-2">
              {/* SLUG */}
              <span className="text-xs font-medium text-gray-800 bg-gray-200/70 px-2.5 py-1 rounded-md">
                Slug: {data.slug}
              </span>

              {/* FEATURED */}
              {data.is_featured && (
                <span className="text-xs font-medium bg-[#54ACBF]/10 text-[#26658C] px-2.5 py-1 rounded-md border border-[#54ACBF]/30">
                  Unggulan
                </span>
              )}
            </div>
          </div>
          {primaryImage && (
            <div className="mb-4">
              <img
                src={primaryImage.image_url}
                onClick={() => setSelectedImage(primaryImage.image_url)}
                className="w-full h-56 md:h-76 object-cover rounded-xl cursor-pointer hover:opacity-95 transition"
              />
            </div>
          )}

          {otherImages.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs text-gray-700">Gambar Lainnya</p>

              <div
                className="
      flex gap-3 overflow-x-auto pb-2
      scrollbar-hide
      snap-x snap-mandatory
    "
              >
                {otherImages.map((img, i) => (
                  <div
                    key={i}
                    className="
          min-w-[140px] md:min-w-[180px]
          snap-start
          flex-shrink-0
        "
                  >
                    <img
                      src={img.image_url}
                      onClick={() => setSelectedImage(img.image_url)}
                      className="
            w-full h-28 md:h-32
            object-cover rounded-xl
            cursor-pointer
            hover:scale-[1.03]
            transition
          "
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 🔥 INFO GRID */}
          <div>
            <p className="text-sm text-gray-700 font-medium mb-2">
              Project URL
            </p>

            <div className="bg-white rounded-xl p-4 shadow-sm text-sm text-gray-900 break-all">
              {data.project_url || "-"}
            </div>
          </div>

          {/* 🔥 DESCRIPTION */}
          <div>
            <p className="text-sm text-gray-700 font-medium mb-2">Deskripsi</p>

            <div className="bg-white rounded-xl p-4 shadow-sm text-sm text-gray-900 leading-relaxed">
              {data.description || "-"}
            </div>
          </div>

          {/* 🔥 PROBLEM & SOLUTION */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-700 font-medium mb-2">Masalah</p>
              <div className="bg-white rounded-xl p-4 shadow-sm text-sm text-gray-900 leading-relaxed">
                {data.details?.problem || "-"}
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-700 font-medium mb-2">Solusi</p>
              <div className="bg-white rounded-xl p-4 shadow-sm text-sm text-gray-900 leading-relaxed">
                {data.details?.solution || "-"}
              </div>
            </div>
          </div>

          {/* 🔥 FEATURES */}

          <div>
            <p className="text-sm text-gray-700 font-medium mb-2">Fitur</p>

            <div className="bg-white rounded-xl p-4 shadow-sm">
              {(data.features ?? []).length === 0 ? (
                <p className="text-sm text-gray-700">Tidak ada fitur</p>
              ) : (
                <ul className="space-y-2 text-sm text-gray-900">
                  {(data.features ?? []).map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 w-1.5 h-1.5 bg-[#26658C] rounded-full" />
                      <span>{f.content}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* 🔥 TECH */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* TEKNOLOGI */}
            <div>
              <p className="text-sm text-gray-700 font-medium mb-2">
                Teknologi
              </p>

              <div className="flex flex-wrap gap-2">
                {(data.techs ?? []).map((t) => (
                  <span
                    key={t.tech.id}
                    className="text-xs bg-[#A7EBF2] text-[#023859] px-2 py-1 rounded-md"
                  >
                    {t.tech.name}
                  </span>
                ))}
              </div>
            </div>

            {/* KATEGORI */}
            <div>
              <p className="text-sm text-gray-700 font-medium mb-2">Kategori</p>

              <div className="flex flex-wrap gap-2">
                {(data.categories ?? []).map((c) => (
                  <span
                    key={c.category.id}
                    className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-md"
                  >
                    {c.category.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-5xl w-full px-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white hover:opacity-80"
            >
              <X size={24} />
            </button>

            {/* IMAGE */}
            <img
              src={selectedImage}
              className="w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}

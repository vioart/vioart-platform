"use client";

import { useState } from "react";
import { X } from "lucide-react";
import {Certification } from "@/types/certification"

type Props = {
  open: boolean;
  onClose: () => void;
  data: Certification | null;
};

export default function CertificationDetailModal({
  open,
  onClose,
  data,
}: Props) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!open || !data) return null;

  const mainImage = data.images?.[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={() => {
        if (selectedImage) return;
        onClose();
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-3xl rounded-2xl shadow-xl p-6 overflow-y-auto max-h-[90vh]"
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-[#023859]">
            Detail Sertifikasi
          </h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="h-px bg-gray-200 mb-6" />

        <div className="space-y-6 text-sm text-gray-800">
          {/* 🔥 TITLE */}
          <div>
            <h3 className="text-xl font-semibold text-[#023859]">
              {data.title}
            </h3>

            <div className="flex flex-wrap gap-2 mt-2">
              <span className="text-xs bg-gray-200 px-2 py-1 rounded-md">
                Slug: {data.slug}
              </span>

              {data.is_featured && (
                <span className="text-xs bg-[#54ACBF]/10 text-[#26658C] px-2 py-1 rounded-md border">
                  Unggulan
                </span>
              )}
            </div>
          </div>

          {/* 🔥 IMAGE */}
          {mainImage && (
            <img
              src={mainImage.image_url}
              onClick={() => setSelectedImage(mainImage.image_url)}
              className="w-full h-56 object-cover rounded-xl cursor-pointer hover:opacity-95"
            />
          )}

          {/* 🔥 INFO GRID */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 mb-1">Penerbit</p>
              <div className="bg-white p-3 rounded-xl shadow-sm">
                {data.issuer || "-"}
              </div>
            </div>

            <div>
              <p className="text-gray-600 mb-1">Tahun</p>
              <div className="bg-white p-3 rounded-xl shadow-sm">
                {data.year || "-"}
              </div>
            </div>
          </div>

          {/* 🔥 URL */}
          <div>
            <p className="text-gray-600 mb-1">Sumber</p>
            <div className="bg-white p-3 rounded-xl shadow-sm break-all">
              {data.source_url || "-"}
            </div>
          </div>

          {/* 🔥 DESCRIPTION */}
          <div>
            <p className="text-gray-600 mb-1">Deskripsi</p>
            <div className="bg-white p-3 rounded-xl shadow-sm">
              {data.description || "-"}
            </div>
          </div>

          {/* 🔥 SKILLS */}
          <div>
            <p className="text-gray-600 mb-1">Skills</p>

            <div className="flex flex-wrap gap-2">
              {(data.skills ?? []).length === 0 ? (
                <span className="text-gray-400">-</span>
              ) : (
                data.skills.map((s, i) => (
                  <span
                    key={i}
                    className="text-xs bg-[#A7EBF2] text-[#023859] px-2 py-1 rounded-md"
                  >
                    {s.skill}
                  </span>
                ))
              )}
            </div>
          </div>

          {/* 🔥 CATEGORY */}
          <div>
            <p className="text-gray-600 mb-1">Kategori</p>

            <div className="flex flex-wrap gap-2">
              {(data.categories ?? []).length === 0 ? (
                <span className="text-gray-400">-</span>
              ) : (
                data.categories.map((c) => (
                  <span
                    key={c.category.id}
                    className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-md"
                  >
                    {c.category.name}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 🔥 IMAGE PREVIEW */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white"
            >
              <X size={24} />
            </button>

            <img
              src={selectedImage}
              className="w-full max-h-[80vh] object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
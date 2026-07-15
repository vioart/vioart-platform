"use client";

import { X } from "lucide-react";
import { Experience } from "@/types/experience";

type Props = {
  open: boolean;
  onClose: () => void;
  data: Experience | null;
};

export default function ExperienceDetailModal({
  open,
  onClose,
  data,
}: Props) {
  if (!open || !data) return null;

  const formatDate = (date?: string | Date | null) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-4xl rounded-2xl shadow-xl p-6 overflow-y-auto max-h-[90vh]"
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-[#023859]">
            Detail Pengalaman
          </h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="h-px bg-gray-200 mb-6" />

        <div className="space-y-8 text-sm text-gray-800">
          {/* HEADER */}
          <div>
            <h3 className="text-xl font-semibold text-[#023859] leading-tight">
              {data.title}
            </h3>

            <div className="flex flex-wrap gap-2 mt-2">
              {data.company && (
                <span className="text-xs font-medium bg-[#54ACBF]/10 text-[#26658C] px-2.5 py-1 rounded-md border border-[#54ACBF]/30">
                  {data.company}
                </span>
              )}

              {data.type && (
                <span className="text-xs font-medium bg-gray-200/70 text-gray-800 px-2.5 py-1 rounded-md">
                  {data.type}
                </span>
              )}
            </div>
          </div>

          {/* INFO */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-700 font-medium mb-2">
                Perusahaan
              </p>

              <div className="bg-white rounded-xl p-4 shadow-sm">
                {data.company || "-"}
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-700 font-medium mb-2">
                Jenis Pengalaman
              </p>

              <div className="bg-white rounded-xl p-4 shadow-sm">
                {data.type || "-"}
              </div>
            </div>
          </div>

          {/* PERIODE */}
          <div>
            <p className="text-sm text-gray-700 font-medium mb-2">
              Periode
            </p>

            <div className="bg-white rounded-xl p-4 shadow-sm">
              {formatDate(data.start_date)} -{" "}
              {data.end_date ? formatDate(data.end_date) : "Sekarang"}
            </div>
          </div>

          {/* SERTIFIKAT */}
          <div>
            <p className="text-sm text-gray-700 font-medium mb-2">
              Sertifikat
            </p>

            <div className="bg-white rounded-xl p-4 shadow-sm break-all">
              {data.certificate_url ? (
                <a
                  href={data.certificate_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#26658C] hover:underline"
                >
                  {data.certificate_url}
                </a>
              ) : (
                "-"
              )}
            </div>
          </div>

          {/* DESKRIPSI */}
          <div>
            <p className="text-sm text-gray-700 font-medium mb-2">
              Deskripsi
            </p>

            <div className="bg-white rounded-xl p-4 shadow-sm leading-relaxed">
              {data.description || "-"}
            </div>
          </div>

          {/* POIN */}
          <div>
            <p className="text-sm text-gray-700 font-medium mb-2">
              Poin Pengalaman
            </p>

            <div className="bg-white rounded-xl p-4 shadow-sm">
              {(data.points ?? []).length === 0 ? (
                <p className="text-sm text-gray-700">
                  Tidak ada poin pengalaman
                </p>
              ) : (
                <ul className="space-y-2 text-sm text-gray-900">
                  {data.points.map((point) => (
                    <li
                      key={point.id}
                      className="flex items-start gap-2"
                    >
                      <span className="mt-1 w-1.5 h-1.5 bg-[#26658C] rounded-full" />

                      <span>{point.content}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
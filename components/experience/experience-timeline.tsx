"use client";

import useSWR from "swr";
import Link from "next/link";

import TimelineItem from "@/components/experience/timeline-item";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type Experience = {
  id: number;

  title: string;

  company: string | null;

  start_date: string | null;

  end_date: string | null;

  description: string | null;

  type: string | null;

  certificate_url: string | null;

  points: {
    id: number;
    content: string;
  }[];
};

export default function ExperienceTimeline() {
  const {
    data: experiences,
    isLoading,
    error,
  } = useSWR<Experience[]>("/api/experience", fetcher);

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* ================= BACKGROUND ================= */}

      <div className="absolute inset-0 -z-10">
        <div className="absolute left-[-200px] top-0 h-[600px] w-[600px] bg-blue-500/10 blur-[120px]" />

        <div className="absolute right-[-200px] bottom-0 h-[600px] w-[600px] bg-purple-500/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* ================= TITLE ================= */}

        <div className="mb-16 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-blue-400">
            Pengalaman
          </p>

          <h2 className="text-4xl font-semibold md:text-5xl">
            Perjalanan{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Profesional
            </span>
          </h2>
        </div>

        {/* ================= ERROR ================= */}

        {error && (
          <div className="py-20 text-center text-red-400">
            Gagal memuat data pengalaman.
          </div>
        )}

        {/* ================= LOADING ================= */}

        {isLoading && (
          <div className="py-20 text-center text-gray-400">
            Memuat pengalaman...
          </div>
        )}

        {/* ================= TIMELINE ================= */}

        {!isLoading && !error && (
          <>
            {experiences?.length === 0 ? (
              <div className="py-20 text-center text-gray-400">
                Belum ada pengalaman yang ditambahkan.
              </div>
            ) : (
              <div className="relative mx-auto max-w-2xl md:max-w-3xl">
                <div className="absolute bottom-0 left-4 top-0 w-px bg-gradient-to-b from-blue-500/40 via-purple-500/40 to-transparent md:left-5" />

                <div className="flex flex-col gap-12">
                  {experiences?.slice(0, 3).map((exp) => (
                    <TimelineItem key={exp.id} exp={exp} />
                  ))}
                </div>
              </div>
            )}

            {/* ================= CTA ================= */}

            <div className="mt-16 text-center">
              <Link
                href="/experiences"
                className="group relative inline-block overflow-hidden rounded-xl px-6 py-3 text-sm text-white md:px-8 md:py-4 md:text-base"
              >
                <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500" />

                <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 transition group-hover:opacity-100" />

                <span className="relative z-10">Lihat Semua Pengalaman →</span>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

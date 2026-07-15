"use client";

import { useMemo, useState } from "react";
import useSWR from "swr";

import CertificationCard from "./certification-card";

import { FaLayerGroup, FaSpinner } from "react-icons/fa";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type Category = {
  id: number;
  name: string;
  slug: string;
};

type Certification = {
  id: number;

  slug: string;

  title: string;

  issuer: string | null;

  year: number | null;

  description: string | null;

  is_featured: boolean;

  skills: {
    id: number;
    skill: string;
  }[];

  categories: {
    category: Category;
  }[];
};

export default function CertificationSection() {
  const {
    data: certifications,
    isLoading,
    error,
  } = useSWR<Certification[]>("/api/certification", fetcher);

  const { data: categoryList } = useSWR<Category[]>("/api/category", fetcher);

  const [activeCategory, setActiveCategory] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 9;

  const categories = useMemo(() => {
    return [
      {
        label: "Semua",
        value: "all",
      },

      ...(categoryList ?? []).map((category) => ({
        label: category.name,
        value: category.slug,
      })),
    ];
  }, [categoryList]);

  /*
  ==============================
      FILTER
  ==============================
  */

  const filteredCertifications = useMemo(() => {
    if (!certifications) return [];

    if (activeCategory === "all") return certifications;

    return certifications.filter((cert) =>
      cert.categories.some((cat) => cat.category.slug === activeCategory),
    );
  }, [certifications, activeCategory]);

  /*
  ==============================
      PAGINATION
  ==============================
  */

  const totalPages = Math.ceil(filteredCertifications.length / ITEMS_PER_PAGE);

  const paginatedCertifications = filteredCertifications.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <section className="pt-32 pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* ================= HERO ================= */}

        <div className="text-center mb-12">
          <p className="text-[#54ACBF] text-sm tracking-[0.3em] uppercase mb-3">
            Certifications
          </p>

          <h1 className="text-4xl md:text-5xl font-semibold">
            Professional Certifications
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-gray-400 leading-relaxed">
            Kumpulan sertifikasi, pelatihan, penghargaan, dan credential
            profesional yang telah saya selesaikan di berbagai bidang teknologi.
          </p>
        </div>

        {/* ================= ERROR ================= */}

        {error && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 py-12 text-center text-red-400">
            Gagal memuat data sertifikasi.
          </div>
        )}

        {/* ================= LOADING ================= */}

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-24">
            <FaSpinner className="animate-spin text-4xl text-[#54ACBF]" />

            <p className="mt-5 text-gray-400">Memuat sertifikasi...</p>
          </div>
        )}

        {!isLoading && !error && (
          <>
            {/* ================= FILTER ================= */}

            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category) => {
                const active = activeCategory === category.value;

                return (
                  <button
                    key={category.value}
                    onClick={() => {
                      setActiveCategory(category.value);
                      setCurrentPage(1);
                    }}
                    className={`rounded-full px-5 py-2 text-sm transition-all duration-300
                    ${
                      active
                        ? "bg-gradient-to-r from-[#54ACBF] to-[#26658C] text-white shadow-lg"
                        : "border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10"
                    }`}
                  >
                    {category.value === "all" && (
                      <FaLayerGroup className="inline mr-2" size={13} />
                    )}

                    {category.label}
                  </button>
                );
              })}
            </div>

            {/* ================= EMPTY ================= */}

            {filteredCertifications.length === 0 ? (
              <div className="rounded-3xl border border-white/10 bg-white/5 py-20 text-center">
                <h3 className="text-2xl font-semibold">
                  Belum ada sertifikasi
                </h3>

                <p className="mt-3 text-gray-400">
                  Sertifikasi akan muncul setelah ditambahkan melalui dashboard
                  admin.
                </p>
              </div>
            ) : (
              <>
                {/* ================= GRID ================= */}

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {paginatedCertifications.map((cert) => (
                    <CertificationCard
                      key={cert.id}
                      cert={{
                        slug: cert.slug,

                        title: cert.title,

                        issuer: cert.issuer ?? "",

                        year: cert.year?.toString() ?? "",

                        description: cert.description ?? "",

                        highlight: cert.is_featured,

                        categories: cert.categories.map((item) => ({
                          name: item.category.name,
                          slug: item.category.slug,
                        })),
                      }}
                    />
                  ))}
                </div>

                {/* ================= PAGINATION ================= */}

                {totalPages > 1 && (
                  <div className="mt-16 flex flex-wrap justify-center gap-3">
                    <button
                      onClick={() =>
                        setCurrentPage((page) => Math.max(1, page - 1))
                      }
                      disabled={currentPage === 1}
                      className="rounded-xl border border-white/10 bg-white/5 px-5 py-2 text-sm transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Prev
                    </button>

                    {Array.from({
                      length: totalPages,
                    }).map((_, index) => {
                      const page = index + 1;

                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`rounded-xl px-5 py-2 text-sm transition
                          ${
                            currentPage === page
                              ? "bg-gradient-to-r from-[#54ACBF] to-[#26658C] text-white"
                              : "border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}

                    <button
                      onClick={() =>
                        setCurrentPage((page) => Math.min(totalPages, page + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="rounded-xl border border-white/10 bg-white/5 px-5 py-2 text-sm transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
}

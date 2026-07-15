"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import useSWR from "swr";

import CertificationCard from "@/components/certification/certification-card";

const fetcher = (url: string) =>
  fetch(url).then((res) => res.json());

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

  categories: {
    category: Category;
  }[];
};

export default function FeaturedCertifications() {
  const {
    data: certifications,
    isLoading,
  } = useSWR<Certification[]>(
    "/api/certification",
    fetcher,
  );

  const featured =
    certifications?.filter(
      (cert) => cert.is_featured,
    ) ?? [];

  return (
    <section className="relative overflow-hidden py-16 md:py-24 lg:py-32">
      {/* ================= BACKGROUND ================= */}

      <div className="absolute inset-0 -z-10">
        <div className="absolute left-[-200px] top-0 h-[600px] w-[600px] bg-blue-500/10 blur-[120px]" />

        <div className="absolute right-[-200px] bottom-0 h-[600px] w-[600px] bg-purple-500/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        {/* ================= HEADER ================= */}

        <div className="mb-10 max-w-2xl md:mb-16">

          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-blue-400">
            Sertifikasi
          </p>

          <h2 className="text-4xl font-semibold md:text-5xl">
            Sertifikasi{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Unggulan
            </span>
          </h2>

          <p className="mt-4 text-gray-400">
            Sertifikasi dan pencapaian yang menunjukkan
            kompetensi serta pengalaman saya di berbagai
            bidang teknologi.
          </p>

        </div>

        {/* ================= LOADING ================= */}

        {isLoading ? (
          <div className="py-20 text-center text-gray-400">
            Memuat sertifikasi...
          </div>
        ) : featured.length === 0 ? (
          <div className="py-20 text-center text-gray-400">
            Belum ada sertifikasi unggulan.
          </div>
        ) : (
          <>
            {/* ================= GRID ================= */}

            <div className="grid gap-6 md:grid-cols-2">

              {featured.map((cert, index) => (

                <motion.div
                  key={cert.id}
                  initial={{
                    opacity: 0,
                    y: 40,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: index * 0.1,
                  }}
                >
                  <CertificationCard
                    cert={{
                      slug: cert.slug,

                      title: cert.title,

                      issuer:
                        cert.issuer ?? "",

                      year:
                        cert.year?.toString() ??
                        "",

                      description:
                        cert.description ??
                        "",

                      highlight:
                        cert.is_featured,

                      categories:
                        cert.categories.map(
                          (item) => ({
                            name: item.category.name,
                            slug: item.category.slug,
                          }),
                        ),
                    }}
                  />
                </motion.div>

              ))}

            </div>

            {/* ================= CTA ================= */}

            <div className="mt-10 flex justify-center md:mt-16">

              <Link
                href="/certifications"
                className="group relative inline-block overflow-hidden rounded-xl px-8 py-4 text-white"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500" />

                <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 transition group-hover:opacity-100" />

                <span className="relative z-10">
                  Lihat Semua Sertifikasi →
                </span>
              </Link>

            </div>
          </>
        )}
      </div>
    </section>
  );
}
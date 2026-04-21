"use client";

import { motion } from "framer-motion";
import CertificationCard from "@/components/certification/certification-card";
import Link from "next/link";

const certifications = [
  {
    title: "TensorFlow Developer Certificate",
    issuer: "Google",
    year: "2024",
    category: "AI / Machine Learning",
    slug: "tensorflow-developer",
    highlight: true,
  },
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    year: "2024",
    category: "Cloud Computing",
    slug: "tensorflow-developer",
  },
  {
    title: "Meta Backend Developer Professional",
    issuer: "Meta (Coursera)",
    year: "2023",
    category: "Web Development",
    slug: "tensorflow-developer",
  },
  {
    title: "Google Cloud Associate Engineer",
    issuer: "Google Cloud",
    year: "2024",
    category: "Cloud Computing",
    slug: "tensorflow-developer",
  },
  {
    title: "Juara 1 National Hackathon",
    issuer: "Kemenkominfo",
    year: "2024",
    category: "Competition & Awards",
    slug: "tensorflow-developer",
  },
  {
    title: "Bangkit Academy ML Path",
    issuer: "Google, GoTo, Traveloka",
    year: "2023",
    category: "AI / Machine Learning",
    slug: "tensorflow-developer",
  },
];

export default function FeaturedCertifications() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-[-200px] top-[0px] w-[600px] h-[600px] bg-blue-500/10 blur-[120px]" />
        <div className="absolute right-[-200px] bottom-[0px] w-[600px] h-[600px] bg-purple-500/10 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* HEADER */}
        <div className="max-w-2xl mb-10 md:mb-16">
          <p className="text-xs tracking-[0.2em] text-blue-400 uppercase mb-3">
            Sertifikasi
          </p>

          <h2 className="text-4xl md:text-5xl font-semibold">
            Sertifikasi{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              Unggulan
            </span>
          </h2>

          <p className="text-gray-400 mt-4">
            Sertifikasi dan pencapaian yang menunjukkan kompetensi dan
            pengalaman saya.
          </p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-6">
          {certifications.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <CertificationCard cert={cert} />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 md:mt-16 flex justify-center">
          <Link
            href="/sertifikasi"
            className="relative px-8 py-4 rounded-xl text-white overflow-hidden group inline-block"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500" />

            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-purple-500 to-blue-500" />

            <span className="relative z-10">Lihat Semua Sertifikasi →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

"use client";

import TimelineItem from "@/components/experience/timeline-item";
import Link from "next/link";

const experiences = [
  {
    title: "Machine Learning Cohort",
    company: "Bangkit Academy by Google, GoTo, Traveloka",
    duration: "Feb 2024 – Jul 2024",
    description:
      "An intensive, Google-supported program focusing on machine learning, soft skills, and real-world capstone projects.",
    points: [
      "Completed 100+ hours of ML coursework on Coursera",
      "Built a capstone project with a team of 6 using TensorFlow",
      "Achieved distinction-level performance in assessments",
    ],
    tech: ["Python", "TensorFlow", "Google Cloud", "Jupyter"],
    type: "Program",
  },
  {
    title: "AI Engineering Participant",
    company: "Laskar AI",
    duration: "Aug 2024 – Oct 2024",
    description:
      "A competitive bootcamp program focused on applied AI and building production-ready AI solutions.",
    points: [
      "Developed an NLP-based content classifier",
      "Deployed models using FastAPI and Docker",
      "Collaborated with cross-functional teams on AI sprints",
    ],
    tech: ["Python", "FastAPI", "Docker", "Hugging Face"],
    type: "Bootcamp",
  },
];

export default function ExperienceTimeline() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* BACKGROUND GLOW */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-[-200px] top-0 w-[600px] h-[600px] bg-blue-500/10 blur-[120px]" />
          <div className="absolute right-[-200px] bottom-0 w-[600px] h-[600px] bg-purple-500/10 blur-[120px]" />
        </div>

        {/* TITLE */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.2em] text-blue-400 uppercase mb-3">
            Pengalaman
          </p>

          <h2 className="text-4xl md:text-5xl font-semibold">
            Perjalanan{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              Profesional
            </span>
          </h2>
        </div>

        {/* TIMELINE WRAPPER */}
        <div className="relative max-w-2xl md:max-w-3xl mx-auto">
          <div className="absolute left-4 md:left-5 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/40 via-purple-500/40 to-transparent" />
          <div className="flex flex-col gap-12">
            {experiences.map((exp, i) => (
              <TimelineItem key={i} exp={exp} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link
            href="/pengalaman"
            className="relative text-sm md:text-base px-6 md:px-8 py-3 md:py-4 rounded-xl text-white overflow-hidden group inline-block"
          >
            {/* layer 1 */}
            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500" />

            {/* layer 2 (hover) */}
            <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-purple-500 to-blue-500" />

            {/* content */}
            <span className="relative z-10">Lihat Semua Pengalaman →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

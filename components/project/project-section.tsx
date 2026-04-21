"use client";

import { useState } from "react";
import { projects } from "@/lib/projects";
import ProjectCard from "@/components/project/project-card";
import { FaGlobe, FaMobileAlt, FaCube, FaLayerGroup } from "react-icons/fa";

const categories = [
  {
    label: "Semua",
    value: "all",
    icon: FaLayerGroup,
    activeColor: "from-blue-500 to-purple-500",
  },
  {
    label: "Website",
    value: "website",
    icon: FaGlobe,
    activeColor: "from-green-400 to-emerald-500",
  },
  {
    label: "Mobile Application",
    value: "mobile",
    icon: FaMobileAlt,
    activeColor: "from-pink-500 to-rose-500",
  },
  {
    label: "AR & VR",
    value: "arvr",
    icon: FaCube,
    activeColor: "from-purple-500 to-indigo-500",
  },
];

export default function ProjectSection() {
  const [active, setActive] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 9;

  // FILTER
  const filteredProjects =
    active === "all"
      ? projects
      : projects.filter((p) => p.category === active);

  // PAGINATION
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);

  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <section className="pt-32 pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* TITLE */}
        <div className="text-center mb-10">
          <p className="text-blue-500 text-sm tracking-widest uppercase">
            Portfolio
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold mb-3">
            Semua Project
          </h2>
          <p className="text-gray-500">
            Eksplorasi project yang telah saya kerjakan di berbagai kategori.
          </p>
        </div>

        {/* FILTER (FINAL) */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = active === cat.value;

            return (
              <button
                key={cat.value}
                onClick={() => {
                  setActive(cat.value);
                  setCurrentPage(1); // reset page
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                  isActive
                    ? `bg-gradient-to-r ${cat.activeColor} text-white shadow-lg`
                    : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10"
                }`}
              >
                <Icon size={16} />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-6">
          {paginatedProjects.map((project, i) => (
            <ProjectCard key={i} project={project} />
          ))}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12 gap-2 flex-wrap">

            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              const isActive = page === currentPage;

              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg text-sm transition ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
                      : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(p + 1, totalPages))
              }
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10"
            >
              Next
            </button>

          </div>
        )}
      </div>
    </section>
  );
}
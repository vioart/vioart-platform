"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Filter, Eye, Pencil, Trash } from "lucide-react";
import DataTable from "@/components/ui/data-table";
import Link from "next/link";
import ConfirmModal from "@/components/ui/confirm-modal";
import ProjectDetailModal from "@/components/ui/project-detail-modal";

type Tech = {
  id: number;
  name: string;
};

type Category = {
  id: number;
  name: string;
};

type Project = {
  id: number;
  title: string;
  slug: string;
  project_url: string;
  description: string;
  is_featured: boolean;
  created_at: string;

  details?: {
    problem?: string;
    solution?: string;
  };

  features?: {
    content: string;
  }[];

  techs: {
    tech: Tech;
  }[];

  categories: {
    category: Category;
  }[];

  images?: {
    image_url: string;
    is_primary: boolean;
  }[];
};

type SortType = "newest" | "oldest" | "az" | "za";

export default function ProjectPage() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<Project[]>([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortType>("newest");
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [viewData, setViewData] = useState<Project | null>(null);

  const filteredData = data.filter((item) => {
    const keyword = search.toLowerCase();

    return (
      item.title.toLowerCase().includes(keyword) ||
      item.details?.problem?.toLowerCase().includes(keyword) ||
      item.techs.some((t) => t.tech.name.toLowerCase().includes(keyword)) ||
      item.categories.some((c) =>
        c.category.name.toLowerCase().includes(keyword),
      )
    );
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (sort === "newest") {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }

    if (sort === "oldest") {
      return (
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    }

    if (sort === "az") {
      return a.title.localeCompare(b.title);
    }

    if (sort === "za") {
      return b.title.localeCompare(a.title);
    }

    return 0;
  });

  const sortOptions: { label: string; value: SortType }[] = [
    { label: "Terbaru", value: "newest" },
    { label: "Terlama", value: "oldest" },
    { label: "Judul A-Z", value: "az" },
    { label: "Judul Z-A", value: "za" },
  ];

  const totalData = sortedData.length;
  const totalPages = Math.max(1, Math.ceil(totalData / limit));

  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedData = sortedData.slice(start, end);

  useEffect(() => {
    fetch("/api/admin/project")
      .then((res) => res.json())
      .then(setData);
  }, []);

  const rows: Project[] = paginatedData;

  function truncate(text: string | null | undefined, length = 60) {
    if (!text) return "-";
    return text.length > length ? text.slice(0, length) + "..." : text;
  }

  const handleDelete = async () => {
    if (!deleteId) return;

    setLoadingDelete(true);

    const res = await fetch(`/api/admin/project/${deleteId}`, {
      method: "DELETE",
    });

    const data = await res.json();

    setLoadingDelete(false);

    if (!res.ok) {
      alert(data.error);
      return;
    }

    setData((prev) => prev.filter((item) => item.id !== deleteId));

    setDeleteId(null);
  };

  const columns = [
    {
      header: "Judul",
      render: (item: Project) => (
        <span
          className="font-medium text-gray-800 max-w-[200px] block truncate"
          title={item.title}
        >
          {truncate(item.title, 40)}
        </span>
      ),
    },
    {
      header: "Masalah",
      render: (item: Project) => (
        <span
          className="text-sm text-gray-700 max-w-[250px]"
          title={item.details?.problem || ""}
        >
          {truncate(item.details?.problem, 60)}
        </span>
      ),
    },
    {
      header: "Teknologi",
      render: (item: Project) => (
        <div className="flex flex-wrap gap-1">
          {item.techs?.slice(0, 2).map((t) => (
            <span
              key={t.tech.id}
              className="text-xs bg-[#A7EBF2] text-[#023859] px-2 py-0.5 rounded-md hover:scale-105 transition"
            >
              {t.tech.name}
            </span>
          ))}
        </div>
      ),
    },
    {
      header: "Kategori",
      render: (item: Project) => (
        <div className="flex flex-wrap gap-1">
          {item.categories?.slice(0, 2).map((c) => (
            <span
              key={c.category.id}
              className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-md hover:scale-105 transition"
            >
              {c.category.name}
            </span>
          ))}
        </div>
      ),
    },
    {
      header: "Tanggal",
      render: (item: Project) => (
        <span className="text-gray-700">
          {new Date(item.created_at).getFullYear()}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* HEADER ACTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* LEFT */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* SEARCH */}
          <div className="relative w-full sm:w-64 h-10">
            {/* ICON */}
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Search size={16} className="text-gray-400" />
            </div>

            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Cari project..."
              className="
                w-full h-full pl-9 pr-3
                text-sm text-gray-700
                bg-white border border-gray-300
                rounded-xl shadow-sm
                placeholder:text-gray-700
                focus:ring-2 focus:ring-[#54ACBF]/40
                focus:border-[#54ACBF]
                outline-none transition
              "
            />
          </div>

          {/* FILTER */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-xl shadow-sm text-gray-700"
            >
              <Filter size={16} />
              Filter
            </button>

            {open && (
              <div className="absolute mt-2 w-40 bg-white border border-gray-300 rounded-xl shadow-lg z-50 text-gray-700">
                {sortOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setSort(opt.value);
                      setOpen(false);
                      setPage(1);
                    }}
                    className={`
                      w-full text-left px-3 py-2 text-sm transition flex justify-between items-center
                      ${
                        sort === opt.value
                          ? "bg-[#54ACBF]/10 text-[#023859] font-medium"
                          : "hover:bg-gray-100"
                      }
                    `}
                  >
                    {opt.label}

                    {sort === opt.value && (
                      <span className="text-xs text-[#54ACBF]">✔</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <Link
          href="/admin/project/create"
          className="
    flex items-center justify-center gap-2
    px-4 py-2 bg-[#54ACBF] text-white
    rounded-xl shadow-sm hover:bg-[#26658C]
    transition w-full md:w-auto
  "
        >
          <Plus size={16} />
          Tambah Data
        </Link>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <DataTable
          data={rows}
          columns={columns}
          renderAction={(item) => (
            <div className="flex items-center justify-start gap-1 w-full">
              {/* VIEW */}
              <button
                onClick={() => setViewData(item)}
                className="p-1 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-[#26658C] transition"
                title="Lihat"
              >
                <Eye size={18} />
              </button>

              {/* EDIT */}
              <Link
                href={`/admin/project/${item.id}/edit`}
                className="p-1 rounded-lg text-yellow-600 hover:bg-yellow-50 transition"
              >
                <Pencil size={18} />
              </Link>

              {/* DELETE */}
              <button
                onClick={() => setDeleteId(item.id)}
                disabled={loadingDelete}
                className="p-1 rounded-lg text-red-500 hover:bg-red-50 transition"
                title="Hapus"
              >
                <Trash size={18} />
              </button>
            </div>
          )}
        />

        {/* PAGINATION */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 px-6 py-4 border-t text-sm">
          {/* LEFT (INFO + LIMIT) */}
          <div className="flex items-center gap-3">
            <p className="text-gray-600 font-medium">
              {totalData === 0
                ? "Tidak ada data"
                : `Menampilkan ${start + 1}-${Math.min(end, totalData)} dari ${totalData} data`}
            </p>

            <select
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setPage(1);
              }}
              className="
        bg-white border border-gray-300
        rounded-lg px-3 py-1.5 text-sm
        text-gray-700 shadow-sm
        hover:border-[#54ACBF]
        focus:ring-2 focus:ring-[#54ACBF]/40
        outline-none
      "
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>50</option>
            </select>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-1">
            {/* PREV */}
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="
                px-3 py-1.5 border rounded-lg
                text-gray-600 disabled:opacity-40
                hover:bg-gray-100
              "
            >
              Prev
            </button>

            {/* PAGE NUMBERS */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`
                  px-3 py-1.5 rounded-lg
                  ${
                    p === page
                      ? "bg-[#54ACBF] text-white"
                      : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                  }
                `}
              >
                {p}
              </button>
            ))}

            {/* NEXT */}
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="
                px-3 py-1.5 border rounded-lg
                text-gray-600 disabled:opacity-40
                hover:bg-gray-100
              "
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <ConfirmModal
        open={deleteId !== null}
        title="Hapus Project"
        description="Data project akan dihapus permanen. Lanjutkan?"
        confirmText={loadingDelete ? "Menghapus..." : "Hapus"}
        cancelText="Batal"
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />

      <ProjectDetailModal
        open={viewData !== null}
        data={viewData}
        onClose={() => setViewData(null)}
      />
    </div>
  );
}

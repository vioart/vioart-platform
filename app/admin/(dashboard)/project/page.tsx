"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, Pencil, Trash } from "lucide-react";

import { useFetch } from "@/hooks/useFetch";
import { useDelete } from "@/hooks/useDelete";
import { useTable } from "@/hooks/useTable";
import { usePagination } from "@/hooks/usePagination";

import TableWrapper from "@/components/ui/table-wrapper";
import TableHeader from "@/components/ui/table-header";
import ConfirmModal from "@/components/ui/confirm-modal";
import ProjectDetailModal from "@/components/ui/project-detail-modal";

import { projectColumns } from "@/configs/project.columns";
import { Project } from "@/types/project";
type SortType = "newest" | "oldest" | "az" | "za";

export default function ProjectPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [sort, setSort] = useState<SortType>("newest");
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [viewData, setViewData] = useState<Project | null>(null);

  const { data, setData, loading } = useFetch<Project>("/api/admin/project");

  const sortOptions: { label: string; value: SortType }[] = [
    { label: "Terbaru", value: "newest" },
    { label: "Terlama", value: "oldest" },
    { label: "Nama A-Z", value: "az" },
    { label: "Nama Z-A", value: "za" },
  ];

  const { handleDelete, loading: deleting } = useDelete<Project>(
    "/api/admin/project",
    setData,
  );

  const filterFn = (item: Project, keyword: string) => {
    return (
      item.title.toLowerCase().includes(keyword) ||
      item.details?.problem?.toLowerCase().includes(keyword) ||
      item.techs.some((t) => t.tech.name.toLowerCase().includes(keyword)) ||
      item.categories.some((c: Project["categories"][number]) =>
        c.category.name.toLowerCase().includes(keyword),
      )
    );
  };

  const sortFn = (a: Project, b: Project) => {
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
  };

  const { data: processed } = useTable({
    data,
    search,
    filterFn,
    sortFn,
  });

  const {
    data: rows,
    total,
    totalPages,
    start,
    end,
  } = usePagination({
    data: processed,
    page,
    limit,
  });
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <TableHeader
        search={search}
        setSearch={setSearch}
        setPage={setPage}
        sort={sort}
        setSort={setSort}
        open={open}
        setOpen={setOpen}
        sortOptions={sortOptions}
        createUrl="/admin/project/create"
        menuName="project"
      />

      {/* TABLE */}
      <TableWrapper
        data={rows}
        columns={projectColumns}
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
              title="Edit"
            >
              <Pencil size={18} />
            </Link>

            {/* DELETE */}
            <button
              onClick={() => setDeleteId(item.id)}
              disabled={deleting}
              className="p-1 rounded-lg text-red-500 hover:bg-red-50 transition"
              title="Hapus"
            >
              <Trash size={18} />
            </button>
          </div>
        )}
        total={total}
        start={start}
        end={end}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        limit={limit}
        onLimitChange={(n) => {
          setLimit(n);
          setPage(1);
        }}
      />

      <ConfirmModal
        open={deleteId !== null}
        title="Hapus Project"
        description="Data project akan dihapus permanen. Lanjutkan?"
        confirmText={deleting ? "Menghapus..." : "Hapus"}
        cancelText="Batal"
        onCancel={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) handleDelete(deleteId);
          setDeleteId(null);
        }}
      />

      <ProjectDetailModal
        open={viewData !== null}
        data={viewData}
        onClose={() => setViewData(null)}
      />
    </div>
  );
}

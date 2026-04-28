import { Column } from "@/components/ui/data-table";
import { Project } from "@/types/project";

function truncate(text: string | null | undefined, length = 60) {
  if (!text) return "-";
  return text.length > length ? text.slice(0, length) + "..." : text;
}

export const projectColumns: Column<Project>[] = [
  {
    header: "Nama Project",
    render: (item) => (
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
    render: (item) => (
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
    render: (item) => (
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
    render: (item) => (
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
    render: (item) => (
      <span className="text-gray-700">
        {new Date(item.created_at).getFullYear()}
      </span>
    ),
  },
];
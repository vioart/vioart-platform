import { Column } from "@/components/ui/data-table";
import { Experience } from "@/types/experience";

function formatDate(date?: string) {
  if (!date) return "-";
  return new Date(date).getFullYear();
}

function truncate(text?: string, len = 50) {
  if (!text) return "-";
  return text.length > len ? text.slice(0, len) + "..." : text;
}

export const experienceColumns: Column<Experience>[] = [
  {
    header: "Nama Program",
    render: (item) => (
      <span className="font-medium text-gray-800">
        {item.title}
      </span>
    ),
  },
  {
    header: "Perusahaan",
    render: (item) => (
      <span className="text-sm text-gray-700">
        {item.company || "-"}
      </span>
    ),
  },
  {
    header: "Periode",
    render: (item) => (
      <span className="text-gray-700">
        {formatDate(item.start_date)} -{" "}
        {item.end_date ? formatDate(item.end_date) : "Sekarang"}
      </span>
    ),
  },
  {
    header: "Tipe",
    render: (item) => (
      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-md">
        {item.type || "-"}
      </span>
    ),
  },
  {
    header: "Deskripsi",
    render: (item) => (
      <span className="text-sm text-gray-600">
        {truncate(item.description)}
      </span>
    ),
  },
];
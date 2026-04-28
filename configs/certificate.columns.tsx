import { Column } from "@/components/ui/data-table";
import { Certification } from "@/types/certification";

export const certificationColumns: Column<Certification>[] = [
  {
    header: "Nama Sertifikat",
    render: (item) => (
      <span className="font-medium text-gray-800">{item.title}</span>
    ),
  },
  {
    header: "Penerbit",
    render: (item) => (
      <span className="text-sm text-gray-700">{item.issuer || "-"}</span>
    ),
  },
  {
    header: "Tahun",
    render: (item) => <span className="text-gray-700">{item.year || "-"}</span>,
  },
  {
    header: "Kategori",
    render: (item) => {
      if (!item.categories || item.categories.length === 0) {
        return <span className="text-gray-400 text-sm">-</span>;
      }

      const firstCategory = item.categories[0];

      return (
        <div className="flex flex-wrap gap-1">
          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-md">
            {firstCategory.category.name}
          </span>
        </div>
      );
    },
  },
  {
    header: "Unggulan",
    render: (item) => (
      <span
        className={`
          text-xs px-2 py-1 rounded-md
          ${
            item.is_featured
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-500"
          }
        `}
      >
        {item.is_featured ? "Ya" : "Tidak"}
      </span>
    ),
  },
];

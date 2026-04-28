import DataTable, { Column } from "@/components/ui/data-table";

type Props<T> = {
  data: T[];
  columns: Column<T>[];
  renderAction?: (item: T) => React.ReactNode;

  total: number;
  start: number;
  end: number;

  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;

  limit: number;
  onLimitChange: (n: number) => void;
};

export default function TableWrapper<T>({
  data,
  columns,
  renderAction,
  total,
  start,
  end,
  page,
  totalPages,
  onPageChange,
  limit,
  onLimitChange,
}: Props<T>) {
  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
      <DataTable data={data} columns={columns} renderAction={renderAction} />

      {/* PAGINATION (COPY EXACT) */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 px-6 py-4 border-t text-sm">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <p className="text-gray-600 font-medium">
            {total === 0
              ? "Tidak ada data"
              : `Menampilkan ${start + 1}-${Math.min(end, total)} dari ${total} data`}
          </p>

          <select
            value={limit}
            onChange={(e) => {
              onLimitChange(Number(e.target.value));
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
          <button
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
            className="px-3 py-1.5 border rounded-lg text-gray-600 disabled:opacity-40 hover:bg-gray-100"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => onPageChange(p)}
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

          <button
            disabled={page === totalPages}
            onClick={() => onPageChange(page + 1)}
            className="px-3 py-1.5 border rounded-lg text-gray-600 disabled:opacity-40 hover:bg-gray-100"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

import { Inbox } from "lucide-react";

export type Column<T> = {
  header: string;
  render: (item: T) => React.ReactNode;
  className?: string;
};

type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  renderAction?: (item: T) => React.ReactNode;
};

export default function DataTable<T>({
  data,
  columns,
  renderAction,
}: DataTableProps<T>) {
  return (
    <div className="bg-white border shadow-sm overflow-hidden">
      <table className="w-full text-sm">
        {/* HEADER */}
        <thead className="sticky top-0 z-20 bg-[#011C40] text-white border-b">
          <tr className="text-xs uppercase">
            {columns.map((col, i) => (
              <th key={i} className="px-6 py-3 text-left font-semibold">
                {col.header}
              </th>
            ))}

            {renderAction && (
              <th className="px-6 py-3 text-left font-semibold">Aksi</th>
            )}
          </tr>
        </thead>

        {/* BODY */}
        <tbody className="divide-y">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (renderAction ? 1 : 0)}>
                <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                  <Inbox size={40} className="mb-3 opacity-70" />
                  <p className="text-sm font-medium">Data Kosong</p>
                  <p className="text-xs text-gray-400">
                    Belum ada data yang ditampilkan
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 transition h-[56px]">
                {columns.map((col, i) => (
                  <td key={i} className="px-6 py-2">
                    {col.render(item)}
                  </td>
                ))}

                {renderAction && (
                  <td className="px-6 py-2">
                    <div className="flex items-center justify-start gap-1 w-full">
                      {renderAction(item)}
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

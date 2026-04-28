import { Search, Filter, Plus } from "lucide-react";
import Link from "next/link";

type SortType = "newest" | "oldest" | "az" | "za";

type Props = {
  search: string;
  setSearch: (v: string) => void;
  setPage: (n: number) => void;

  sort: SortType;
  setSort: (v: SortType) => void;

  open: boolean;
  setOpen: (v: boolean) => void;

  sortOptions: { label: string; value: SortType }[];
  
  createUrl: string;
  menuName: string;
};

export default function TableHeader({
  search,
  setSearch,
  setPage,
  sort,
  setSort,
  open,
  setOpen,
  sortOptions,
  createUrl,
  menuName
}: Props) {
  return (
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
            placeholder={`Cari ${menuName}...`}
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
        href={createUrl}
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
  );
}

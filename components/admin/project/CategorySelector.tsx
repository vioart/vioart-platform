import { useTechAndCategory } from "@/hooks/useTechAndCategory";

type Category = {
  id: number;
  name: string;
  slug: string;
};

type Props = {
  categories: Category[];
  techCat: ReturnType<typeof useTechAndCategory>;
};

export function CategorySelector({ categories, techCat }: Props) {
  return (
    <div className="space-y-3">
      <label className="admin-label">Kategori</label>

      {/* SELECTED */}
      <div className="flex flex-wrap gap-2 min-h-[32px]">
        {techCat.selectedCategories.length === 0 && (
          <span className="text-gray-400 text-sm">
            Belum ada kategori dipilih
          </span>
        )}

        {techCat.selectedCategories.map((id) => {
          const cat = categories.find((c) => c.id === id);

          return (
            <span
              key={id}
              className="flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-md"
            >
              {cat?.name}

              <button
                onClick={() => techCat.toggleCategory(id)}
                className="text-xs hover:text-red-500"
              >
                ✕
              </button>
            </span>
          );
        })}
      </div>

      {/* OPTIONS */}
      <div className="admin-input flex flex-wrap gap-2 min-h-[44px] items-center">
        {categories.length === 0 ? (
          <div className="w-full flex items-center justify-between text-sm text-gray-400">
            <span>Belum ada kategori</span>

            <button
              type="button"
              className="text-purple-500 hover:underline text-xs"
            >
              + Tambah
            </button>
          </div>
        ) : (
          categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => techCat.toggleCategory(cat.id)}
              className={`px-3 py-1 rounded-lg text-sm border transition ${
                techCat.isCategorySelected(cat.id)
                  ? "bg-purple-500 text-white border-purple-500"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {cat.name}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
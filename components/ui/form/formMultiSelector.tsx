type Item = {
  id: number;
  name: string;
};

type Props = {
  label: string;
  items: Item[];
  selected: number[];
  onToggle: (id: number) => void;
  isSelected: (id: number) => boolean;
  emptyText?: string;
  addLabel?: string;
};

export function FormMultiSelector({
  label,
  items,
  selected,
  onToggle,
  isSelected,
  emptyText = "Belum ada data",
  addLabel = "+ Tambah",
}: Props) {
  return (
    <div className="space-y-3">
      {/* LABEL */}
      <label className="admin-label">{label}</label>

      {/* SELECTED */}
      <div className="flex flex-wrap gap-2 min-h-[32px]">
        {selected.length === 0 && (
          <span className="text-gray-400 text-sm">
            Belum ada yang dipilih
          </span>
        )}

        {selected.map((id) => {
          const item = items.find((i) => i.id === id);

          return (
            <span
              key={id}
              className="flex items-center gap-1 px-2 py-1 text-xs bg-[#A7EBF2] text-[#023859] rounded-md"
            >
              {item?.name}

              <button
                type="button"
                onClick={() => onToggle(id)}
                className="hover:text-red-500"
              >
                ✕
              </button>
            </span>
          );
        })}
      </div>

      {/* OPTIONS */}
      <div className="admin-input flex flex-wrap gap-2 min-h-[44px] items-center">
        {items.length === 0 ? (
          <div className="w-full flex items-center justify-between text-sm text-gray-400">
            <span>{emptyText}</span>

            <button
              type="button"
              className="text-[#54ACBF] hover:underline text-xs"
            >
              {addLabel}
            </button>
          </div>
        ) : (
          items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onToggle(item.id)}
              className={`px-3 py-1 rounded-lg text-sm border transition ${
                isSelected(item.id)
                  ? "bg-[#54ACBF] text-white border-[#54ACBF]"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.name}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
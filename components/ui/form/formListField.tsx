import { Plus, Trash } from "lucide-react";

type Props = {
  title: string;
  description?: string;

  items: string[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (value: string, index: number) => void;

  labelPrefix?: string;
  placeholder?: string;
};

export function FormListField({
  title,
  description,
  items,
  onAdd,
  onRemove,
  onChange,
  labelPrefix = "Item",
  placeholder,
}: Props) {
  return (
    <div className="space-y-5">
      <h2 className="text-base font-semibold text-[#023859] border-b pb-2">
        {title}
      </h2>

      {description && (
        <p className="text-sm text-gray-500">{description}</p>
      )}

      <div className="space-y-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-3 p-3 border rounded-xl bg-white"
          >
            {/* INPUT */}
            <div className="flex-1 space-y-1">
              <label className="admin-label">
                {labelPrefix} {i + 1}
              </label>
              <input
                value={item}
                onChange={(e) => onChange(e.target.value, i)}
                className="admin-input"
                placeholder={placeholder}
              />
            </div>

            {/* DELETE */}
            <button
              onClick={() => onRemove(i)}
              className="mt-6 p-2 rounded-lg text-red-500 hover:bg-red-50 transition"
            >
              <Trash size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* ADD */}
      <button
        onClick={onAdd}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#54ACBF] text-white hover:bg-[#26658C] transition shadow-sm"
      >
        <Plus size={16} />
        Tambah {labelPrefix}
      </button>
    </div>
  );
}
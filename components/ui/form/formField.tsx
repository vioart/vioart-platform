type Props<T> = {
  label: string;
  value: T;
  onChange: (val: T) => void;
  placeholder?: string;
  type?: "text" | "number" | "date";
};

export function FormField<T extends string | number>({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: Props<T>) {
  return (
    <div className="space-y-1">
      <label className="admin-label">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => {
          const val = e.target.value;

          if (type === "number") {
            onChange((val === "" ? "" : Number(val)) as T);
          } else {
            onChange(val as T);
          }
        }}
        placeholder={placeholder}
        className="admin-input"
      />
    </div>
  );
}

type Props = {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  rows?: number;
};

export function FormTextarea({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
}: Props) {
  return (
    <div className="space-y-1">
      <label className="admin-label">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="admin-input min-h-[120px]"
      />
    </div>
  );
}
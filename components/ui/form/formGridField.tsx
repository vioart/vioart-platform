type Field = {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
};

type Props = {
  left: Field;
  right: Field;
};

export function FormGridField({ left, right }: Props) {
  return (
    <div className="grid md:grid-cols-2 gap-5">
      {/* LEFT */}
      <div className="space-y-1">
        <label className="admin-label">{left.label}</label>
        <input
          value={left.value}
          onChange={(e) => left.onChange(e.target.value)}
          placeholder={left.placeholder}
          className="admin-input"
        />
      </div>

      {/* RIGHT */}
      <div className="space-y-1">
        <label className="admin-label">{right.label}</label>
        <input
          value={right.value}
          onChange={(e) => right.onChange(e.target.value)}
          placeholder={right.placeholder}
          className="admin-input"
        />
      </div>
    </div>
  );
}
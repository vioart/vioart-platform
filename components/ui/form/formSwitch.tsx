type Props = {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (val: boolean) => void;
};

export function FormSwitch({
  label,
  description,
  checked,
  onChange,
}: Props) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-white shadow-sm">
      <div>
        <p className="text-sm font-semibold text-gray-800">{label}</p>
        {description && (
          <p className="text-xs text-gray-500">{description}</p>
        )}
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full transition
          ${checked ? "bg-[#54ACBF]" : "bg-gray-300"}
        `}
      >
        <span
          className={`
            inline-block h-5 w-5 transform rounded-full bg-white shadow transition
            ${checked ? "translate-x-5" : "translate-x-1"}
          `}
        />
      </button>
    </div>
  );
}
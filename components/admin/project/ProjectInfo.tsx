import { useProjectForm } from "@/hooks/useProjectForm";

type Props = {
  form: ReturnType<typeof useProjectForm>;
};

export function ProjectInfo({ form }: Props) {
  return (
    <div className="space-y-5">
      <h2 className="text-base font-semibold text-[#023859] border-b pb-2">
        Informasi Project
      </h2>

      {/* TITLE + SLUG */}
      <div className="grid md:grid-cols-2 gap-5">
        <div className="space-y-1">
          <label className="admin-label">Judul Project</label>
          <input
            value={form.title}
            onChange={(e) => form.handleTitleChange(e.target.value)}
            className="admin-input"
          />
        </div>

        <div className="space-y-1">
          <label className="admin-label">Slug</label>
          <input
            value={form.slug}
            onChange={(e) => form.setSlug(e.target.value)}
            className="admin-input"
          />
        </div>
      </div>

      {/* URL */}
      <div className="space-y-1">
        <label className="admin-label">URL Project</label>
        <input
          value={form.url}
          onChange={(e) => form.setUrl(e.target.value)}
          className="admin-input"
          placeholder="https://example.com"
        />
      </div>

      {/* DESCRIPTION */}
      <div className="space-y-1">
        <label className="admin-label">Deskripsi Project</label>
        <textarea
          value={form.description}
          onChange={(e) => form.setDescription(e.target.value)}
          className="admin-input min-h-[120px]"
          placeholder="Jelaskan tentang project ini..."
        />
      </div>

      {/* FEATURED TOGGLE */}
      <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-white shadow-sm">
        <div>
          <p className="text-sm font-semibold text-gray-800">
            Tampilkan sebagai Unggulan
          </p>
          <p className="text-xs text-gray-500">
            Project akan ditampilkan di bagian utama
          </p>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={form.isFeatured}
          onClick={() => form.setIsFeatured(!form.isFeatured)}
          className={`
            relative inline-flex h-6 w-11 items-center rounded-full transition
            ${form.isFeatured ? "bg-[#54ACBF]" : "bg-gray-300"}
          `}
        >
          <span
            className={`
              inline-block h-5 w-5 transform rounded-full bg-white shadow transition
              ${form.isFeatured ? "translate-x-5" : "translate-x-1"}
            `}
          />
        </button>
      </div>
    </div>
  );
}
import { useTechAndCategory } from "@/hooks/useTechAndCategory";

type Tech = {
  id: number;
  name: string;
};

type Props = {
  techs: Tech[];
  techCat: ReturnType<typeof useTechAndCategory>;
};

export function TechSelector({ techs, techCat }: Props) {
  return (
    <div className="space-y-3">
      <label className="admin-label">Tech Stack</label>

      {/* SELECTED */}
      <div className="flex flex-wrap gap-2 min-h-[32px]">
        {techCat.selectedTechs.length === 0 && (
          <span className="text-gray-400 text-sm">
            Belum ada teknologi dipilih
          </span>
        )}

        {techCat.selectedTechs.map((id) => {
          const tech = techs.find((t) => t.id === id);

          return (
            <span
              key={id}
              className="flex items-center gap-1 px-2 py-1 text-xs bg-[#54ACBF]/10 text-[#023859] rounded-md"
            >
              {tech?.name}

              <button
                onClick={() => techCat.toggleTech(id)}
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
        {techs.length === 0 ? (
          <div className="w-full flex items-center justify-between text-sm text-gray-400">
            <span>Belum ada data teknologi</span>

            <button
              type="button"
              className="text-[#54ACBF] hover:underline text-xs"
              onClick={() => (window.location.href = "/admin/tech")}
            >
              + Tambah
            </button>
          </div>
        ) : (
          techs.map((tech) => (
            <button
              key={tech.id}
              onClick={() => techCat.toggleTech(tech.id)}
              className={`px-3 py-1 rounded-lg text-sm border transition ${
                techCat.isTechSelected(tech.id)
                  ? "bg-[#54ACBF] text-white border-[#54ACBF]"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tech.name}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
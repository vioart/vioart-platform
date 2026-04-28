import { useFeatures } from "@/hooks/useFeatures";
import { Plus, Trash } from "lucide-react";

type Props = {
  feature: ReturnType<typeof useFeatures>;
};

export function ProjectFeatures({ feature }: Props) {
  return (
    <div className="space-y-5">
      <h2 className="text-base font-semibold text-[#023859] border-b pb-2">
        Fitur Project
      </h2>

      <p className="text-sm text-gray-500">
        Tambahkan fitur utama dari project ini (bisa lebih dari satu)
      </p>

      <div className="space-y-3">
        {feature.features.map((f, i) => (
          <div
            key={i}
            className="flex items-start gap-3 p-3 border rounded-xl bg-white"
          >
            {/* INPUT */}
            <div className="flex-1 space-y-1">
              <label className="admin-label">Fitur {i + 1}</label>
              <input
                value={f}
                onChange={(e) => feature.updateFeature(e.target.value, i)}
                className="admin-input"
                placeholder="Contoh: Sistem login dengan JWT"
              />
            </div>

            {/* DELETE */}
            <button
              onClick={() => feature.removeFeature(i)}
              className="mt-6 p-2 rounded-lg text-red-500 hover:bg-red-50 transition"
            >
              <Trash size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* ADD */}
      <button
        onClick={feature.addFeature}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#54ACBF] text-white hover:bg-[#26658C] transition shadow-sm"
      >
        <Plus size={16} />
        Tambah Fitur
      </button>
    </div>
  );
}
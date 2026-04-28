import { useImages } from "@/hooks/useImages";
import { UploadCloud, X } from "lucide-react";

type Props = {
  image: ReturnType<typeof useImages>;
  onUpload: (files: FileList) => void;
  onDrop: (files: FileList) => void;
};

export function ProjectMedia({ image, onUpload, onDrop }: Props) {
  return (
    <div className="space-y-5">
      <h2 className="text-base font-semibold text-[#023859] border-b pb-2">
        Media
      </h2>

      {/* UPLOAD AREA */}
      <label
        className="block border-2 border-dashed border-[#54ACBF]/50 rounded-2xl p-8 text-center bg-[#54ACBF]/5 hover:bg-[#54ACBF]/10 transition cursor-pointer"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          onDrop(e.dataTransfer.files);
        }}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-[#54ACBF]/20 flex items-center justify-center">
            <UploadCloud className="text-[#26658C]" size={26} />
          </div>

          <p className="text-sm font-medium text-gray-700">
            Klik untuk upload atau drag & drop
          </p>

          <p className="text-xs text-gray-400">
            Hanya gambar (PNG, JPG, WEBP)
          </p>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => e.target.files && onUpload(e.target.files)}
            className="hidden"
          />
        </div>
      </label>

      {/* LIST */}
      <div className="space-y-3">
        {image.images.map((img, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-3 border rounded-xl bg-white shadow-sm"
          >
            <img
              src={img.preview}
              className="w-14 h-14 object-cover rounded-lg border"
            />

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">
                {img.file?.name || "image"}
              </p>

              <div className="w-full h-1.5 bg-gray-200 rounded-full mt-2">
                <div
                  className="h-full bg-[#54ACBF] rounded-full transition-all"
                  style={{ width: `${img.progress}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => image.setPrimary(i)}
                className={`text-xs px-3 py-1.5 rounded-lg ${
                  img.is_primary
                    ? "bg-[#54ACBF] text-white"
                    : "border border-gray-300 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {img.is_primary ? "Utama" : "Set Utama"}
              </button>

              <button
                onClick={() => image.remove(i)}
                className="p-2 rounded-lg text-gray-400 hover:text-red-500"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
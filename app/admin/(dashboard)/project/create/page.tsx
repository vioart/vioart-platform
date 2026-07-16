"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProjectForm } from "@/hooks/useProjectForm";
import { useImages } from "@/hooks/useImages";
import { useFeatures } from "@/hooks/useFeatures";
import { useTechAndCategory } from "@/hooks/useTechAndCategory";
import { ProjectInfo } from "@/components/admin/project/ProjectInfo";
import { ProjectMedia } from "@/components/admin/project/ProjectMedia";
import { ProjectDetail } from "@/components/admin/project/ProjectDetail";
import { ProjectFeatures } from "@/components/admin/project/ProjectFeatures";
import { TechSelector } from "@/components/admin/project/TechSelector";
import { CategorySelector } from "@/components/admin/project/CategorySelector";
import { toast } from "sonner";

type Tech = {
  id: number;
  name: string;
};

type Category = {
  id: number;
  name: string;
  slug: string;
};

export default function CreateProjectPage() {
  const router = useRouter();
  const form = useProjectForm();
  const image = useImages();
  const feature = useFeatures();
  const techCat = useTechAndCategory();
  const [techs, setTechs] = useState<Tech[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const [techRes, catRes] = await Promise.all([
        fetch("/api/admin/tech"),
        fetch("/api/admin/category"),
      ]);

      const techData: Tech[] = await techRes.json();
      const catData: Category[] = await catRes.json();

      setTechs(techData);
      setCategories(catData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    return () => {
      image.images.forEach((img) => URL.revokeObjectURL(img.preview));
    };
  }, [image.images]);

  const handleSubmit = async () => {
    if (saving) return;

    setSaving(true);

    try {
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("slug", form.slug);
      formData.append("project_url", form.url);
      formData.append("description", form.description);
      formData.append("is_featured", String(form.isFeatured));
      formData.append("problem", form.problem);
      formData.append("solution", form.solution);

      feature.features.forEach((f) => {
        formData.append("features[]", f);
      });

      techCat.selectedTechs.forEach((id) => {
        formData.append("tech_ids[]", String(id));
      });

      techCat.selectedCategories.forEach((id) => {
        formData.append("category_ids[]", String(id));
      });

      image.images.forEach((img) => {
        if (!img.file && img.preview.startsWith("/api/files/temp/")) {
          formData.append("temp_images[]", img.preview);
          formData.append("is_primary[]", String(img.is_primary));
        }
      });

      const res = await fetch("/api/admin/project", {
        method: "POST",
        body: formData,
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        toast.error(
          data?.error ??
            data?.message ??
            "Gagal menambahkan project. Silakan coba lagi.",
        );
        return;
      }

      toast.success("Project berhasil ditambahkan.");

      setTimeout(() => {
        router.push("/admin/project");
      }, 800);
    } catch (error) {
      console.error(error);

      toast.error("Terjadi kesalahan pada server.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#023859]">
          Tambah Project
        </h1>
        <p className="text-sm text-gray-500">
          Isi informasi lengkap project yang akan ditampilkan
        </p>
      </div>

      {/* MAIN CARD */}
      <div className="bg-white rounded-2xl border shadow-sm p-8 space-y-10">
        {/* 1. INFO */}
        <ProjectInfo form={form} />

        {/* 2. MEDIA */}
        <ProjectMedia
          image={image}
          onUpload={(files) => image.addImages(files)}
          onDrop={(files) => image.addImages(files)}
        />

        {/* 3. DETAIL */}
        <ProjectDetail form={form} />

        {/* 4. FEATURES */}
        <ProjectFeatures feature={feature} />

        {/* SECTION 5 */}
        <div className="space-y-6">
          <h2 className="text-base font-semibold text-[#023859] border-b pb-2">
            Teknologi & Kategori
          </h2>

          <p className="text-sm text-gray-500">
            Pilih teknologi yang digunakan dan kategori project
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <TechSelector techs={techs} techCat={techCat} />
            <CategorySelector categories={categories} techCat={techCat} />
          </div>
        </div>

        {/* ACTION */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            onClick={() => router.push("/admin/project")}
            className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
          >
            Batal
          </button>

          <button
            onClick={handleSubmit}
            disabled={saving}
            className="px-5 py-2 bg-[#54ACBF] text-white rounded-lg hover:bg-[#26658C] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Menyimpan..." : "Simpan Project"}
          </button>
        </div>
      </div>
    </div>
  );
}

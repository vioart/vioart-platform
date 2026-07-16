"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

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

type Tech = { id: number; name: string };
type Category = { id: number; name: string; slug: string };

type ProjectResponse = {
  id: number;
  title: string;
  slug: string;
  project_url: string;
  description: string;
  is_featured: boolean;

  details?: {
    problem?: string;
    solution?: string;
  };

  features: {
    id: number;
    content: string;
  }[];

  techs: {
    tech: {
      id: number;
      name: string;
    };
  }[];

  categories: {
    category: {
      id: number;
      name: string;
      slug: string;
    };
  }[];

  images: {
    id: number;
    image_url: string;
    is_primary: boolean;
  }[];
};

export default function EditProjectPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const router = useRouter();

  const form = useProjectForm();
  const image = useImages();
  const feature = useFeatures();
  const techCat = useTechAndCategory();

  const [techs, setTechs] = useState<Tech[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // FETCH MASTER DATA
  useEffect(() => {
    const fetchMaster = async () => {
      const [techRes, catRes] = await Promise.all([
        fetch("/api/admin/tech"),
        fetch("/api/admin/category"),
      ]);

      setTechs(await techRes.json());
      setCategories(await catRes.json());
    };

    fetchMaster();
  }, []);

  // FETCH PROJECT BY ID
  useEffect(() => {
    if (!id) return;

    const fetchProject = async () => {
      const res = await fetch(`/api/admin/project/${id}`);
      if (!res.ok) {
        console.error("API ERROR:", await res.text());
        return;
      }

      const data: ProjectResponse = await res.json();

      form.setTitle(data.title);
      form.setSlug(data.slug);
      form.setUrl(data.project_url);
      form.setDescription(data.description);
      form.setIsFeatured(data.is_featured);
      form.setProblem(data.details?.problem || "");
      form.setSolution(data.details?.solution || "");

      feature.setFeatures(data.features.map((f) => f.content));

      techCat.setSelectedTechs(data.techs.map((t) => t.tech.id));

      techCat.setSelectedCategories(data.categories.map((c) => c.category.id));

      image.setImages(
        data.images.map((img) => ({
          uid:
            typeof crypto !== "undefined" && crypto.randomUUID
              ? crypto.randomUUID()
              : Math.random().toString(36).substring(2),

          id: img.id,
          file: null,
          preview: img.image_url,
          is_primary: img.is_primary,
          progress: 100,
        })),
      );

      setLoading(false);
    };

    fetchProject();
  }, [id]);

  // UPDATE
  const handleUpdate = async () => {
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

      feature.features.forEach((f) => formData.append("features[]", f));

      techCat.selectedTechs.forEach((id) =>
        formData.append("tech_ids[]", String(id)),
      );

      techCat.selectedCategories.forEach((id) =>
        formData.append("category_ids[]", String(id)),
      );

      image.deletedIds.forEach((id) => {
        formData.append("delete_image_ids[]", String(id));
      });

      image.images.forEach((img) => {
        if (!img.id && img.preview.startsWith("/api/files/temp/")) {
          formData.append("temp_images[]", img.preview);
          formData.append("is_primary[]", String(img.is_primary));
        }
      });

      const res = await fetch(`/api/admin/project/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
        const error = await res.json().catch(() => null);

        toast.error(
          error?.error ??
            error?.message ??
            "Gagal memperbarui project. Silakan coba lagi.",
        );

        return;
      }

      toast.success("Project berhasil diperbarui.");

      router.push("/admin/project");
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan pada server.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#023859]">Edit Project</h1>
        <p className="text-sm text-gray-500">Perbarui informasi project</p>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm p-8 space-y-10">
        <ProjectInfo form={form} />

        <ProjectMedia
          image={image}
          onUpload={(files) => image.addImages(files)}
          onDrop={(files) => image.addImages(files)}
        />

        <ProjectDetail form={form} />
        <ProjectFeatures feature={feature} />

        <div className="space-y-6">
          <h2 className="text-base font-semibold text-[#023859] border-b pb-2">
            Teknologi & Kategori
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <TechSelector techs={techs} techCat={techCat} />
            <CategorySelector categories={categories} techCat={techCat} />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            onClick={() => router.push("/admin/project")}
            className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
          >
            Batal
          </button>

          <button
            disabled={saving}
            onClick={handleUpdate}
            className="px-5 py-2 bg-[#54ACBF] text-white rounded-lg hover:bg-[#26658C]"
          >
            {saving ? "Menyimpan..." : "Update Project"}
          </button>
        </div>
      </div>
    </div>
  );
}

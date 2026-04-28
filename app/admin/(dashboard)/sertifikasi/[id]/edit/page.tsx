"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { useCertificationForm } from "@/hooks/useCertificationForm";
import { useImages } from "@/hooks/useImages";
import { useTechAndCategory } from "@/hooks/useTechAndCategory";

import { FormField } from "@/components/ui/form/formField";
import { FormGridField } from "@/components/ui/form/formGridField";
import { FormTextarea } from "@/components/ui/form/formTextArea";
import { FormSwitch } from "@/components/ui/form/formSwitch";
import { FormImageUpload } from "@/components/ui/form/formImageUpload";
import { FormListField } from "@/components/ui/form/formListField";
import { FormMultiSelector } from "@/components/ui/form/formMultiSelector";

import { Category } from "@/types/category";

type CertificationResponse = {
  id: number;
  title: string;
  slug: string;
  issuer?: string;
  year?: number;
  description?: string;
  source_url?: string;
  is_featured: boolean;

  skills: {
    id: number;
    skill: string;
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
  }[];
};

export default function EditProjectPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const router = useRouter();

  const form = useCertificationForm();
  const techCat = useTechAndCategory();
  const image = useImages();

  const [categories, setCategories] = useState<Category[]>([]);
  const [skills, setSkills] = useState<string[]>([""]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/category")
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      const res = await fetch(`/api/admin/sertifikasi/${id}`);
      const data: CertificationResponse = await res.json();

      form.setAll({
        title: data.title,
        slug: data.slug,
        issuer: data.issuer || "",
        year: data.year ?? "",
        description: data.description || "",
        sourceUrl: data.source_url || "",
        isFeatured: data.is_featured,
      });

      setSkills(data.skills.map((s) => s.skill));

      techCat.setSelectedCategories(data.categories.map((c) => c.category.id));

      image.setImages(
        data.images.map((img) => ({
          uid: crypto.randomUUID(),
          id: img.id,
          file: null,
          preview: img.image_url,
          is_primary: false,
          progress: 100,
        })),
      );

      setLoading(false);
    };

    fetchData();
  }, [id]);

  const handleSkillChange = (value: string, index: number) => {
    const updated = [...skills];
    updated[index] = value;
    setSkills(updated);
  };

  const addSkill = () => setSkills([...skills, ""]);

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleUpdate = async () => {
    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("slug", form.slug);
    formData.append("issuer", form.issuer);
    formData.append("year", String(form.year));
    formData.append("description", form.description);
    formData.append("source_url", form.sourceUrl);
    formData.append("is_featured", String(form.isFeatured));

    skills.forEach((s) => formData.append("skills[]", s));

    techCat.selectedCategories.forEach((id) => {
      formData.append("category_ids[]", String(id));
    });

    image.deletedIds.forEach((id) => {
      formData.append("delete_image_ids[]", String(id));
    });

    image.images.forEach((img) => {
      if (!img.file && img.preview.includes("/uploads/temp")) {
        formData.append("temp_images[]", img.preview);
      }
    });

    const res = await fetch(`/api/admin/sertifikasi/${id}`, {
      method: "PUT",
      body: formData,
    });

    if (res.ok) {
      alert("Berhasil update sertifikasi");
      router.push("/admin/sertifikasi");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#023859]">
          Edit sertifikasi
        </h1>
        <p className="text-sm text-gray-500">Perbarui informasi sertifikasi</p>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm p-8 space-y-10">
        <div className="space-y-5">
          <h2 className="text-base font-semibold text-[#023859] border-b pb-2">
            Informasi Sertifikat
          </h2>

          <FormGridField
            left={{
              label: "Judul Sertifikat",
              value: form.title,
              onChange: form.handleTitleChange,
            }}
            right={{
              label: "Slug",
              value: form.slug,
              onChange: form.setSlug,
            }}
          />

          <div className="grid md:grid-cols-2 gap-5">
            <FormField
              label="Tahun"
              value={form.year}
              onChange={form.setYear}
              type="number"
            />
            <FormField
              label="Issuer"
              value={form.issuer}
              onChange={form.setIssuer}
            />
          </div>

          <FormTextarea
            label="Deskripsi Sertifikat"
            value={form.description}
            onChange={form.setDescription}
          />

          <FormField
            label="URL Sertifikat"
            value={form.sourceUrl}
            onChange={form.setSourceUrl}
          />

          <FormSwitch
            label="Sertifikat Unggulan"
            description="Akan ditampilkan di highlight"
            checked={form.isFeatured}
            onChange={form.setIsFeatured}
          />

          <FormMultiSelector
            label="Kategori"
            items={categories}
            selected={techCat.selectedCategories}
            onToggle={techCat.toggleCategory}
            isSelected={techCat.isCategorySelected}
          />

          <FormImageUpload
            title="Gambar Sertifikat"
            images={image.images}
            setPrimary={image.setPrimary}
            remove={image.remove}
            onUpload={image.addImages}
            onDrop={image.addImages}
          />

          <FormListField
            title="Skill"
            items={skills}
            onAdd={addSkill}
            onRemove={removeSkill}
            onChange={handleSkillChange}
            labelPrefix="Skill"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            onClick={() => router.push("/admin/sertifikasi")}
            className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
          >
            Batal
          </button>

          <button
            onClick={handleUpdate}
            className="px-5 py-2 bg-[#54ACBF] text-white rounded-lg hover:bg-[#26658C]"
          >
            Update Sertifikat
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useImages } from "@/hooks/useImages";
import { FormField } from "@/components/ui/form/formField";
import { FormGridField } from "@/components/ui/form/formGridField";
import { FormTextarea } from "@/components/ui/form/formTextArea";
import { FormSwitch } from "@/components/ui/form/formSwitch";
import { FormImageUpload } from "@/components/ui/form/formImageUpload";
import { FormListField } from "@/components/ui/form/formListField";
import { FormMultiSelector } from "@/components/ui/form/formMultiSelector";
import { useCertificationForm } from "@/hooks/useCertificationForm";
import { useTechAndCategory } from "@/hooks/useTechAndCategory";
import { Category } from "@/types/category";
import { toast } from "sonner";

export default function CreateCertificationPage() {
  const form = useCertificationForm();
  const techCat = useTechAndCategory();
  const router = useRouter();
  const image = useImages();

  const [categories, setCategories] = useState<Category[]>([]);
  const [skills, setSkills] = useState<string[]>([""]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/category")
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  useEffect(() => {
    return () => {
      image.images.forEach((img) => URL.revokeObjectURL(img.preview));
    };
  }, [image.images]);

  const handleSkillChange = (value: string, index: number) => {
    const updated = [...skills];
    updated[index] = value;
    setSkills(updated);
  };

  const addSkill = () => setSkills([...skills, ""]);
  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (saving) return;

    setSaving(true);

    try {
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("slug", form.slug);
      formData.append("issuer", form.issuer);
      formData.append("year", String(form.year));
      formData.append("description", form.description);
      formData.append("source_url", form.sourceUrl);
      formData.append("is_featured", String(form.isFeatured));

      skills.forEach((skill) => {
        formData.append("skills[]", skill);
      });

      techCat.selectedCategories.forEach((id) => {
        formData.append("category_ids[]", String(id));
      });

      image.images.forEach((img) => {
        if (!img.file && img.preview.startsWith("/api/files/temp/")) {
          formData.append("temp_images[]", img.preview);
        }
      });

      const res = await fetch("/api/admin/sertifikasi", {
        method: "POST",
        body: formData,
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        toast.error(
          data?.error ?? data?.message ?? "Gagal menambahkan sertifikasi.",
        );

        return;
      }

      toast.success("Sertifikasi berhasil ditambahkan.");

      setTimeout(() => {
        router.push("/admin/sertifikasi");
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
          Tambah sertifikasi
        </h1>
        <p className="text-sm text-gray-500">
          Isi data sertifikasi yang akan ditampilkan
        </p>
      </div>

      {/* CARD */}
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
              placeholder="2024"
            />
            <FormField
              label="Issuer"
              value={form.issuer}
              onChange={form.setIssuer}
              type="text"
            />
          </div>

          <FormTextarea
            label="Deskripsi Sertifikat"
            value={form.description}
            onChange={form.setDescription}
          />

          <FormField
            label="URL Project"
            value={form.sourceUrl}
            onChange={form.setSourceUrl}
            placeholder="https://example.com"
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

        {/* ACTION */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            onClick={() => router.push("/admin/sertifikasi")}
            className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
          >
            Batal
          </button>

          <button
            onClick={handleSubmit}
            disabled={saving}
            className="px-5 py-2 bg-[#54ACBF] text-white rounded-lg hover:bg-[#26658C] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Menyimpan..." : "Simpan Sertifikat"}
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { FormField } from "@/components/ui/form/formField";
import { FormTextarea } from "@/components/ui/form/formTextArea";
import { FormListField } from "@/components/ui/form/formListField";

import { useExperienceForm } from "@/hooks/useExperienceForm";

export default function CreateExperiencePage() {
  const router = useRouter();
  const form = useExperienceForm();

  const [points, setPoints] = useState<string[]>([""]);

  const handlePointChange = (value: string, index: number) => {
    const updated = [...points];
    updated[index] = value;
    setPoints(updated);
  };

  const addPoint = () => {
    setPoints([...points, ""]);
  };

  const removePoint = (index: number) => {
    setPoints(points.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("company", form.company);
      formData.append("type", form.type);
      formData.append("start_date", form.startDate);
      formData.append("end_date", form.endDate);
      formData.append("certificate_url", form.certificateUrl);
      formData.append("description", form.description);

      points
        .filter((p) => p.trim() !== "")
        .forEach((point) => {
          formData.append("points[]", point);
        });

      const res = await fetch("/api/admin/pengalaman", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
      } else {
        alert("Berhasil tambah pengalaman");
        router.push("/admin/pengalaman");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan");
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#023859]">
          Tambah Pengalaman
        </h1>

        <p className="text-sm text-gray-500">
          Isi informasi pengalaman yang akan ditampilkan
        </p>
      </div>

      {/* CARD */}
      <div className="bg-white rounded-2xl border shadow-sm p-8 space-y-10">
        {/* INFORMASI */}
        <div className="space-y-5">
          <h2 className="text-base font-semibold text-[#023859] border-b pb-2">
            Informasi Pengalaman
          </h2>

          <FormField
            label="Judul Pengalaman"
            value={form.title}
            onChange={form.setTitle}
            placeholder="Contoh: Backend Developer Intern"
          />

          <div className="grid md:grid-cols-2 gap-5">
            <FormField
              label="Perusahaan"
              value={form.company}
              onChange={form.setCompany}
              placeholder="PT ABC Indonesia"
            />

            <FormField
              label="Jenis Pengalaman"
              value={form.type}
              onChange={form.setType}
              placeholder="Internship / Freelance / Fulltime"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <FormField
              label="Tanggal Mulai"
              value={form.startDate}
              onChange={form.setStartDate}
              type="date"
            />

            <FormField
              label="Tanggal Selesai"
              value={form.endDate}
              onChange={form.setEndDate}
              type="date"
            />
          </div>

          <FormField
            label="URL Sertifikat"
            value={form.certificateUrl}
            onChange={form.setCertificateUrl}
            placeholder="https://example.com/certificate"
          />

          <FormTextarea
            label="Deskripsi Pengalaman"
            value={form.description}
            onChange={form.setDescription}
            placeholder="Jelaskan pengalaman yang pernah dilakukan..."
          />
        </div>

        {/* POINT */}
        <FormListField
          title="Poin Pengalaman"
          description="Tambahkan pencapaian atau tanggung jawab selama menjalani pengalaman ini."
          items={points}
          onAdd={addPoint}
          onRemove={removePoint}
          onChange={handlePointChange}
          labelPrefix="Poin"
          placeholder="Contoh: Mengembangkan REST API menggunakan Laravel"
        />

        {/* ACTION */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            onClick={() => router.push("/admin/pengalaman")}
            className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100 transition"
          >
            Batal
          </button>

          <button
            onClick={handleSubmit}
            className="px-5 py-2 bg-[#54ACBF] text-white rounded-lg hover:bg-[#26658C] transition"
          >
            Simpan Pengalaman
          </button>
        </div>
      </div>
    </div>
  );
}
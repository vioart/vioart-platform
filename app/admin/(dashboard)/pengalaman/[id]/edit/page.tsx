"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { useExperienceForm } from "@/hooks/useExperienceForm";

import { FormField } from "@/components/ui/form/formField";
import { FormTextarea } from "@/components/ui/form/formTextArea";
import { FormListField } from "@/components/ui/form/formListField";

type ExperienceResponse = {
  id: number;
  title: string;
  company?: string;
  type?: string;
  start_date?: string;
  end_date?: string;
  certificate_url?: string;
  description?: string;

  points: {
    id: number;
    content: string;
  }[];
};

export default function EditExperiencePage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const router = useRouter();
  const form = useExperienceForm();

  const [points, setPoints] = useState<string[]>([""]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      const res = await fetch(`/api/admin/pengalaman/${id}`);
      const data: ExperienceResponse = await res.json();

      form.setAll({
        title: data.title,
        company: data.company ?? "",
        type: data.type ?? "",
        startDate: data.start_date
          ? data.start_date.slice(0, 10)
          : "",
        endDate: data.end_date
          ? data.end_date.slice(0, 10)
          : "",
        certificateUrl: data.certificate_url ?? "",
        description: data.description ?? "",
      });

      if (data.points.length > 0) {
        setPoints(data.points.map((p) => p.content));
      }

      setLoading(false);
    };

    fetchData();
  }, [id]);

  const handlePointChange = (
    value: string,
    index: number,
  ) => {
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

  const handleUpdate = async () => {
    try {
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("company", form.company);
      formData.append("type", form.type);
      formData.append("start_date", form.startDate);
      formData.append("end_date", form.endDate);
      formData.append(
        "certificate_url",
        form.certificateUrl,
      );
      formData.append(
        "description",
        form.description,
      );

      points
        .filter((p) => p.trim() !== "")
        .forEach((point) => {
          formData.append("points[]", point);
        });

      const res = await fetch(
        `/api/admin/pengalaman/${id}`,
        {
          method: "PUT",
          body: formData,
        },
      );

      if (!res.ok) {
        const data = await res.json();
        alert(data.error);
        return;
      }

      alert("Berhasil update pengalaman");
      router.push("/admin/pengalaman");
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

    return (
    <div className="w-full max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#023859]">
          Edit Pengalaman
        </h1>

        <p className="text-sm text-gray-500">
          Perbarui informasi pengalaman
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
            onClick={handleUpdate}
            className="px-5 py-2 bg-[#54ACBF] text-white rounded-lg hover:bg-[#26658C] transition"
          >
            Update Pengalaman
          </button>
        </div>
      </div>
    </div>
  );
}
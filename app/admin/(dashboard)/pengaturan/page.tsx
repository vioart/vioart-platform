"use client";

import { useEffect, useState } from "react";
import { Admin } from "@/types/admin";

export default function SettingsPage() {
  const [data, setData] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    fetch("/api/admin/pengaturan")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setName(res.name || "");
        setEmail(res.email);
        setPreview(res.avatar_url || null);
        setLoading(false);
      });
  }, []);

  const handleAvatar = (file: File) => {
    setAvatar(file);
    setPreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  function getFileNameFromUrl(url: string) {
    return url.split("/").pop() || "avatar";
  }

  function truncate(text: string, length = 20) {
    if (text.length <= length) return text;
    return text.slice(0, length) + "...";
  }

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);

    if (avatar) {
      formData.append("avatar", avatar);
    }

    if (password) {
      formData.append("password", password);
      formData.append("confirmPassword", confirmPassword);
    }

    if (password && password !== confirmPassword) {
      alert("Konfirmasi password tidak cocok");
      return;
    }

    setSaving(true);

    const res = await fetch("/api/admin/pengaturan", {
      method: "PUT",
      body: formData,
    });

    setSaving(false);

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Gagal update");
      return;
    }

    alert("Berhasil update");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-xl font-semibold text-gray-800">Pengaturan Akun</h1>

      <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-5">
        {/* AVATAR */}
        <div className="flex items-center gap-4">
          {/* PREVIEW */}
          <div className="w-16 h-16 rounded-full overflow-hidden border bg-gray-100">
            <img
              src={preview || "/images/profile.png"}
              className="w-full h-full object-cover"
            />
          </div>

          {/* FILE INPUT STYLE */}
          <div className="flex items-center gap-3">
            {/* BUTTON */}
            <label className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition text-gray-800 text-sm">
              {/* ICON */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M12 4v12m0 0l-3-3m3 3l3-3"
                />
              </svg>
              Pilih File
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleAvatar(file);
                  }
                }}
              />
            </label>

            {/* FILE NAME */}
            <span className="text-sm text-gray-700">
              {avatar
                ? truncate(avatar.name, 30)
                : preview
                  ? truncate(getFileNameFromUrl(preview), 30)
                  : "Tidak ada file"}
            </span>
          </div>
        </div>

        {/* NAME */}
        <div>
          <label className="text-sm text-gray-700">Nama</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded-lg text-gray-700  placeholder:text-gray-700
              focus:ring-2 focus:ring-[#54ACBF]/40
              focus:border-[#54ACBF]
              outline-none transition"
          />
        </div>

        {/* EMAIL */}
        <div>
          <label className="text-sm text-gray-700">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded-lg text-gray-700  placeholder:text-gray-700
              focus:ring-2 focus:ring-[#54ACBF]/40
              focus:border-[#54ACBF]
              outline-none transition"
          />
        </div>

        {/* PASSWORD */}
        <div>
          <label className="text-sm text-gray-700">Password Baru</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Kosongkan jika tidak ingin mengubah"
            className="w-full mt-1 px-3 py-2 border rounded-lg text-gray-700
      focus:ring-2 focus:ring-[#54ACBF]/40
      focus:border-[#54ACBF]
      outline-none transition"
          />
        </div>

        {/* CONFIRM PASSWORD */}
        <div>
          <label className="text-sm text-gray-700">Konfirmasi Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded-lg text-gray-700
      focus:ring-2 focus:ring-[#54ACBF]/40
      focus:border-[#54ACBF]
      outline-none transition"
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="px-4 py-2 bg-[#54ACBF] text-white rounded-xl hover:bg-[#26658C] transition"
        >
          {saving ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </div>
    </div>
  );
}

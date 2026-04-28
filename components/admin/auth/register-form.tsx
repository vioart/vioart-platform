"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showCfm, setShowCfm] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = (v: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const strength = useMemo(() => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score; // 0-4
  }, [password]);

  const strengthLabel = ["Weak", "Fair", "Good", "Strong", "Very strong"][strength];
  const strengthColor = ["bg-red-400","bg-orange-400","bg-yellow-400","bg-blue-500","bg-green-500"][strength];

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) return setError("Nama wajib diisi");
    if (!validateEmail(email)) return setError("Format email tidak valid");
    if (password.length < 8) return setError("Password minimal 8 karakter");
    if (password !== confirm) return setError("Konfirmasi password tidak cocok");

    setLoading(true);

    const res = await fetch("/api/admin/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Gagal register");
    } else {
      // setelah berhasil, kamu bisa redirect atau tampilkan sukses
      window.location.href = "/admin/login";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-white/10"
    >
      <div className="grid md:grid-cols-2 min-h-[560px]">

        {/* LEFT — Branding */}
        <div className="relative bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-700 p-12 flex flex-col justify-between text-white">
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-[-80px] right-[-80px] w-80 h-80 bg-black/20 rounded-full blur-3xl" />

          <div className="relative space-y-6">
            <h2 className="text-4xl font-bold leading-tight">
              Create Admin
            </h2>
            <p className="text-sm text-white/85 max-w-sm leading-relaxed">
              Buat akun admin untuk mengelola project, sertifikasi, dan pengalaman.
              Halaman ini hanya untuk setup awal.
            </p>
          </div>

          <div className="relative text-xs text-white/70">
            © 2026 Vioart Platform
          </div>
        </div>

        {/* RIGHT — Form putih */}
        <div className="bg-white text-black p-12 flex flex-col justify-center">
          <div className="space-y-8 w-full max-w-md mx-auto">

            <div className="space-y-1">
              <h1 className="text-3xl font-semibold">Register Admin</h1>
              <p className="text-sm text-gray-500">
                Isi data untuk membuat akun admin
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-5">

              {/* Name */}
              <input
                type="text"
                placeholder="Full name"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                onChange={(e) => setName(e.target.value)}
              />

              {/* Email */}
              <input
                type="email"
                placeholder="Email address"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                onChange={(e) => setEmail(e.target.value)}
              />

              {/* Password */}
              <div className="space-y-2">
                <div className="relative">
                  <input
                    type={showPwd ? "text" : "password"}
                    placeholder="Password"
                    className="w-full px-4 pr-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(!showPwd)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {/* Strength bar */}
                <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${strengthColor} transition-all`}
                    style={{ width: `${(strength / 4) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Strength: <span className="font-medium">{strengthLabel}</span>
                </p>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <input
                  type={showCfm ? "text" : "password"}
                  placeholder="Confirm password"
                  className="w-full px-4 pr-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                  onChange={(e) => setConfirm(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowCfm(!showCfm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showCfm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Error */}
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              {/* Submit */}
              <button
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:opacity-90 transition"
              >
                {loading ? "Creating account..." : "Create Admin"}
              </button>

              {/* Note */}
              <p className="text-[11px] text-gray-400 text-center">
                Halaman ini sebaiknya dinonaktifkan setelah akun admin dibuat.
              </p>
            </form>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
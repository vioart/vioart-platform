"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!validateEmail(email)) {
      setLoading(false);
      return setError("Format email tidak valid");
    }

    if (password.length < 6) {
      setLoading(false);
      return setError("Password minimal 6 karakter");
    }

    const res = await fetch("/api/admin/login", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error);
    } else {
      window.location.href = "/admin";
    }
  };

  return (
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  className="w-full max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-white/10"
>
  <div className="grid md:grid-cols-2 min-h-[520px]">

    {/* LEFT */}
    <div className="relative bg-gradient-to-br from-blue-600 to-purple-700 p-12 flex flex-col justify-between text-white">

      {/* glow effect */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

      <div className="relative space-y-6">
        <h2 className="text-4xl font-bold leading-tight">
          Vioart Admin
        </h2>

        <p className="text-sm text-white/80 max-w-sm leading-relaxed">
          Kelola project, sertifikasi, dan pengalaman dalam satu dashboard modern yang powerful.
        </p>
      </div>

      <div className="relative text-xs text-white/60">
        © 2026 Vioart Platform
      </div>
    </div>

    {/* RIGHT */}
    <div className="bg-white text-black p-12 flex flex-col justify-center">

      <div className="space-y-8 w-full max-w-sm mx-auto">

        <div className="space-y-1">
          <h1 className="text-3xl font-semibold">Welcome back</h1>
          <p className="text-sm text-gray-500">
            Please login to continue
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">

          {/* Email */}
          <input
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          {/* Button */}
          <button
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:opacity-90 transition"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

      </div>
    </div>

  </div>
</motion.div>
  );
}
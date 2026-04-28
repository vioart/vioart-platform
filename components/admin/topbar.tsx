"use client";

import { Search, Bell } from "lucide-react";
import { useState, useEffect } from "react";
import ConfirmModal from "@/components/ui/confirm-modal";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function Topbar() {
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const pathname = usePathname();
  const [user, setUser] = useState<{
    name?: string;
    email: string;
    avatar_url?: string;
  } | null>(null);

  useEffect(() => {
    fetch("/api/admin/pengaturan")
      .then((res) => res.json())
      .then((res) => setUser(res));
  }, []);

  const router = useRouter();

  const handleLogout = async () => {
    setConfirm(false);

    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });

      router.push("/admin/login");
    } catch (error) {
      console.error("Logout gagal:", error);
    }
  };

  function getTitle(path: string) {
    if (path === "/admin") return "Dashboard";
    if (path.startsWith("/admin/project")) return "Project";
    if (path.startsWith("/admin/sertifikasi")) return "Sertifikasi";
    if (path.startsWith("/admin/pengalaman")) return "Pengalaman";
    if (path.startsWith("/admin/pengaturan")) return "Pengaturan";

    return "Dashboard";
  }

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 relative">
      {/* LEFT */}
      <div>
        <p className="text-lg font-semibold text-gray-800">
          {getTitle(pathname)}
        </p>
      </div>

      {/* 🔹 RIGHT */}
      <div className="flex items-center gap-4">
        {/* 🔍 SEARCH */}
        <div className="relative hidden md:block">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Cari..."
            className="pl-9 pr-3 py-2 text-sm text-gray-700 placeholder:text-gray-400 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:bg-white focus:ring-2 focus:ring-[#54ACBF]/40 transition"
          />
        </div>

        {/* 🔔 NOTIFIKASI */}
        <button className="relative p-2 rounded-lg hover:bg-gray-100 transition">
          <Bell size={18} className="text-gray-600" />

          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* 👤 PROFILE */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            <span className="text-sm text-gray-700 hidden sm:block">Admin</span>

            <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200">
              <img
                src={user?.avatar_url || "/images/profile.png"}
                className="w-full h-full object-cover"
              />
            </div>
          </button>

          {/* 🔽 DROPDOWN */}
          {open && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-10">
              <div className="px-4 py-3 border-b">
                <p className="text-sm font-medium text-gray-800">
                  {user?.name || "Admin"}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.email || "-"}
                </p>
              </div>

              <button
                onClick={() => {
                  setOpen(false);
                  setConfirm(true);
                }}
                className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition"
              >
                Keluar
              </button>
            </div>
          )}
        </div>
      </div>

      <ConfirmModal
        open={confirm}
        title="Konfirmasi Logout"
        description="Apakah kamu yakin ingin logout?"
        confirmText="Logout"
        cancelText="Batal"
        onCancel={() => setConfirm(false)}
        onConfirm={handleLogout}
      />
    </header>
  );
}

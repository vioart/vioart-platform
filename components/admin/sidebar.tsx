"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Folder,
  Award,
  Briefcase,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import ConfirmModal from "@/components/ui/confirm-modal";
import { useRouter } from "next/navigation";

const menu = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Project", href: "/admin/project", icon: Folder },
  { name: "Sertifikasi", href: "/admin/sertifikasi", icon: Award },
  { name: "Pengalaman", href: "/admin/pengalaman", icon: Briefcase },
];

type SidebarProps = {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [user, setUser] = useState<{
    name?: string;
    email: string;
    avatar_url?: string;
  } | null>(null);

  useEffect(() => {
    fetch("/api/admin/pengaturan")
      .then((res) => res.json())
      .then((res) => {
        setUser(res);
      });
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = async () => {
    setConfirm(false);

    try {
      const res = await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        setTimeout(() => {
          window.location.replace("/admin/login");
        }, 100);
      }
    } catch (error) {
      console.error("Logout gagal:", error);
    }
  };

  return (
    <aside
      className={`
        ${collapsed ? "w-20" : "w-64"}
        fixed top-0 left-0 h-screen
        bg-[#011C40] text-white flex flex-col
        transition-all duration-300 z-20
      `}
    >
      {/* LOGO */}
      <div className="flex items-center justify-between px-6 py-6">
        {!collapsed && (
          <span className="text-xl font-semibold text-[#A7EBF2]">Vioart</span>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-[#A7EBF2] hover:bg-white/10 p-2 rounded-lg transition"
        >
          <Menu size={18} />
        </button>
      </div>

      {/* MENU */}
      <div className="px-4">
        {!collapsed && (
          <p className="text-xs text-[#54ACBF]/70 uppercase tracking-wider mb-3">
            Menu
          </p>
        )}

        <nav className="space-y-1">
          {menu.map((item) => {
            const Icon = item.icon;
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  relative flex items-center
                  ${collapsed ? "justify-center px-2" : "gap-3 px-4"}
                  py-3 rounded-lg transition-all
                  ${
                    active
                      ? "bg-[#26658C] text-white"
                      : "text-[#A7EBF2]/70 hover:bg-[#023859] hover:text-white"
                  }
                `}
              >
                {active && (
                  <div className="absolute left-0 top-0 h-full w-1 bg-[#A7EBF2] rounded-r" />
                )}

                <Icon size={18} />

                {!collapsed && <span className="text-sm">{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* DIVIDER */}
      <div className="mx-4 my-6 border-t border-[#26658C]/30" />

      {/* GENERAL */}
      <div className="px-4">
        {/* TITLE */}
        {!collapsed && (
          <p className="text-xs text-[#54ACBF]/70 uppercase tracking-wider mb-3">
            General
          </p>
        )}

        {/* BUTTON */}
        <Link
          href="/admin/pengaturan"
          className={`
            w-full flex items-center
            ${collapsed ? "justify-center px-2" : "gap-3 px-4"}
            py-3 rounded-lg transition
            text-[#A7EBF2]/70 hover:bg-[#023859] hover:text-white
          `}
        >
          <Settings size={18} />

          {!collapsed && <span className="text-sm">Settings</span>}
        </Link>
      </div>

      {/* PUSH KE BAWAH */}
      <div className="flex-1" />

      {/* DIVIDER */}
      <div className="mx-4 mb-4 border-t border-[#26658C]/30" />

      {/* PROFILE */}
      <div className="px-3 pb-5" ref={ref}>
        <div
          onClick={() => setConfirm(true)}
          className="
            group
            relative rounded-xl p-3 border
            bg-[#023859] border-[#26658C]/30
            transition-all duration-200
            hover:bg-red-500/10
            hover:border-red-400/30
            cursor-pointer
          "
        >
          {/* PROFILE BUTTON */}
          <div
            className={`
              flex items-center w-full group
              ${collapsed ? "justify-center" : "gap-3"}
              cursor-pointer
            `}
          >
            {/* AVATAR / LOGOUT */}
            <div className="relative shrink-0">
              {/* AVATAR */}
              <div className="w-10 h-10 rounded-full overflow-hidden bg-[#54ACBF]">
                <img
                  src={user?.avatar_url || "/images/profile.png"}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* LOGOUT ICON */}
              <div
                className="
                  absolute inset-0 flex items-center justify-center
                  rounded-full bg-red-500 text-white
                  opacity-0 group-hover:opacity-100
                  transition-all duration-200
                "
              >
                <LogOut size={16} />
              </div>
            </div>

            {/* TEXT */}
            {!collapsed && (
              <div className="flex-1 min-w-0">
                {/* DEFAULT */}
                <div className="group-hover:hidden">
                  <p className="font-medium text-white truncate">
                    {user?.name || "Admin"}
                  </p>
                  <p className="text-xs text-[#A7EBF2]/60 truncate">
                    {user?.email || "-"}
                  </p>
                </div>

                {/* HOVER */}
                <div className="hidden group-hover:flex items-center h-full">
                  <p className="text-sm text-red-400 font-medium">Keluar</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* MODAL KONFIRMASI */}
        <ConfirmModal
          open={confirm}
          title="Konfirmasi Logout"
          description="Apakah kamu yakin ingin logout?"
          confirmText="Logout"
          cancelText="Batal"
          onCancel={() => setConfirm(false)}
          onConfirm={handleLogout}
        />
      </div>
    </aside>
  );
}

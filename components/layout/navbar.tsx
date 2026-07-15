"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const getNavClass = (path: string) =>
    `text-base font-medium tracking-wide transition duration-300 ${
      pathname === path
        ? "text-white"
        : "text-white/60 hover:text-white"
    }`;

  return (
    <header className="fixed top-6 left-0 w-full z-50">
      <div className="max-w-6xl mx-auto px-4">

        {/* ================= NAV ================= */}
        <nav
          className="
          bg-[#020617]/80 backdrop-blur-xl
          border border-white/10
          rounded-full
          px-6 md:px-10 py-3 md:py-4
          shadow-[0_10px_40px_rgba(0,0,0,0.5)]
        "
        >
          {/* ===== MOBILE ===== */}
          <div className="flex items-center justify-between md:hidden">

            {/* LOGO */}
            <div className="flex items-center gap-2 font-bold">
              <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-[2px]" />
              <span className="text-sm tracking-[0.2em] bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                Vioart
              </span>
            </div>

            {/* HAMBURGER */}
            <button onClick={() => setOpen(!open)}>
              {open ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>

          {/* ===== DESKTOP ===== */}
          <div className="hidden md:grid grid-cols-3 items-center">

            {/* LEFT */}
            <div className="flex justify-center gap-10 md:gap-16">
              <Link href="/" className={getNavClass("/")}>
                Home
              </Link>
              <Link href="/project" className={getNavClass("/project")}>
                Project
              </Link>
            </div>

            {/* CENTER */}
            <div className="flex items-center justify-center gap-3 font-bold">
              <div className="w-5 h-5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-[2px]" />
              <span className="text-lg md:text-xl tracking-[0.2em] bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 text-transparent bg-clip-text">
                Vioart
              </span>
            </div>

            {/* RIGHT */}
            <div className="flex justify-center gap-10 md:gap-16">
              <Link href="/certifications" className={getNavClass("/certifications")}>
                Sertifikasi
              </Link>
              <Link href="/experience" className={getNavClass("/experience")}>
                Pengalaman
              </Link>
            </div>
          </div>
        </nav>

        {/* ================= MOBILE DROPDOWN ================= */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="
              mt-3
              bg-[#020617]/95 backdrop-blur-xl
              border border-white/10
              rounded-2xl
              shadow-xl
              flex flex-col items-center gap-6 py-6
              md:hidden
            "
            >
              <Link href="/" onClick={() => setOpen(false)} className={getNavClass("/")}>
                Home
              </Link>

              <Link href="/project" onClick={() => setOpen(false)} className={getNavClass("/project")}>
                Project
              </Link>

              <Link href="/certifications" onClick={() => setOpen(false)} className={getNavClass("/certifications")}>
                Sertifikasi
              </Link>

              <Link href="/experience" onClick={() => setOpen(false)} className={getNavClass("/experience")}>
                Pengalaman
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </header>
  );
}
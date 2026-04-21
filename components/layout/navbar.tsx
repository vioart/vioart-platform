"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const getNavClass = (path: string) =>
    `relative transition duration-300
   after:absolute after:left-0 after:-bottom-1 after:h-[2px]
   after:bg-gradient-to-r after:from-blue-400 after:to-purple-500
   after:transition-all after:duration-300
   ${
     pathname === path
       ? "text-white after:w-full"
       : "text-gray-400/80 hover:text-white after:w-0 hover:after:w-full"
   }`;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${
          scrolled
            ? "bg-[#020617]/70 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
            : "bg-transparent"
        }

        before:absolute before:bottom-0 before:left-0 before:w-full before:h-px 
        before:bg-gradient-to-r before:from-transparent before:via-blue-500/30 before:to-transparent

        after:absolute after:inset-0 after:bg-gradient-to-r after:from-blue-500/5 after:to-purple-500/5 after:pointer-events-none
      `}
    >
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-4 py-5 md:py-6">
        <h1 className="text-lg md:text-xl font-medium tracking-[0.15em] bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 text-transparent bg-clip-text">
          Vio Arvendha
        </h1>

        <div className="flex gap-8 md:gap-10 items-center">
          <Link href="/" className={getNavClass("/")}>
            Home
          </Link>

          <Link href="/projects" className={getNavClass("/projects")}>
            Project
          </Link>

          <Link
            href="/certifications"
            className={getNavClass("/certifications")}
          >
            Sertifikasi
          </Link>

          <Link href="/experience" className={getNavClass("/experience")}>
            Pengalaman
          </Link>
        </div>
      </nav>
    </header>
  );
}

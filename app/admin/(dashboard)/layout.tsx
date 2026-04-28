"use client";

import { useState } from "react";
import Sidebar from "@/components/admin/sidebar";
import Topbar from "@/components/admin/topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="bg-gray-100 min-h-screen">

      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div
        className={`
          transition-all duration-300 flex flex-col min-h-screen
          ${collapsed ? "ml-20" : "ml-64"}
        `}
      >
        <Topbar />

        <main className="p-6 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
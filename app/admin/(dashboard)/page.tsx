"use client";

import { useEffect, useState } from "react";
import { Folder, Award, Briefcase, Activity, BarChart3 } from "lucide-react";
import { DashboardData } from "@/types/dashboard";

export default function DashboardPage() {
  const chart = [
    { month: "Jan", value: 0 },
    { month: "Feb", value: 1 },
    { month: "Mar", value: 1 },
    { month: "Apr", value: 1 },
    { month: "Mei", value: 0 },
    { month: "Jun", value: 0 },
    { month: "Jul", value: 0 },
    { month: "Agu", value: 0 },
    { month: "Sep", value: 0 },
    { month: "Okt", value: 0 },
    { month: "Nov", value: 0 },
    { month: "Des", value: 0 },
  ];
  const maxValue = Math.max(...chart.map((d) => d.value));
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/dashboard")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      });
  }, []);
  
  if (loading) return <p>Loading...</p>;
  
  return (
    <div className="space-y-8">
      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* CARD */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Project</p>
            <h2 className="text-3xl font-bold text-gray-800">
              {data?.totalProject || 0}
            </h2>
          </div>

          <div className="w-12 h-12 rounded-xl bg-[#A7EBF2]/40 flex items-center justify-center text-[#26658C]">
            <Folder size={22} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Sertifikasi</p>
            <h2 className="text-3xl font-bold text-gray-800">
              {data?.totalCertification || 0}
            </h2>
          </div>

          <div className="w-12 h-12 rounded-xl bg-[#54ACBF]/30 flex items-center justify-center text-[#26658C]">
            <Award size={22} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Pengalaman</p>
            <h2 className="text-3xl font-bold text-gray-800">
              {data?.totalExperience || 0}
            </h2>
          </div>

          <div className="w-12 h-12 rounded-xl bg-[#26658C]/20 flex items-center justify-center text-[#023859]">
            <Briefcase size={22} />
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="font-semibold text-gray-800">Project Terbaru</h2>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-6 py-3 text-left font-medium">Judul</th>
                <th className="px-6 py-3 text-left font-medium">Status</th>
                <th className="px-6 py-3 text-left font-medium">Tanggal</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              <tr className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#A7EBF2]/40 flex items-center justify-center text-[#26658C]">
                    <Folder size={16} />
                  </div>
                  <span className="font-medium text-gray-800">
                    Beasiswa Desamind
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-600">
                    Aktif
                  </span>
                </td>

                <td className="px-6 py-4 text-gray-500">2026</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* CHART */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-[#023859] flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#A7EBF2]/40 flex items-center justify-center">
                <BarChart3 size={16} className="text-[#26658C]" />
              </div>

              <span>Statistik Project</span>
            </h2>

            <span className="text-xs text-gray-400">2026</span>
          </div>

          <div className="h-64 relative">
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:100%_40px]" />

            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-200" />

            <div className="grid grid-cols-12 items-end h-full gap-2">
              {chart.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-end gap-2 h-full"
                >
                  {/* BAR */}
                  <div className="flex items-end h-full relative group">
                    <div className="relative flex items-end h-full">
                      {/* TOOLTIP */}
                      <div
                        className="
                          absolute bottom-full mb-2 left-1/2 -translate-x-1/2
                          opacity-0 group-hover:opacity-100 transition
                          bg-[#023859] text-white text-[10px] px-2 py-1 rounded-md shadow
                          whitespace-nowrap z-10
                        "
                      >
                        {item.value}
                      </div>

                      {/* BAR */}
                      <div
                        style={{
                          height: `${Math.max((item.value / maxValue) * 100, 5)}%`,
                        }}
                        className={`
                          w-4 sm:w-5 md:w-6 rounded-lg transition-all duration-300
                          ${
                            i === chart.length - 1
                              ? "bg-[#26658C]"
                              : "bg-[#54ACBF]/80 hover:bg-[#54ACBF]"
                          }
                          hover:scale-105
                        `}
                      />
                    </div>
                  </div>

                  {/* LABEL */}
                  <span className="text-[10px] sm:text-xs text-gray-500">
                    {item.month}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ACTIVITY */}
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          {/* HEADER */}
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-[#023859] flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#A7EBF2]/40 flex items-center justify-center">
                <Activity size={16} className="text-[#26658C]" />
              </div>

              <span>Aktivitas Terbaru</span>
            </h2>

            <span className="text-xs text-gray-400">Hari ini</span>
          </div>

          {/* LIST */}
          <div className="space-y-2">
            {[
              { title: "Update project", time: "10 menit lalu" },
              { title: "Menambahkan project baru", time: "30 menit lalu" },
            ].map((item, i) => (
              <div
                key={i}
                className="
          flex items-start gap-3 px-3 py-2 rounded-lg
          hover:bg-[#A7EBF2]/20 transition
          group
        "
              >
                {/* LEFT ACCENT */}
                <div
                  className="
          w-1.5 h-1.5 mt-2 rounded-full bg-[#54ACBF]
          group-hover:scale-125 transition
        "
                />

                {/* CONTENT */}
                <div className="flex-1">
                  <p className="text-sm text-gray-800 font-medium leading-tight">
                    {item.title}
                  </p>

                  <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

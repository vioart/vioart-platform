"use client";

import { X, AlertTriangle } from "lucide-react";

type ConfirmModalProps = {
  open: boolean;
  title?: string;
  description?: string;
  onCancel: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
};

export default function ConfirmModal({
  open,
  title = "Konfirmasi Logout",
  description = "Apakah kamu yakin ingin logout?",
  onCancel,
  onConfirm,
  confirmText = "Ya",
  cancelText = "Batal",
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-99 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onCancel}
    >
      {/* MODAL */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-white rounded-2xl shadow-xl p-6 text-center animate-in fade-in zoom-in-95"
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X size={20} />
        </button>

        {/* ⚠️ ICON */}
        <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
          <AlertTriangle className="text-red-500" size={26} />
        </div>

        {/* 📝 TITLE */}
        <h2 className="text-lg font-semibold text-gray-800 mb-2">{title}</h2>

        {/* 📄 DESCRIPTION */}
        <p className="text-sm text-gray-500 mb-6">{description}</p>

        {/* 🔘 BUTTONS */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-lg bg-red-500 text-white hover:bg-red-600 transition shadow-sm"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";

export function useDelete<T extends { id: number }>(
  url: string,
  setData: React.Dispatch<React.SetStateAction<T[]>>,
) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id: number) => {
    try {
      setLoading(true);

      const res = await fetch(`${url}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Gagal menghapus data");

      setData((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menghapus");
    } finally {
      setLoading(false);
    }
  };

  return { handleDelete, loading };
}

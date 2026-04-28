import { useState, useEffect } from "react";

export type ImageItem = {
  uid: string;
  id?: number;
  file: File | null;
  preview: string;
  is_primary: boolean;
  progress: number;
};

export function useImages() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [deletedIds, setDeletedIds] = useState<number[]>([]);

  // =========================
  // SET PRIMARY
  // =========================
  const setPrimaryImage = (index: number) => {
    setImages((prev) =>
      prev.map((img, i) => ({
        ...img,
        is_primary: i === index,
      })),
    );
  };

  // =========================
  // REMOVE IMAGE
  // =========================
  const removeImage = (index: number) => {
    setImages((prev) => {
      const removed = prev[index];

      if (removed.id) {
        setDeletedIds((ids) => [...ids, removed.id!]);
      }

      const updated = prev.filter((_, i) => i !== index);

      if (updated.length > 0 && !updated.some((img) => img.is_primary)) {
        updated[0].is_primary = true;
      }

      return updated;
    });
  };

  const uploadImage = (file: File, uid: string) => {
    const formData = new FormData();
    formData.append("file", file);

    const xhr = new XMLHttpRequest();

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        const percent = Math.round((e.loaded / e.total) * 100);

        setImages((prev) =>
          prev.map((img) =>
            img.uid === uid ? { ...img, progress: percent } : img,
          ),
        );
      }
    };

    xhr.onload = () => {
      try {
        const res = JSON.parse(xhr.response);

        setImages((prev) =>
          prev.map((img) =>
            img.uid === uid
              ? {
                  ...img,
                  file: null,
                  preview: res.url,
                  progress: 100,
                }
              : img,
          ),
        );
      } catch (err) {
        console.error("Upload gagal:", xhr.response);

        setImages((prev) =>
          prev.map((img) =>
            img.uid === uid
              ? { ...img, progress: 0 }
              : img,
          ),
        );
      }
    };

    xhr.open("POST", "/api/upload/temp");
    xhr.send(formData);
  };

  const addImages = (files: FileList) => {
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) return;

      const uid =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : Math.random().toString(36).substring(2);

      const newItem: ImageItem = {
        uid,
        file,
        preview: URL.createObjectURL(file),
        is_primary: false,
        progress: 0,
      };

      setImages((prev) => {
        const updated = [...prev, newItem];

        // SET PRIMARY jika pertama
        if (updated.length === 1) {
          updated[0].is_primary = true;
        }

        return updated;
      });

      uploadImage(file, uid);
    });
  };

  // =========================
  // CLEANUP MEMORY (IMPORTANT)
  // =========================
  useEffect(() => {
    return () => {
      images.forEach((img) => {
        if (img.file) {
          URL.revokeObjectURL(img.preview);
        }
      });
    };
  }, []);

  // =========================
  // RESET
  // =========================
  const resetImages = () => {
    setImages([]);
    setDeletedIds([]);
  };

  return {
    images,
    setImages,
    addImages,
    setPrimary: setPrimaryImage,
    remove: removeImage,
    deletedIds,
    resetImages,
  };
}

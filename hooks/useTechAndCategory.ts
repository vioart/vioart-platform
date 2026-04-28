import { useState } from "react";

export function useTechAndCategory() {
  const [selectedTechs, setSelectedTechs] = useState<number[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const toggleTech = (id: number) => {
    setSelectedTechs((prev) =>
      prev.includes(id)
        ? prev.filter((t) => t !== id)
        : [...prev, id]
    );
  };

  const toggleCategory = (id: number) => {
    setSelectedCategories((prev) =>
      prev.includes(id)
        ? prev.filter((c) => c !== id)
        : [...prev, id]
    );
  };

  const isTechSelected = (id: number) => {
    return selectedTechs.includes(id);
  };

  const isCategorySelected = (id: number) => {
    return selectedCategories.includes(id);
  };

  const reset = () => {
    setSelectedTechs([]);
    setSelectedCategories([]);
  };

  return {
    selectedTechs,
    selectedCategories,

    toggleTech,
    toggleCategory,

    isTechSelected,
    isCategorySelected,

    setSelectedTechs,
    setSelectedCategories,

    reset,
  };
}
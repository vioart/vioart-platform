import { useState } from "react";

export function useFeatures(initial: string[] = [""]) {
  const [features, setFeatures] = useState<string[]>(initial);

  const addFeature = () => {
    setFeatures((prev) => [...prev, ""]);
  };

  const removeFeature = (index: number) => {
    setFeatures((prev) => prev.filter((_, i) => i !== index));
  };

  const updateFeature = (value: string, index: number) => {
    setFeatures((prev) => {
      const newFeatures = [...prev];
      newFeatures[index] = value;
      return newFeatures;
    });
  };

  const resetFeatures = () => {
    setFeatures([""]);
  };

  return {
    features,
    addFeature,
    removeFeature,
    updateFeature,
    setFeatures,
    resetFeatures,
  };
}
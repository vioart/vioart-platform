import { useState } from "react";

export function useCertificationForm() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [issuer, setIssuer] = useState("");
  const [year, setYear] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    setSlug(val.toLowerCase().replace(/\s+/g, "-"));
  };

  const setAll = (data: {
    title: string;
    slug: string;
    issuer: string;
    year: number | "";
    description: string;
    sourceUrl: string;
    isFeatured: boolean;
  }) => {
    setTitle(data.title);
    setSlug(data.slug);
    setIssuer(data.issuer);
    setYear(data.year);
    setDescription(data.description);
    setSourceUrl(data.sourceUrl);
    setIsFeatured(data.isFeatured);
  };

  return {
    title,
    slug,
    issuer,
    year,
    description,
    sourceUrl,
    isFeatured,

    setTitle,
    setSlug,
    setIssuer,
    setYear,
    setDescription,
    setSourceUrl,
    setIsFeatured,
    handleTitleChange,
    setAll,
  };
}

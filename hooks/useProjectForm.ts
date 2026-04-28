import { useState } from "react";

export function useProjectForm() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);

  const [problem, setProblem] = useState("");
  const [solution, setSolution] = useState("");

  const handleTitleChange = (val: string) => {
    setTitle(val);
    setSlug(val.toLowerCase().replace(/\s+/g, "-"));
  };

  const setAll = (data: {
    title: string;
    slug: string;
    url: string;
    description: string;
    isFeatured: boolean;
    problem: string;
    solution: string;
  }) => {
    setTitle(data.title);
    setSlug(data.slug);
    setUrl(data.url);
    setDescription(data.description);
    setIsFeatured(data.isFeatured);
    setProblem(data.problem);
    setSolution(data.solution);
  };

  return {
    title,
    slug,
    url,
    description,
    isFeatured,
    problem,
    solution,

    setTitle,
    setUrl,
    setDescription,
    setIsFeatured,
    setProblem,
    setSolution,
    setSlug,
    handleTitleChange,
    setAll,
  };
}
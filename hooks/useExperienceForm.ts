import { useState } from "react";

export function useExperienceForm() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [type, setType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [certificateUrl, setCertificateUrl] = useState("");
  const [description, setDescription] = useState("");

  const setAll = (data: {
    title: string;
    company: string;
    type: string;
    startDate: string;
    endDate: string;
    certificateUrl: string;
    description: string;
  }) => {
    setTitle(data.title);
    setCompany(data.company);
    setType(data.type);
    setStartDate(data.startDate);
    setEndDate(data.endDate);
    setCertificateUrl(data.certificateUrl);
    setDescription(data.description);
  };

  return {
    title,
    company,
    type,
    startDate,
    endDate,
    certificateUrl,
    description,

    setTitle,
    setCompany,
    setType,
    setStartDate,
    setEndDate,
    setCertificateUrl,
    setDescription,

    setAll,
  };
}
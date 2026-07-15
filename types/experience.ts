export type ExperiencePoint = {
  id: number;
  content: string;
};

export type Experience = {
  id: number;
  title: string;
  company?: string;
  start_date?: string;
  end_date?: string;
  description?: string;
  type?: string;
  certificate_url?: string;

  created_at: string;
  updated_at: string;

  points: ExperiencePoint[];
};
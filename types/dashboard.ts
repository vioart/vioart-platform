export type LatestProject = {
  id: number;
  title: string;
  created_at: string;
  is_featured: boolean;
};

export type DashboardData = {
  totalProject: number;
  totalCertification: number;
  totalExperience: number;
  latestProjects: LatestProject[];
};
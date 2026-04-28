export type Project = {
  id: number;
  title: string;
  slug: string;
  project_url: string;
  description: string;
  is_featured: boolean;
  created_at: string;

  details?: {
    problem?: string;
    solution?: string;
  };

  techs: {
    tech: {
      id: number;
      name: string;
    };
  }[];

  categories: {
    category: {
      id: number;
      name: string;
    };
  }[];

  images?: {
    image_url: string;
    is_primary: boolean;
  }[];
};

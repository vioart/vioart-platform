export type Certification = {
  id: number;
  title: string;
  slug: string;
  issuer?: string;
  year?: number;
  description?: string;
  source_url?: string;
  is_featured: boolean;
  created_at: string;

  categories: {
    category: {
      id: number;
      name: string;
    };
  }[];

  skills: {
    skill: string;
  }[];

  images: {
    image_url: string;
  }[];
};
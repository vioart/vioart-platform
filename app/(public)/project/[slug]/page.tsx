import { notFound } from "next/navigation";

import Contact from "@/components/home/contact";
import ProjectHeader from "@/components/project/detail/project-header";
import ProjectGallery from "@/components/project/detail/project-gallery";
import ProjectContent from "@/components/project/detail/project-content";

import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProjectDetailPage({
  params,
}: Props) {
  const { slug } = await params;

  const project = await prisma.project.findUnique({
    where: {
      slug,
    },

    include: {
      images: {
        orderBy: {
          is_primary: "desc",
        },
      },

      details: true,

      features: {
        orderBy: {
          id: "asc",
        },
      },

      techs: {
        include: {
          tech: true,
        },
      },

      categories: {
        include: {
          category: true,
        },
      },
    },
  });

  if (!project) {
    notFound();
  }

  return (
    <main>
      <ProjectHeader
        title={project.title}
        description={project.description ?? ""}
        projectUrl={project.project_url ?? undefined}
        techs={project.techs}
        categories={project.categories}
      />

      <ProjectGallery
        images={project.images}
      />

      <ProjectContent
        problem={project.details?.problem ?? ""}
        solution={project.details?.solution ?? ""}
        features={project.features}
        techs={project.techs}
      />

      <Contact />
    </main>
  );
}
import { notFound } from "next/navigation";

import Contact from "@/components/home/contact";
import CertificationDetail from "@/components/certification/certification-detail";

import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CertificationDetailPage({ params }: Props) {
  const { slug } = await params;

  const certification = await prisma.certification.findUnique({
    where: {
      slug,
    },

    include: {
      categories: {
        include: {
          category: true,
        },
      },

      skills: true,

      images: {
        orderBy: {
          id: "asc",
        },
      },
    },
  });

  if (!certification) {
    notFound();
  }

  return (
    <main>
      <CertificationDetail certification={certification} />
      <Contact />
    </main>
  );
}

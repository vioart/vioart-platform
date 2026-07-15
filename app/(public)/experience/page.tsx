import { prisma } from "@/lib/prisma";
import Contact from "@/components/home/contact";
import ExperienceSection from "@/components/experience/experience-section";

export default async function ExperiencePage() {
  const experiences = await prisma.experience.findMany({
    include: {
      points: {
        orderBy: {
          id: "asc",
        },
      },
    },
    orderBy: {
      start_date: "desc",
    },
  });

  return (
    <main>
      <ExperienceSection experiences={experiences} />
      <Contact />
    </main>
  );
}
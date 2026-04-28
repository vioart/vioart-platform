import { prisma } from "@/lib/prisma";

export async function GET() {
  const [totalProject, totalCertification, totalExperience, latestProjects] =
    await Promise.all([
      prisma.project.count(),
      prisma.certification.count(),
      prisma.experience.count(),

      prisma.project.findMany({
        orderBy: { created_at: "desc" },
        take: 5,
      }),
    ]);

  return Response.json({
    totalProject,
    totalCertification,
    totalExperience,
    latestProjects,
  });
}
import { prisma } from "@/lib/prisma";

export async function GET() {
  const techs = await prisma.tech.findMany({
    orderBy: { name: "asc" },
  });

  return Response.json(techs);
}
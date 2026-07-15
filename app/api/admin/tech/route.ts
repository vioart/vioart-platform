import { prisma } from "@/lib/prisma";

export async function GET() {
  const techs = await prisma.tech.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return Response.json(techs);
}

export async function POST(req: Request) {
  const body = await req.json();

  const name = body.name?.trim();

  if (!name) {
    return Response.json(
      {
        error: "Nama teknologi wajib diisi",
      },
      {
        status: 400,
      },
    );
  }

  const tech = await prisma.tech.upsert({
    where: {
      name,
    },
    update: {},
    create: {
      name,
    },
  });

  return Response.json(tech);
}
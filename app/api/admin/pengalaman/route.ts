import { prisma } from "@/lib/prisma";

export async function GET() {
  const experiences = await prisma.experience.findMany({
    orderBy: {
      created_at: "desc",
    },
    include: {
      points: true,
    },
  });

  return Response.json(experiences);
}

export async function POST(req: Request) {
  const formData = await req.formData();

  const title = (formData.get("title") as string)?.trim();
  const company = (formData.get("company") as string)?.trim();
  const type = (formData.get("type") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const certificate_url = (formData.get("certificate_url") as string)?.trim();

  const start_date = formData.get("start_date") as string;
  const end_date = formData.get("end_date") as string;

  const points = (formData.getAll("points[]") as string[])
    .map((p) => p.trim())
    .filter(Boolean);

  if (!title) {
    return Response.json(
      {
        error: "Judul pengalaman wajib diisi.",
      },
      {
        status: 400,
      },
    );
  }

  const experience = await prisma.experience.create({
    data: {
      title,
      company: company || null,
      type: type || null,
      description: description || null,
      certificate_url: certificate_url || null,

      start_date: start_date ? new Date(start_date) : null,
      end_date: end_date ? new Date(end_date) : null,

      points: {
        create: points.map((content) => ({
          content,
        })),
      },
    },
    include: {
      points: true,
    },
  });

  return Response.json(experience);
}
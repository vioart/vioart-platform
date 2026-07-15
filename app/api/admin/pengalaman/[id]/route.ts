import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const experienceId = Number(id);

    if (!id || isNaN(experienceId)) {
      return Response.json(
        { error: "ID tidak valid" },
        { status: 400 },
      );
    }

    const experience = await prisma.experience.findUnique({
      where: {
        id: experienceId,
      },
      include: {
        points: true,
      },
    });

    if (!experience) {
      return Response.json(
        { error: "Pengalaman tidak ditemukan" },
        { status: 404 },
      );
    }

    return Response.json(experience);
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const experienceId = Number(id);

    if (!id || isNaN(experienceId)) {
      return Response.json(
        { error: "ID tidak valid" },
        { status: 400 },
      );
    }

    const formData = await req.formData();

    const title = (formData.get("title") as string)?.trim();
    const company = (formData.get("company") as string)?.trim();
    const type = (formData.get("type") as string)?.trim();
    const description = (formData.get("description") as string)?.trim();
    const certificate_url = (
      formData.get("certificate_url") as string
    )?.trim();

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

    const updated = await prisma.experience.update({
      where: {
        id: experienceId,
      },
      data: {
        title,
        company: company || null,
        type: type || null,
        description: description || null,
        certificate_url: certificate_url || null,

        start_date: start_date
          ? new Date(start_date)
          : null,

        end_date: end_date
          ? new Date(end_date)
          : null,

        points: {
          deleteMany: {},

          create: points.map((content) => ({
            content,
          })),
        },
      },

      include: {
        points: true,
      },
    });

    return Response.json(updated);
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const experienceId = Number(id);

    if (!id || isNaN(experienceId)) {
      return Response.json(
        { error: "ID tidak valid" },
        { status: 400 },
      );
    }

    await prisma.experience.delete({
      where: {
        id: experienceId,
      },
    });

    return Response.json(
      {
        message: "Pengalaman berhasil dihapus",
      },
      {
        status: 200,
      },
    );
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2025"
    ) {
      return Response.json(
        {
          error: "Pengalaman tidak ditemukan",
        },
        {
          status: 404,
        },
      );
    }

    console.error(error);

    return Response.json(
      {
        error: "Terjadi kesalahan server",
      },
      {
        status: 500,
      },
    );
  }
}
import { prisma } from "@/lib/prisma";
import { writeFile } from "fs/promises";
import { unlink } from "fs/promises";
import path from "path";
import { readFile } from "fs/promises";
import fs from "fs";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  try {
    const certId = Number(id);

    if (!id || isNaN(certId)) {
      return Response.json({ error: "ID tidak valid" }, { status: 400 });
    }

    const certification = await prisma.certification.findUnique({
      where: { id: certId },
      include: {
        images: true,
        skills: true,
        categories: {
          include: { category: true },
        },
      },
    });

    if (!certification) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }

    return Response.json(certification);
  } catch (error) {
    console.error("FULL ERROR:", error);
    return new Response(
      JSON.stringify({
        error: "Server error",
        detail: String(error),
      }),
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
    const certId = Number(id);

    if (isNaN(certId)) {
      return Response.json({ error: "ID tidak valid" }, { status: 400 });
    }

    const formData = await req.formData();

    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const issuer = formData.get("issuer") as string;

    const rawYear = formData.get("year");
    const year = rawYear && !isNaN(Number(rawYear)) ? Number(rawYear) : null;

    const description = formData.get("description") as string;
    const source_url = formData.get("source_url") as string;
    const is_featured = formData.get("is_featured") === "true";

    const skills = formData.getAll("skills[]") as string[];

    const category_ids = formData
      .getAll("category_ids[]")
      .map(Number)
      .filter((id) => !isNaN(id));

    const deleteImageIds = formData.getAll("delete_image_ids[]").map(Number);

    const tempUrls = formData.getAll("temp_images[]") as string[];

    if (!title || !slug) {
      return Response.json(
        {
          error: "Title dan slug wajib diisi",
        },
        {
          status: 400,
        },
      );
    }

    if (category_ids.length === 0) {
      return Response.json(
        {
          error: "Minimal pilih satu kategori",
        },
        {
          status: 400,
        },
      );
    }

    const certification = await prisma.certification.findUnique({
      where: {
        id: certId,
      },
    });

    if (!certification) {
      return Response.json(
        {
          error: "Data sertifikasi tidak ditemukan",
        },
        {
          status: 404,
        },
      );
    }

    const existingSlug = await prisma.certification.findFirst({
      where: {
        slug,
        NOT: {
          id: certId,
        },
      },
    });

    if (existingSlug) {
      return Response.json(
        {
          error: "Slug sudah digunakan",
        },
        {
          status: 400,
        },
      );
    }

    const existingCategories = await prisma.category.findMany({
      where: {
        id: {
          in: category_ids,
        },
      },
      select: {
        id: true,
      },
    });

    if (existingCategories.length !== category_ids.length) {
      return Response.json(
        {
          error: "Kategori tidak valid",
        },
        {
          status: 400,
        },
      );
    }

    const uploadDir = path.join(process.cwd(), "public/uploads/certifications");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, {
        recursive: true,
      });
    }

    if (deleteImageIds.length > 0) {
      const images = await prisma.certificationImage.findMany({
        where: {
          id: {
            in: deleteImageIds,
          },
        },
      });

      for (const img of images) {
        try {
          const filePath = path.join(
            process.cwd(),
            "public",
            img.image_url.replace(/^\/+/, ""),
          );

          await unlink(filePath);
        } catch {
          console.warn("Gagal menghapus file:", img.image_url);
        }
      }

      await prisma.certificationImage.deleteMany({
        where: {
          id: {
            in: deleteImageIds,
          },
        },
      });
    }

    const newImages: {
      image_url: string;
    }[] = [];

    for (const tempUrl of tempUrls) {
      if (!tempUrl) continue;

      const fileName = tempUrl.split("/").pop();

      if (!fileName) continue;

      const oldPath = path.join(
        process.cwd(),
        "public",
        tempUrl.replace(/^\/+/, ""),
      );

      const newPath = path.join(
        process.cwd(),
        "public/uploads/certifications",
        fileName,
      );

      try {
        const buffer = await readFile(oldPath);

        await writeFile(newPath, buffer);

        await unlink(oldPath);
      } catch (err) {
        console.error("Gagal memindahkan gambar:", err);

        continue;
      }

      newImages.push({
        image_url: `/uploads/certifications/${fileName}`,
      });
    }

    const cleanSkills = skills.filter((s) => s.trim() !== "");

    const updated = await prisma.certification.update({
      where: {
        id: certId,
      },

      data: {
        title,
        slug,
        issuer,
        year,
        description,
        source_url,
        is_featured,

        skills: {
          deleteMany: {},
          create: cleanSkills.map((skill) => ({
            skill,
          })),
        },

        categories: {
          deleteMany: {},
          create: category_ids.map((id) => ({
            category: {
              connect: {
                id,
              },
            },
          })),
        },

        images: {
          create: newImages,
        },
      },

      include: {
        images: true,

        skills: true,

        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    return Response.json(updated);
  } catch (error) {
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

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const certId = Number(id);

    if (!id || isNaN(certId)) {
      return Response.json({ error: "ID tidak valid" }, { status: 400 });
    }

    const certification = await prisma.certification.findUnique({
      where: {
        id: certId,
      },
    });

    if (!certification) {
      return Response.json(
        {
          error: "Sertifikasi tidak ditemukan",
        },
        {
          status: 404,
        },
      );
    }

    const images = await prisma.certificationImage.findMany({
      where: { certification_id: certId },
    });

    for (const img of images) {
      try {
        const filePath = path.join(
          process.cwd(),
          "public",
          img.image_url.replace(/^\/+/, ""),
        );

        await unlink(filePath);
      } catch (err) {
        console.warn("Gagal hapus file:", img.image_url);
      }
    }

    await prisma.certification.delete({
      where: { id: certId },
    });

    return Response.json(
      { message: "Sertifikasi berhasil dihapus" },
      { status: 200 },
    );
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2025"
    ) {
      return Response.json(
        { error: "Sertifikasi tidak ditemukan" },
        { status: 404 },
      );
    }

    console.error(error);

    return Response.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}

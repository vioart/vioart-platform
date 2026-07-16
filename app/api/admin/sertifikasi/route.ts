import { prisma } from "@/lib/prisma";
import path from "path";
import { mkdir, rename } from "fs/promises";

export async function GET() {
  try {
    const certifications = await prisma.certification.findMany({
      orderBy: {
        created_at: "desc",
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

    return Response.json(certifications);
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Gagal mengambil data sertifikasi.",
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(req: Request) {
  try {
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

    const tempUrls = formData.getAll("temp_images[]") as string[];

    const category_ids = formData
      .getAll("category_ids[]")
      .map(Number)
      .filter((id) => !isNaN(id));

    /* ==========================================
       VALIDATION
    ========================================== */

    if (!title || !slug) {
      return Response.json(
        {
          error: "Judul dan slug wajib diisi.",
        },
        {
          status: 400,
        },
      );
    }

    if (category_ids.length === 0) {
      return Response.json(
        {
          error: "Minimal pilih satu kategori.",
        },
        {
          status: 400,
        },
      );
    }

    const existing = await prisma.certification.findUnique({
      where: {
        slug,
      },
    });

    if (existing) {
      return Response.json(
        {
          error: "Slug sudah digunakan.",
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
          error: "Kategori tidak valid.",
        },
        {
          status: 400,
        },
      );
    }

    /* ==========================================
       STORAGE
    ========================================== */

    await mkdir(path.join(process.cwd(), "storage", "certifications"), {
      recursive: true,
    });

    await mkdir(path.join(process.cwd(), "storage", "temp"), {
      recursive: true,
    });

    const imageRecords: {
      image_url: string;
    }[] = [];

    for (const tempUrl of tempUrls) {
      if (!tempUrl) continue;

      const fileName = tempUrl.split("/").pop();

      if (!fileName) continue;

      const oldPath = path.join(process.cwd(), "storage", "temp", fileName);

      const newPath = path.join(
        process.cwd(),
        "storage",
        "certifications",
        fileName,
      );

      try {
        await rename(oldPath, newPath);

        imageRecords.push({
          image_url: `/api/files/certifications/${fileName}`,
        });
      } catch (err) {
        console.error("Gagal memindahkan gambar:", err);
      }
    }

    /* ==========================================
       CLEAN DATA
    ========================================== */

    const cleanSkills = skills.filter((skill) => skill.trim() !== "");

    /* ==========================================
       CREATE CERTIFICATION
    ========================================== */

    const certification = await prisma.certification.create({
      data: {
        title,
        slug,
        issuer,
        year,
        description,
        source_url,
        is_featured,

        categories: {
          create: category_ids.map((id) => ({
            category: {
              connect: {
                id,
              },
            },
          })),
        },

        skills: {
          create: cleanSkills.map((skill) => ({
            skill,
          })),
        },

        images: {
          create: imageRecords,
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

    return Response.json(certification, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Gagal menambahkan sertifikasi.",
      },
      {
        status: 500,
      },
    );
  }
}

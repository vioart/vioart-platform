import { prisma } from "@/lib/prisma";
import path from "path";
import { readFile, writeFile, unlink } from "fs/promises";
import fs from "fs";

export async function GET() {
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
}

export async function POST(req: Request) {
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

  const imageRecords: {
    image_url: string;
  }[] = [];

  /* ==========================================
     VALIDATION
  ========================================== */

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

  const existing = await prisma.certification.findUnique({
    where: {
      slug,
    },
  });

  if (existing) {
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

  /* ==========================================
     UPLOAD IMAGE
  ========================================== */

  const uploadDir = path.join(process.cwd(), "public/uploads/certifications");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, {
      recursive: true,
    });
  }

  for (const tempUrl of tempUrls) {
    if (!tempUrl) continue;

    const fileName = tempUrl.split("/").pop();

    if (!fileName) continue;

    const oldPath = path.join(
      process.cwd(),
      "public",
      tempUrl.replace(/^\/+/, ""),
    );

    const newPath = path.join(uploadDir, fileName);

    try {
      const buffer = await readFile(oldPath);

      await writeFile(newPath, buffer);

      await unlink(oldPath);

      imageRecords.push({
        image_url: `/uploads/certifications/${fileName}`,
      });
    } catch (err) {
      console.error("Gagal memindahkan gambar:", oldPath, err);
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

  return Response.json(certification);
}

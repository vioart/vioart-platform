import { prisma } from "@/lib/prisma";
import path from "path";
import { readFile, writeFile, unlink } from "fs/promises";
import fs from "fs";

export async function GET() {
  const certifications = await prisma.certification.findMany({
    orderBy: { created_at: "desc" },
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
  const imageRecords = [];

  if (!title || !slug) {
    return Response.json(
      { error: "Title dan slug wajib diisi" },
      { status: 400 },
    );
  }
  const uploadDir = path.join(process.cwd(), "public/uploads/certifications");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const existing = await prisma.certification.findUnique({
    where: { slug },
  });

  if (existing) {
    return Response.json({ error: "Slug sudah digunakan" }, { status: 400 });
  }

  for (let i = 0; i < tempUrls.length; i++) {
    const tempUrl = tempUrls[i];
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
      console.error("Gagal pindah file:", oldPath, err);
      continue;
    }

    imageRecords.push({
      image_url: `/uploads/certifications/${fileName}`,
    });
  }

  const cleanSkills = skills.filter((s) => s.trim() !== "");

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
          category: { connect: { id } },
        })),
      },
      skills: {
        create: cleanSkills.map((s) => ({ skill: s })),
      },

      images: {
        create: imageRecords,
      },
    },
    include: {
      images: true,
      skills: true,
      categories: {
        include: { category: true },
      },
    },
  });

  return Response.json(certification);
}

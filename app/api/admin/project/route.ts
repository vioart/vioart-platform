import { prisma } from "@/lib/prisma";
import path from "path";
import { mkdir, rename } from "fs/promises";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        created_at: "desc",
      },
      include: {
        details: true,
        features: true,
        images: true,
        techs: {
          include: {
            tech: true,
          },
        },
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    return Response.json(projects);
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Gagal mengambil data project.",
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
    const project_url = formData.get("project_url") as string;
    const description = formData.get("description") as string;
    const is_featured = formData.get("is_featured") === "true";
    const problem = formData.get("problem") as string;
    const solution = formData.get("solution") as string;

    const features = formData.getAll("features[]") as string[];
    const tech_ids = formData.getAll("tech_ids[]").map(Number);
    const category_ids = formData.getAll("category_ids[]").map(Number);

    const tempUrls = formData.getAll("temp_images[]") as string[];
    const primaryFlags = formData.getAll("is_primary[]");

    await mkdir(path.join(process.cwd(), "storage", "projects"), {
      recursive: true,
    });

    await mkdir(path.join(process.cwd(), "storage", "temp"), {
      recursive: true,
    });

    const imageRecords: {
      image_url: string;
      is_primary: boolean;
    }[] = [];

    for (let i = 0; i < tempUrls.length; i++) {
      const tempUrl = tempUrls[i];

      if (!tempUrl) continue;

      const fileName = tempUrl.split("/").pop();

      if (!fileName) continue;

      const oldPath = path.join(process.cwd(), "storage", "temp", fileName);

      const newPath = path.join(process.cwd(), "storage", "projects", fileName);

      try {
        await rename(oldPath, newPath);
      } catch (err) {
        console.error("Gagal memindahkan file:", err);
        continue;
      }

      imageRecords.push({
        image_url: `/api/files/projects/${fileName}`,
        is_primary: primaryFlags[i] === "true",
      });
    }

    let hasPrimary = false;

    imageRecords.forEach((img) => {
      if (img.is_primary && !hasPrimary) {
        hasPrimary = true;
      } else {
        img.is_primary = false;
      }
    });

    if (!hasPrimary && imageRecords.length > 0) {
      imageRecords[0].is_primary = true;
    }

    const project = await prisma.project.create({
      data: {
        title,
        slug,
        project_url,
        description,
        is_featured,

        details: {
          create: {
            problem,
            solution,
          },
        },

        features: {
          create: features.map((content) => ({
            content,
          })),
        },

        techs: {
          create: tech_ids.map((id) => ({
            tech: {
              connect: {
                id,
              },
            },
          })),
        },

        categories: {
          create: category_ids.map((id) => ({
            category: {
              connect: {
                id,
              },
            },
          })),
        },

        images: {
          create: imageRecords,
        },
      },
    });

    return Response.json(project, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Gagal menambahkan project.",
      },
      {
        status: 500,
      },
    );
  }
}

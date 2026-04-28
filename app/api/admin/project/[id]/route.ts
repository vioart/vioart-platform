import { prisma } from "@/lib/prisma";
import { writeFile } from "fs/promises";
import { unlink } from "fs/promises";
import path from "path";
import { readFile } from "fs/promises";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  try {
    const projectId = Number(id);

    if (!id || isNaN(projectId)) {
      return Response.json({ error: "ID tidak valid" }, { status: 400 });
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        details: true,
        features: true,
        techs: { include: { tech: true } },
        categories: { include: { category: true } },
        images: true,
      },
    });

    if (!project) {
      return new Response("Not found", { status: 404 });
    }

    return Response.json(project);
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
    const projectId = Number(id);

    if (isNaN(projectId)) {
      return Response.json({ error: "ID tidak valid" }, { status: 400 });
    }

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

    const deleteImageIds = formData.getAll("delete_image_ids[]").map(Number);

    if (deleteImageIds.length > 0) {
      const imagesToDelete = await prisma.projectImage.findMany({
        where: {
          id: { in: deleteImageIds },
        },
      });

      for (const img of imagesToDelete) {
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

      await prisma.projectImage.deleteMany({
        where: {
          id: { in: deleteImageIds },
        },
      });
    }

    const newImages: {
      image_url: string;
      is_primary: boolean;
    }[] = [];

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
        "public/uploads/projects",
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

      newImages.push({
        image_url: `/uploads/projects/${fileName}`,
        is_primary: primaryFlags[i] === "true",
      });
    }

    /**
     * 2. UPDATE MAIN PROJECT
     */

    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: {
        title,
        slug,
        project_url,
        description,
        is_featured,

        /**
         * DETAILS (UPSERT)
         */
        details: {
          upsert: {
            create: { problem, solution },
            update: { problem, solution },
          },
        },

        /**
         * FEATURES (RESET & CREATE)
         */
        features: {
          deleteMany: {}, // hapus lama
          create: features.map((f) => ({
            content: f,
          })),
        },

        /**
         * TECH RELATION (RESET)
         */
        techs: {
          deleteMany: {},
          create: tech_ids.map((id) => ({
            tech: { connect: { id } },
          })),
        },

        /**
         * CATEGORY RELATION (RESET)
         */
        categories: {
          deleteMany: {},
          create: category_ids.map((id) => ({
            category: { connect: { id } },
          })),
        },

        /**
         * IMAGES
         */
        images: {
          create: newImages,
        },
      },

      include: {
        details: true,
        features: true,
        techs: { include: { tech: true } },
        categories: { include: { category: true } },
        images: true,
      },
    });

    /**
     * 3. HANDLE PRIMARY IMAGE (ENSURE 1 ONLY)
     */
    const allImages = await prisma.projectImage.findMany({
      where: { project_id: projectId },
    });

    // reset semua dulu
    await prisma.projectImage.updateMany({
      where: { project_id: projectId },
      data: { is_primary: false },
    });

    // set primary dari frontend
    const primaryIndex = primaryFlags.findIndex((f) => f === "true");

    if (primaryIndex !== -1 && allImages[primaryIndex]) {
      await prisma.projectImage.update({
        where: { id: allImages[primaryIndex].id },
        data: { is_primary: true },
      });
    } else if (allImages.length > 0) {
      // fallback
      await prisma.projectImage.update({
        where: { id: allImages[0].id },
        data: { is_primary: true },
      });
    }

    return Response.json(updatedProject);
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
    const projectId = Number(id);

    if (!id || isNaN(projectId)) {
      return Response.json({ error: "ID tidak valid" }, { status: 400 });
    }

    const images = await prisma.projectImage.findMany({
      where: { project_id: projectId },
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

    await prisma.project.delete({
      where: { id: projectId },
    });

    return Response.json(
      { message: "Project berhasil dihapus" },
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
        { error: "Project tidak ditemukan" },
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

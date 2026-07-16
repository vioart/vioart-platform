import { readFile } from "fs/promises";
import path from "path";

const MIME_TYPES: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
};

export async function GET(
  req: Request,
  context: {
    params: Promise<{
      folder: string;
      filename: string;
    }>;
  },
) {
  try {
    const { folder, filename } = await context.params;

    /**
     * Security
     * hanya folder yang diperbolehkan
     */
    const allowedFolders = ["temp", "projects", "certifications", "experience"];

    if (!allowedFolders.includes(folder)) {
      return new Response("Folder tidak valid", {
        status: 400,
      });
    }

    const filePath = path.join(process.cwd(), "storage", folder, filename);

    const fileBuffer = await readFile(filePath);

    const ext = path.extname(filename).toLowerCase();

    return new Response(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": MIME_TYPES[ext] ?? "application/octet-stream",

        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("GET FILE:", error);

    return new Response("File tidak ditemukan", {
      status: 404,
    });
  }
}

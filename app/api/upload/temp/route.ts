// app/api/upload/temp/route.ts

import { mkdir, writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";

export async function POST(req: Request) {
  const formData = await req.formData();

  const file = formData.get("file") as File;

  if (!file) {
    return Response.json({ error: "No file" }, { status: 400 });
  }

  const ext = path.extname(file.name);

  const fileName = `${crypto.randomUUID()}${ext}`;

  const uploadDir = path.join(process.cwd(), "storage", "temp");

  await mkdir(uploadDir, {
    recursive: true,
  });

  const buffer = Buffer.from(await file.arrayBuffer());

  await writeFile(path.join(uploadDir, fileName), buffer);

  return Response.json({
    fileName,
    url: `/api/files/temp/${fileName}`,
  });
}

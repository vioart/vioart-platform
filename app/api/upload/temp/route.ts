// app/api/upload/temp/route.ts

import { writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return Response.json({ error: "No file" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const ext = file.name.split(".").pop();
  const fileName = crypto.randomUUID() + "." + ext;

  const filePath = path.join(
    process.cwd(),
    "public/uploads/temp",
    fileName
  );

  await writeFile(filePath, buffer);

  return Response.json({
    url: `/uploads/temp/${fileName}`,
    fileName,
  });
}
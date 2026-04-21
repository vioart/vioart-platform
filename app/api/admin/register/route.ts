import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const body = await req.json();

  if (process.env.ALLOW_REGISTER !== "true") {
    return Response.json({ error: "Register disabled" }, { status: 403 });
  }

  if (!body.name || body.name.trim() === "") {
    return Response.json({ error: "Nama wajib diisi" }, { status: 400 });
  }

  const existing = await prisma.admin.findUnique({
    where: { email: body.email },
  });

  if (existing) {
    return Response.json(
      { error: "Email sudah terdaftar" },
      { status: 400 }
    );
  }

  const hash = await bcrypt.hash(body.password, 10);

  await prisma.admin.create({
    data: {
      name: body.name,
      email: body.email,
      password_hash: hash,
    },
  });

  return Response.json({ message: "Admin created" });
}
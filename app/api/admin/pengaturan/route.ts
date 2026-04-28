import { prisma } from "@/lib/prisma";
import path from "path";
import { writeFile, unlink } from "fs/promises";

export async function GET() {
  const admin = await prisma.admin.findFirst();

  if (!admin) {
    return Response.json({ error: "Admin tidak ditemukan" }, { status: 404 });
  }
  return Response.json(admin);
}

export async function PUT(req: Request) {
  const formData = await req.formData();

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const file = formData.get("avatar") as File | null;
  const password = (formData.get("password") as string) || "";
  const confirmPassword = (formData.get("confirmPassword") as string) || "";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const cleanEmail = email.trim().toLowerCase();

  if (!emailRegex.test(cleanEmail)) {
    return Response.json({ error: "Email tidak valid" }, { status: 400 });
  }

  const admin = await prisma.admin.findFirst();

  if (!admin) {
    return Response.json({ error: "Admin tidak ditemukan" }, { status: 404 });
  }

  const emailExists = await prisma.admin.findFirst({
    where: {
      email: cleanEmail,
      NOT: { id: admin.id },
    },
  });

  if (emailExists) {
    return Response.json({ error: "Email sudah digunakan" }, { status: 400 });
  }

  let avatarPath: string | undefined;

  if (file && file.size > 0) {
    if (!file.type.startsWith("image/")) {
      return Response.json({ error: "File harus gambar" }, { status: 400 });
    }

    if (file.size > 2 * 1024 * 1024) {
      return Response.json({ error: "Max 2MB" }, { status: 400 });
    }

    if (admin.avatar_url && !admin.avatar_url.includes("profile.png")) {
      const oldPath = path.join(
        process.cwd(),
        "public",
        admin.avatar_url.replace(/^\/+/, ""),
      );
      try {
        await unlink(oldPath);
      } catch (err) {
        console.error("Gagal hapus avatar lama:", err);
      }
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const safeName = file.name.replace(/\s+/g, "-");
    const fileName = `${Date.now()}-${safeName}`;

    const filePath = path.join(
      process.cwd(),
      "public/uploads/avatars",
      fileName,
    );

    await writeFile(filePath, buffer);

    avatarPath = `/uploads/avatars/${fileName}`;
  }

  let passwordHash: string | undefined;

  if (password) {
    if (password.length < 6) {
      return Response.json(
        { error: "Password minimal 6 karakter" },
        { status: 400 },
      );
    }

    if (password !== confirmPassword) {
      return Response.json(
        { error: "Konfirmasi password tidak cocok" },
        { status: 400 },
      );
    }

    const bcrypt = await import("bcryptjs");
    passwordHash = await bcrypt.hash(password, 10);
  }

  const updated = await prisma.admin.update({
    where: { id: admin.id },
    data: {
      name,
      email: cleanEmail,
      ...(avatarPath && { avatar_url: avatarPath }),
      ...(passwordHash && { password_hash: passwordHash }),
    },
  });

  return Response.json(updated);
}

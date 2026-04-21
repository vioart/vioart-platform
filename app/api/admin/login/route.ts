import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "secret";

export async function POST(req: Request) {
  const body = await req.json();

  const user = await prisma.admin.findUnique({
    where: { email: body.email },
  });

  if (!user) {
    return Response.json({ error: "Email tidak ditemukan" }, { status: 404 });
  }

  const isValid = await bcrypt.compare(
    body.password,
    user.password_hash
  );

  if (!isValid) {
    return Response.json({ error: "Password salah" }, { status: 401 });
  }

  // 🔥 generate token
  const token = jwt.sign(
    { id: user.id, email: user.email },
    SECRET,
    { expiresIn: "1d" }
  );

  // 🔥 set cookie
  return new Response(
    JSON.stringify({ message: "Login berhasil" }),
    {
      status: 200,
      headers: {
        "Set-Cookie": `token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict`,
        "Content-Type": "application/json",
      },
    }
  );
}   
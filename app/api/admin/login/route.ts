import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return Response.json(
        { error: "Email dan password wajib diisi" },
        { status: 400 },
      );
    }

    const user = await prisma.admin.findUnique({
      where: { email },
    });

    if (!user) {
      return Response.json({ error: "Email tidak ditemukan" }, { status: 404 });
    }

    const isValid = await bcrypt.compare(password, user.password_hash);

    if (!isValid) {
      return Response.json({ error: "Password salah" }, { status: 401 });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET, {
      expiresIn: "1d",
    });

    return new Response(JSON.stringify({ message: "Login berhasil" }), {
      status: 200,
      headers: {
        "Set-Cookie": [
          `token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict; ${
            process.env.NODE_ENV === "production" ? "Secure;" : ""
          }`,
        ].join(""),
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return Response.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}

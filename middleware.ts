import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  const isAdminRoute = pathname.startsWith("/admin");

  // 🔥 whitelist
  const publicRoutes = ["/admin/login", "/admin/register"];
  const isPublicRoute = publicRoutes.includes(pathname);

  // 🔐 PROTECT ADMIN
  if (isAdminRoute && !isPublicRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    try {
      await jwtVerify(token, SECRET);
    } catch {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  // 🔁 redirect kalau sudah login
  if (isPublicRoute && token) {
    try {
      await jwtVerify(token, SECRET);
      return NextResponse.redirect(new URL("/admin", req.url));
    } catch {}
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
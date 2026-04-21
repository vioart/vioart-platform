import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "secret";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
  const isLoginPage = req.nextUrl.pathname === "/admin/login";

  if (isAdminRoute && !isLoginPage) {
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    try {
      jwt.verify(token, SECRET);
    } catch {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  if (isLoginPage && token) {
    try {
      jwt.verify(token, SECRET);
      return NextResponse.redirect(new URL("/admin", req.url));
    } catch {}
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
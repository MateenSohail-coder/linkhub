// /middleware.js
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export function middleware(req) {
  const token = req.headers.get("authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  // token valid → continue
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/add/:path*", "/generate/:path*"], // protected routes
};

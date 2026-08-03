import { NextRequest, NextResponse } from "next/server";

const ALLOWED_ROLES = new Set(["admin", "recruiter"]);

export async function GET(request: NextRequest) {
  const role = request.nextUrl.searchParams.get("role") ?? "";
  const locale = request.nextUrl.searchParams.get("locale") ?? "fr";
  const target = request.nextUrl.searchParams.get("next") ?? "/admin";

  const safeTarget = target.startsWith("/") ? target : "/admin";
  const destination = request.nextUrl.clone();
  destination.pathname = `/${locale}${safeTarget}`;
  destination.search = "";

  if (!ALLOWED_ROLES.has(role)) {
    destination.pathname = `/${locale}/jobs`;
    destination.searchParams.set("adminAccess", "required");
    return NextResponse.redirect(destination);
  }

  const response = NextResponse.redirect(destination);
  response.cookies.set("trx_role", role, {
    path: "/",
    sameSite: "lax",
    httpOnly: false,
    maxAge: 60 * 60 * 24 * 30,
  });

  return response;
}

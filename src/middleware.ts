import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin/access") {
    const granted = req.cookies.get("eqx_admin")?.value === "granted";
    if (!granted) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/access";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

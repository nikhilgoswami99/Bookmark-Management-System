import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const sessionId = request.cookies.get("sessionID")?.value;
  const { pathname } = request.nextUrl;

  // 1. Define public routes
  const isPublicRoute = pathname === "/signin" || pathname === "/signup";

  // 2. If no session and trying to access a protected route -> redirect to /signin
  // (In this case, "/" is the main protected route)
  if (!sessionId && !isPublicRoute) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // 3. If session exists and trying to access signin/signup -> redirect to /
  if (sessionId && isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Define which routes this proxy runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

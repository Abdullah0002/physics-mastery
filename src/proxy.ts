import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that require authentication
const PROTECTED_ROUTES = [
  "/dashboard",
  "/study-planner",
  "/ai-tutor",
  "/practice/weak-areas",
];

// Routes restricted to specific roles
const ROLE_ROUTES: Record<string, string[]> = {
  "/admin": ["ADMIN"],
  "/faculty/manage": ["FACULTY", "ADMIN"],
};

// Auth routes (redirect to dashboard if already logged in)
const AUTH_ROUTES = ["/login", "/register"];

export default auth((req: NextRequest & { auth: { user?: { role?: string } } | null }) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;
  const isLoggedIn = !!session?.user;

  // Redirect authenticated users away from auth pages
  if (isLoggedIn && AUTH_ROUTES.some((r) => pathname.startsWith(r))) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Protect authenticated routes
  const isProtected = PROTECTED_ROUTES.some((r) => pathname.startsWith(r));
  if (isProtected && !isLoggedIn) {
    const callbackUrl = encodeURIComponent(pathname);
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${callbackUrl}`, req.url)
    );
  }

  // Role-based access control
  for (const [routePrefix, allowedRoles] of Object.entries(ROLE_ROUTES)) {
    if (pathname.startsWith(routePrefix)) {
      if (!isLoggedIn) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
      const userRole = session?.user?.role ?? "STUDENT";
      if (!allowedRoles.includes(userRole)) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }
  }

  // Security headers
  const response = NextResponse.next();
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "SAMEORIGIN");

  return response;
});

// Only run the auth middleware on routes that actually need it. Public content
// (home, /chapters, /blog, marketing pages, etc.) bypasses it entirely, so the
// site works even before auth env vars (AUTH_SECRET, …) are configured. Global
// security headers are applied separately in next.config.ts.
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/study-planner/:path*",
    "/ai-tutor/:path*",
    "/practice/weak-areas/:path*",
    "/admin/:path*",
    "/faculty/manage/:path*",
    "/login",
    "/register",
  ],
};

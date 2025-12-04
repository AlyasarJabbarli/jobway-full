import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { NextRequest } from "next/server"

// Define protected routes and their required roles
const protectedRoutes = {
  "/admin": ["admin"],
  "/admin/moderators": ["admin"],
  "/admin/analytics": ["admin"],
  "/admin/settings": ["admin"],
  "/admin/jobs": ["admin"],
  "/admin/companies": ["admin"],
  "/admin/banners": ["admin"],
  "/moderation": ["moderator"],
  "/moderation/jobs": ["moderator"],
  "/moderation/companies": ["moderator"],
  "/moderation/reports": ["moderator"],
  "/moderation/settings": ["moderator"],
}

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const isAuthPage = request.nextUrl.pathname.startsWith("/auth")
  const isAdminPage = request.nextUrl.pathname.startsWith("/admin")
  const isModerationPage = request.nextUrl.pathname.startsWith("/moderation")

  // If trying to access auth pages while logged in, redirect to appropriate dashboard
  if (isAuthPage) {
    if (token) {
      const role = token.role as string
      const redirectPath = role === "admin" ? "/admin" : "/moderation"
      return NextResponse.redirect(new URL(redirectPath, request.url))
    }
    return NextResponse.next()
  }

  // If trying to access protected pages while not logged in, redirect to login
  if (isAdminPage || isModerationPage) {
    if (!token) {
      const from = request.nextUrl.pathname + request.nextUrl.search
      return NextResponse.redirect(
        new URL(`/auth/login?from=${encodeURIComponent(from)}`, request.url)
      )
    }

    // Check role-based access
    const userRole = token.role as string
    const path = request.nextUrl.pathname

    // Check if the path is protected
    for (const [route, allowedRoles] of Object.entries(protectedRoutes)) {
      if (path.startsWith(route)) {
        if (!allowedRoles.includes(userRole)) {
          // Redirect to appropriate dashboard based on role
          const redirectPath = userRole === "admin" ? "/admin" : "/moderation"
          return NextResponse.redirect(new URL(redirectPath, request.url))
        }
        break
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/moderation/:path*", "/auth/:path*"],
} 
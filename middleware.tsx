import { NextRequest, NextResponse } from "next/server"
import isValidPassword from "./lib/isValidPassword"

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // ✅ If admin clicks "/logout", clear cookies & redirect to "/"
  if (pathname === "/logout") {
    return signOutAndRedirect(req)
  }

  // ✅ Require authentication for /admin
  if (pathname.startsWith("/admin")) {
    const isAuthenticatedResult = await isAuthenticated(req)

    if (!isAuthenticatedResult) {
      return new NextResponse("Unauthorized", {
        status: 401,
        headers: { "WWW-Authenticate": "Basic" }, // 🔥 Prompts for login
      })
    }
  }

  return NextResponse.next() // Continue request if authenticated
}

// 🔐 Check if the admin is authenticated via Authorization header
async function isAuthenticated(req: NextRequest): Promise<boolean> {
  const authHeader = req.headers.get("authorization") || req.headers.get("Authorization")

  if (!authHeader) return false

  const [username, password] = Buffer.from(authHeader.split(" ")[1], "base64")
    .toString()
    .split(":")

  return (
    username === process.env.ADMIN_USERNAME &&
    (await isValidPassword(password, process.env.HASHED_ADMIN_PASSWORD as string))
  )
}

// 🔐 Logout: Clears all cookies & redirects to "/"
export function signOutAndRedirect(req: NextRequest) {
  const url = new URL("/", req.nextUrl.origin) // Redirect to homepage

  const response = NextResponse.redirect(url)

  // ❌ Clear all cookies
  req.cookies.getAll().forEach((cookie) => {
    response.cookies.set(cookie.name, "", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: new Date(0), // Expire cookies
    })
  })

  return response
}

export const config = {
  matcher: ["/admin/:path*", "/logout"], // Apply to admin routes & logout
}

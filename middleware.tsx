import { NextRequest, NextResponse } from 'next/server'
import isValidPassword from './lib/isValidPassword'

export async function middleware(req: NextRequest) {
  const isAuthenticatedResult = await isAuthenticated(req)
  
  if (!isAuthenticatedResult) {
    return new NextResponse('Unauthorized', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic' },
    })
  }
}

async function isAuthenticated(req: NextRequest): Promise<boolean> {
  const authHeader = req.headers.get('authorization') || req.headers.get('Authorization')

  if (!authHeader) return false

  const [username, password] = Buffer.from(authHeader.split(' ')[1], 'base64')
    .toString()
    .split(':')

  return (
    username === process.env.ADMIN_USERNAME &&
    (await isValidPassword(password, process.env.HASHED_ADMIN_PASSWORD as string))
  )
}

export const config = {
  matcher: '/admin/:path*',
}

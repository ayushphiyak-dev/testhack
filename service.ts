import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public paths that don't require auth
  const publicPaths = ['/', '/login', '/register', '/forgot-password', '/institutes', '/issues', '/terms', '/privacy', '/help'];
  if (publicPaths.includes(pathname) || pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Check for auth token (in real app, verify JWT)
  const token = request.cookies.get('eduwatch-auth');

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|public/).*)'],
};

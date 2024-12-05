import { NextResponse, NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const sessionToken = req.cookies.get('sessionToken');
  if (!sessionToken) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/projects/:path*', '/createbatch/:path*'], // Protected routes
};

// CREATE NEW FILE: src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Add paths that don't require authentication
const publicPaths = ['/login', '/signup'];

export function middleware(request: NextRequest) {
    const token = request.cookies.get('authToken')?.value;
    const isPublicPath = publicPaths.includes(request.nextUrl.pathname);

    if (!token && !isPublicPath) {
        // Redirect to login if trying to access protected route without token
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (token && isPublicPath) {
        // Redirect to projects if trying to access login/signup while authenticated
        return NextResponse.redirect(new URL('/projects', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
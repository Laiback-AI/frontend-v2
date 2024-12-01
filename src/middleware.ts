import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicPaths = ['/login', '/signup'];
const protectedPaths = ['/main', '/projects', '/chat', '/tenders'];

export function middleware(request: NextRequest) {
    const authToken = request.cookies.get('authToken')?.value;
    const csrfToken = request.cookies.get('csrftoken')?.value;
    const currentPath = request.nextUrl.pathname;
    const isPublicPath = publicPaths.includes(currentPath);
    const isProtectedPath = protectedPaths.some(path => currentPath.startsWith(path));

    // If no tokens and trying to access protected route
    // if (!authToken && isProtectedPath) {
    //     return NextResponse.redirect(new URL('/login', request.url));
    // }

    // // If authenticated and trying to access public routes
    // if (authToken && isPublicPath) {
    //     return NextResponse.redirect(new URL('/main', request.url));
    // }

    // // If authenticated but no CSRF token, refresh CSRF
    // if (authToken && !csrfToken && isProtectedPath) {
    //     return NextResponse.redirect(new URL('/api/auth/refresh-csrf', request.url));
    // }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
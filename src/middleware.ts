import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Add paths that don't require authentication
const publicPaths = ['/Login', '/Signup'];

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;

    // Allow public paths
    if (publicPaths.includes(pathname)) {
        return NextResponse.next();
    }

    // Check if the path is the dashboard or any other protected route
    if (pathname.startsWith('/Dashboard') || pathname.startsWith('/api/protected')) {
        if (!token) {
            // Redirect to login if no token is present
            const url = new URL('/Login', request.url);
            url.searchParams.set('from', pathname);
            return NextResponse.redirect(url);
        }

        try {
            // Verify the token with the backend
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Invalid token');
            }

            // Token is valid, proceed with the request
            return NextResponse.next();
        } catch {
            // Token is invalid, redirect to login
            const url = new URL('/Login', request.url);
            url.searchParams.set('from', pathname);
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
    matcher: [
        '/Dashboard/:path*',
        '/api/protected/:path*',
        '/Login',
        '/Signup',
    ],
}; 
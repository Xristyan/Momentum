// middleware.ts
import { NextResponse, type NextRequest } from 'next/server';

const protectedPaths = ['/dashboard', '/profile'];

export async function middleware(request: NextRequest) {
  console.log('middleware');
  const token = request.cookies.get('jwt')?.value;
  const isProtected = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path),
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'],
};

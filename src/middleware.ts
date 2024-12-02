import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from './app/lib/session/session';
import { User } from './interfaces';
import { permission } from 'process';

const publicRoutes = [/^\/sign-in$/, /^\/sign-up$/, /^\/verify$/, /^\/password-recovery$/, /^\/password-reset$/];
const roleRoutes = {
  client: [
    /^\/settings(\/change-email|\/change-password)?$/,
    /^\/appointments(\/history|\/create|\/details\/[\w-]+)?$/,
    /^\/services(\/history|\/details\/[\w-]+(\/resources\/details\/[\w-]+|\/service-detail\/details\/[\w-]+)?)?$/,
    /^\/vehicles(\/create|\/details\/[\w-]+|\/update\/[\w-]+)?$/,
    /^\/products\/details\/[\w-]+$/,
  ],
  worker: [
    /^\/settings(\/change-email|\/change-password)?$/,
    /^\/appointments(\/history|\/details\/[\w-]+)?$/,
    /^\/services(\/history|\/details\/[\w-]+(\/resources\/create|\/resources\/details\/[\w-]+|\/service-detail\/create|\/service-detail\/details\/[\w-]+)?)?$/,
    /^\/vehicles\/details\/[\w-]+$/,
    /^\/products\/details\/[\w-]+$/,
  ],
  receptionist: [/^\/.*$/],
  admin: 'receptionist',
  superAdmin: 'receptionist',
};

type RoleType = keyof typeof roleRoutes;

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublicRoute = publicRoutes.some(route => route.test(pathname));
  const isPrivateRoute = !isPublicRoute;

  try {
    const sessionCookie = (await cookies()).get('session')?.value;
    if (!sessionCookie && isPrivateRoute) return NextResponse.redirect(new URL('/sign-in', request.nextUrl));
    if (isPublicRoute && !sessionCookie) return NextResponse.next();

    if (!sessionCookie) return NextResponse.next();
    const payload = await decrypt(sessionCookie);
    if (!payload || !payload.accessToken) return NextResponse.redirect(new URL('/sign-in', request.nextUrl));

    const permissions = payload.permissions as string[];

    let role: RoleType = 'client';

    if (permissions.includes('superAdmin')) role = 'superAdmin';
    if (permissions.includes('admin')) role = 'admin';
    if (permissions.includes('receptionist')) role = 'receptionist';
    if (permissions.includes('worker')) role = 'worker';

    let allowedRoutes = roleRoutes[role as RoleType];
    if (typeof allowedRoutes === 'string') allowedRoutes = roleRoutes[allowedRoutes as RoleType];

    const isAllowed = (allowedRoutes as RegExp[]).some(route => route.test(pathname)) || isPublicRoute;
    if (!isAllowed) return NextResponse.redirect(new URL('/sign-in', request.nextUrl));
    if (isPublicRoute) return NextResponse.redirect(new URL('/appointments', request.nextUrl));

    return NextResponse.next();
  } catch (error) {
    console.error('Middleware Error:', error);
    return new Response('An error occurred', { status: 500 });
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

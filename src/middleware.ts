import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from './app/lib/session/session';
import { User } from './interfaces';

const publicRoutes = [/^\/sign-in$/, /^\/sign-up$/, /^\/verify$/, /^\/password-recovery$/, /^\/password-recovery\/password-reset\/[^\/]+$/];
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
    // "payload":{
    //    "user":{
    //       "id":"e36f68fa-5c20-4a20-9e61-eff9e9a1f768",
    //       "email":"cepo.sextino@gmail.com",
    //       "password":"$2b$10$1NeWSjju4yX.tTxHF19Pde.xzM0AYSmLPA3sdcY9Y1Sjw7OKgfuB.",
    //       "firstName":"Jonathan Josue",
    //       "firstSurname":"Vidrio",
    //       "secondSurname":"Hernández",
    //       "createdAt":"2024-10-09T10:36:00.476Z",
    //       "updatedAt":"2024-10-31T10:23:29.455Z",
    //       "deletedAt":null,
    //       "userType":{
    //          "id":"28d3e91f-8b13-487e-9eef-c97f3e0d2fd3",
    //          "description":"superAdmin",
    //          "createdAt":"2024-10-27T22:45:23.532Z",
    //          "updatedAt":"2024-10-27T22:45:23.532Z",
    //          "deletedAt":null
    //       },
    //       "status":{
    //          "id":"2b75d2ae-da95-484c-887d-74a9d0cebfa5",
    //          "description":"active",
    //          "createdAt":"2024-10-09T10:34:13.369Z",
    //          "updatedAt":"2024-10-09T10:34:13.369Z",
    //          "deletedAt":null
    //       },
    //       "client":null,
    //       "worker":null
    //    },
    //    "accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUzNmY2OGZhLTVjMjAtNGEyMC05ZTYxLWVmZjllOWExZjc2OCIsImVtYWlsIjoiY2Vwby5zZXh0aW5vQGdtYWlsLmNvbSIsImlhdCI6MTczMTM4NTEzMywiZXhwIjoxNzMxNDI4MzMzfQ.q20PWCHgMcv0gauxMPB2xcRnNx0o-K2H88m527Xn0mo",
    //    "iat":1731385133,
    //    "exp":1731471533
    // }
    if (!payload || !payload.accessToken) return NextResponse.redirect(new URL('/sign-in', request.nextUrl));

    const user = payload.user as User;
    const userType = user?.userType?.description;
    // workerType can be null or undefined
    const workerType = user?.worker?.workerType?.description;

    let role: RoleType = 'client';

    if (userType === 'client' || userType === 'admin' || userType === 'superAdmin') role = userType as RoleType;
    else if (userType === 'worker') role = workerType === 'receptionist' ? 'receptionist' : 'worker';

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

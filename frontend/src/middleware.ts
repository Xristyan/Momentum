// middleware.ts
import { NextResponse, type NextRequest } from 'next/server';
import { i18nConfig } from '../i18nConfig';

const PROTECTED_PATHS = ['/dashboard', '/profile'];
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7 * 4 * 12 * 100; // ~100 years

const checkAuthentication = (
  request: NextRequest,
  url: URL,
  locale: string,
): URL => {
  const token = request.cookies.get('jwt')?.value;
  const isProtectedPath = PROTECTED_PATHS.some((path) =>
    url.pathname.includes(path),
  );

  if (isProtectedPath && !token) {
    return new URL(`/${locale}/login`, request.url);
  }

  return url;
};

const resolveLocale = (request: NextRequest, path: string): string => {
  const pathMissingLocale = i18nConfig.locales.every(
    (locale: string) => !path.startsWith(`/${locale}`),
  );

  if (pathMissingLocale) {
    const storedLocale = request.cookies.get('locale')?.value;
    return [storedLocale, i18nConfig.defaultLocale]
      .filter(Boolean)
      .filter((l) => i18nConfig.locales.includes(l as string))[0] as string;
  }

  return path.split('/')[1];
};

export async function middleware(request: NextRequest) {
  const search = request.nextUrl.searchParams.toString();
  const path = request.nextUrl.pathname + (search ? `?${search}` : '');

  const locale = resolveLocale(request, path);
  const pathMissingLocale = i18nConfig.locales.every(
    (loc: string) => !path.startsWith(`/${loc}`),
  );

  let response: NextResponse;

  if (pathMissingLocale) {
    const newUrl = checkAuthentication(
      request,
      new URL(`/${locale}${path}`, request.url),
      locale,
    );
    response = NextResponse.redirect(newUrl);
  } else {
    const containsDuplicateLocale = new RegExp(`(/${locale}){2,}`, 'g').test(
      path,
    );

    if (containsDuplicateLocale) {
      const fixedPath = path.replace(
        new RegExp(`(/${locale}){2,}`, 'g'),
        `/${locale}/`,
      );
      const newUrl = checkAuthentication(
        request,
        new URL(fixedPath, request.url),
        locale,
      );
      response = NextResponse.redirect(newUrl);
    } else {
      const authUrl = checkAuthentication(
        request,
        new URL(request.url),
        locale,
      );

      if (
        authUrl.pathname.includes('/login') &&
        !request.url.includes('/login')
      ) {
        response = NextResponse.redirect(authUrl);
      } else {
        response = NextResponse.next();
      }
    }
  }

  response.cookies.set('locale', locale, { maxAge: COOKIE_MAX_AGE });

  return response;
}

export const config = {
  matcher:
    '/((?!api|_next|favicon|manifest|locales|storybook|images|sb-assets|sitemap|robots.txt|sw.js|workbox|icons).*)',
};

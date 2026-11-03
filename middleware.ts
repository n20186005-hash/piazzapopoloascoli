import createMiddleware from 'next-intl/middleware';
import {NextRequest, NextResponse} from 'next/server';
import {locales, defaultLocale} from './src/i18n/config';
const intl = createMiddleware({locales, defaultLocale, localePrefix: 'always'});
export default function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  if (url.hostname === 'piazzapopoloascoli.com' || (url.hostname === 'www.piazzapopoloascoli.com' && (url.protocol === 'http:' || request.headers.get('x-forwarded-proto') === 'http'))) {
    url.hostname = 'www.piazzapopoloascoli.com'; url.protocol = 'https:'; url.port = '';
    return NextResponse.redirect(url, 308);
  }
  return intl(request);
}
export const config = {matcher: ['/((?!api|_next|.*\\..*).*)']};

import { NextResponse } from 'next/server';

function middleware(req) {
  const { cookies } = req;
  console.log('cookies', cookies);
  const url = req.url;
  const token = cookies.auth ? JSON.parse(cookies.auth).token : null;
  const { pathname, origin } = req.nextUrl;

  if (url.includes('/auth') || url.includes('/login') || url.includes('/register')) {
    if (!token) return NextResponse.next();
    return NextResponse.redirect(origin);
  }

  if (url.includes('/account')) {
    if (!token) return NextResponse.redirect(`${origin}/login`);
    return NextResponse.next();
  }
}

export default middleware;

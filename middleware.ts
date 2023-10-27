// middleware.ts
import { NextRequest, NextFetchEvent, NextResponse } from 'next/server'

const RESTRICTED_COUNTRIES = ['RU', 'US']

export async function middleware(request: NextRequest, _next: NextFetchEvent) {
  const res = NextResponse.next()
  const country = request.geo?.country ?? ''

  if (RESTRICTED_COUNTRIES.includes(country)) {
    return NextResponse.rewrite(new URL('/restricted', request.url))
  }

  return res
}

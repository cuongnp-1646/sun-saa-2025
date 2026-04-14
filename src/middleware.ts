import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/libs/supabase/middleware";

// Routes excluded from the countdown gate (no redirect to /countdown even when active)
const COUNTDOWN_EXCLUDED = new Set(["/countdown", "/login"]);

// Routes that are fully public (no auth required)
// /kudos is the public live board (spec: "publicly accessible; write actions require auth")
const PUBLIC_ROUTES = new Set(["/countdown", "/kudos"]);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Countdown gate (highest priority) ───────────────────────────────────────
  // When NEXT_PUBLIC_COUNTDOWN_ACTIVE=true, redirect all routes to /countdown
  // except /countdown and /login themselves (redirect-loop prevention).
  const countdownActive = process.env.NEXT_PUBLIC_COUNTDOWN_ACTIVE === "true";
  if (countdownActive && !COUNTDOWN_EXCLUDED.has(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/countdown";
    url.search = "";
    return NextResponse.redirect(url);
  }

  // ── Public routes — bypass auth gate ────────────────────────────────────────
  if (PUBLIC_ROUTES.has(pathname)) {
    return NextResponse.next();
  }

  // ── Auth gate ────────────────────────────────────────────────────────────────
  const { supabase, supabaseResponse } = createClient(request);

  // Refresh session and get the current user (server-verified, not just cookie-based)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Unauthenticated user trying to access a protected route → redirect to /login
  if (!user && pathname !== "/login") {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.search = "";
    return NextResponse.redirect(loginUrl);
  }

  // Authenticated user visiting /login → redirect to /
  if (user && pathname === "/login") {
    const homeUrl = request.nextUrl.clone();
    homeUrl.pathname = "/";
    homeUrl.search = "";
    return NextResponse.redirect(homeUrl);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|auth/callback|assets/).*)",
  ],
};

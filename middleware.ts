import { betterFetch } from "@better-fetch/fetch";
import type { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

type Session = typeof auth.$Infer.Session;

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Fetch session
    const { data: session } = await betterFetch<Session>(
        "/api/auth/get-session",
        {
            baseURL: request.nextUrl.origin,
            headers: {
                cookie: request.headers.get("cookie") || "",
            },
        }
    );

    const isLoggedIn = !!session;

    if (!isLoggedIn && pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (isLoggedIn && (pathname === "/login" || pathname === "/register")) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/settings", "/login", "/register"],
};

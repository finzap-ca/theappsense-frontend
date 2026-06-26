import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0];

  if (host === "www.theappsense.com") {
    const url = request.nextUrl.clone();
    url.hostname = "theappsense.com";
    url.port = "";
    url.protocol = "https:";
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const planType = request.cookies.get("plan_type")?.value ?? "free";

  response.headers.set("x-chartify-plan-type", planType);
  return response;
}

export const config = {
  matcher: ["/app/:path*", "/gallery/:path*", "/share/:path*"],
};

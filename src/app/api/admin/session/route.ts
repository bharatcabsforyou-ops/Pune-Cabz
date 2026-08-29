import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  return NextResponse.json({ authed: isAdminRequest(request) });
}

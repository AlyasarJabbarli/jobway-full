import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ error: "Use NextAuth signOut" }, { status: 403 });
}

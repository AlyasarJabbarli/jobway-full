import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  const { email, password, name, role, permissions, active, avatar } = await req.json();
  if (!password || password.length < 6) {
    return NextResponse.json({ error: "Password is required and must be at least 6 characters." }, { status: 400 });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const mod = await db.user.create({
    data: {
      email,
      name,
      role: role || "moderator",
      passwordHash,
      // Add other fields as needed (permissions, active, avatar)
    },
  });
  return NextResponse.json(mod);
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  try {
    const moderators = await db.user.findMany({
      where: { role: "moderator" },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        isActive: true,
        lastLogin: true,
      },
    });
    return NextResponse.json(moderators);
  } catch (error) {
    console.error("Error fetching moderators:", error);
    return NextResponse.json({ error: "Failed to fetch moderators" }, { status: 500 });
  }
}
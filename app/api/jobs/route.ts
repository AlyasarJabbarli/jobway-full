import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db"; // We'll define this later
import { authOptions } from "@/lib/auth"; // For next-auth session validation

export async function GET(req: NextRequest) {
  const jobs = await db.job.findMany({
    include: { company: true },
    orderBy: [
      { is_premium: "desc" },
      { createdAt: "desc" },
    ],
  });
  return NextResponse.json(jobs);
}

// POST new job (admin/mod only)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !["admin", "moderator"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    const user = session.user as { id: string; name?: string | null; email?: string | null; role: string };

    const body = await req.json();
    const job = await db.job.create({
      data: {
        title: body.title,
        description: body.description,
        location: body.location,
        category: body.category,
        type: body.type,
        experience: body.experience,
        salary_min: body.salary?.min ?? body.salary_min,
        salary_max: body.salary?.max ?? body.salary_max,
        is_premium: body.is_premium || false,
        companyId: body.companyId,
        createdById: user.id,
        applicationEmail: body.applicationEmail || null,
        applicationUrl: body.applicationUrl || null,
        expiryDate: body.expiryDate ? new Date(body.expiryDate) : null,
      },
    });

    // Log activity
    await db.activity.create({
      data: {
        type: "job_created",
        itemId: job.id,
        itemType: "job",
        itemName: job.title,
        action: "created",
        userId: user.id,
        userName: user.name || user.email,
      },
    });

    return NextResponse.json(job);
  } catch (error: any) {
    console.error("Error creating job:", error);
    return NextResponse.json({ error: error.message || "Failed to create job" }, { status: 500 });
  }
}
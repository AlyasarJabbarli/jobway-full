import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { authOptions } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const job = await db.job.findUnique({
      where: { id: params.id },
      include: { company: true },
    });

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    const jobWithExpiry = {
      ...job,
      expiryDate: job.expiryDate ? job.expiryDate.toISOString().split('T')[0] : null,
      responsibilities: Array.isArray((job as any).responsibilities)
        ? (job as any).responsibilities
        : (job as any).responsibilities
          ? JSON.parse((job as any).responsibilities as string)
          : [],
      requirements: Array.isArray((job as any).requirements)
        ? (job as any).requirements
        : (job as any).requirements
          ? JSON.parse((job as any).requirements as string)
          : [],
      benefits: Array.isArray((job as any).benefits)
        ? (job as any).benefits
        : (job as any).benefits
          ? JSON.parse((job as any).benefits as string)
          : [],
    };

    return NextResponse.json(jobWithExpiry);
  } catch (error) {
    console.error("Error fetching job:", error);
    return NextResponse.json(
      { error: "Failed to fetch job" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || !["admin", "moderator"].includes(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const {
      title,
      description,
      location,
      category,
      type,
      experience,
      is_premium,
      company,
      expiryDate,
      salary,
      applicationEmail,
      applicationUrl,
      responsibilities,
      requirements,
      benefits,
      employmentType,
      teamSize,
    } = body;

    const job = await db.job.update({
      where: { id: params.id },
      data: {
        title,
        description,
        location,
        category,
        type,
        experience,
        salary_min: salary?.min,
        salary_max: salary?.max,
        is_premium,
        ...(company && { company: { connect: { id: company } } }),
        expiryDate: expiryDate ? new Date(expiryDate) : null,
        applicationEmail,
        applicationUrl,
        ...(responsibilities && { responsibilities: JSON.stringify(responsibilities) }),
        ...(requirements && { requirements: JSON.stringify(requirements) }),
        ...(benefits && { benefits: JSON.stringify(benefits) }),
        employmentType,
        teamSize,
      },
      include: { company: true },
    });

    // Log activity for update
    await db.activity.create({
      data: {
        type: "job_updated",
        itemId: job.id,
        itemType: "job",
        itemName: job.title,
        action: "updated",
        userId: session.user.id,
        userName: session.user.name || session.user.email || "Unknown User",
      },
    });

    const jobWithExpiry = {
      ...job,
      expiryDate: job.expiryDate ? job.expiryDate.toISOString().split('T')[0] : null,
      responsibilities: Array.isArray((job as any).responsibilities)
        ? (job as any).responsibilities
        : (job as any).responsibilities
          ? JSON.parse((job as any).responsibilities as string)
          : [],
      requirements: Array.isArray((job as any).requirements)
        ? (job as any).requirements
        : (job as any).requirements
          ? JSON.parse((job as any).requirements as string)
          : [],
      benefits: Array.isArray((job as any).benefits)
        ? (job as any).benefits
        : (job as any).benefits
          ? JSON.parse((job as any).benefits as string)
          : [],
    };

    return NextResponse.json(jobWithExpiry);
  } catch (error) {
    console.error("Error updating job:", error);
    return NextResponse.json(
      { error: (error as any)?.message || JSON.stringify(error) || "Failed to update job" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || !["admin", "moderator"].includes(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    // Fetch job before deleting for logging
    const job = await db.job.findUnique({ where: { id: params.id } });
    await db.job.delete({
      where: { id: params.id },
    });
    // Log activity for deletion
    if (job) {
      await db.activity.create({
        data: {
          type: "job_deleted",
          itemId: job.id,
          itemType: "job",
          itemName: job.title,
          action: "deleted",
          userId: session.user.id,
          userName: session.user.name || session.user.email || "Unknown User",
        },
      });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting job:", error);
    return NextResponse.json(
      { error: "Failed to delete job" },
      { status: 500 }
    );
  }
} 
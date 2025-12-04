import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import fs from "fs";
import path from "path";

// Disable Next.js default body parser for this route
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const company = await db.company.findUnique({
      where: { id: params.id },
      include: { jobs: true },
    });

    if (!company) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    return NextResponse.json(company);
  } catch (error) {
    console.error("Error fetching company:", error);
    return NextResponse.json(
      { error: "Failed to fetch company" },
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
    const data = await req.formData();
    const name = data.get('name') as string | null;
    const location = data.get('location') as string | null;
    const description = data.get('description') as string | null;
    const logo = data.get('logo') as File | null;
    const website = data.get('website') as string | null;
    const email = data.get('email') as string | null;
    const phone = data.get('phone') as string | null;

    if (!name) {
      return NextResponse.json({ error: "Company name is required" }, { status: 400 });
    }

    let logoUrl: string | undefined;

    if (logo) {
      const fileBuffer = Buffer.from(await logo.arrayBuffer());
      const fileName = `${Date.now()}_${logo.name}`;
      const filePath = path.join(process.cwd(), 'public', fileName);
      await fs.promises.writeFile(filePath, fileBuffer);
      logoUrl = `/${fileName}`;
    }

    const company = await db.company.update({
      where: { id: params.id },
      data: {
        name,
        description,
        location,
        website,
        email,
        phone,
        ...(logoUrl && { logoUrl }),
      },
      include: { jobs: true },
    });

    // Log activity
    await db.activity.create({
      data: {
        type: "company_updated",
        itemId: company.id,
        itemType: "company",
        itemName: company.name,
        action: "updated",
        userId: session.user.id,
        userName: session.user.name || session.user.email || "Unknown User",
      },
    });

    return NextResponse.json(company);
  } catch (error) {
    console.error("Error updating company:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to update company";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
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
    // Fetch company before deleting for logging
    const company = await db.company.findUnique({ where: { id: params.id } });
    await db.company.delete({
      where: { id: params.id },
    });
    // Log activity for deletion
    if (company) {
      await db.activity.create({
        data: {
          type: "company_deleted",
          itemId: company.id,
          itemType: "company",
          itemName: company.name,
          action: "deleted",
          userId: session.user.id,
          userName: session.user.name || session.user.email || "Unknown User",
        },
      });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting company:", error);
    return NextResponse.json(
      { error: "Failed to delete company" },
      { status: 500 }
    );
  }
} 
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

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !["admin", "moderator"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

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

    let logoUrl: string | null = null;
    if (logo) {
      const fileBuffer = Buffer.from(await logo.arrayBuffer());
      const fileName = `${Date.now()}_${logo.name}`;
      const filePath = path.join(process.cwd(), 'public', fileName);
      await fs.promises.writeFile(filePath, fileBuffer);
      logoUrl = `/${fileName}`;
    }

    const company = await db.company.create({
      data: {
        name,
        location,
        description,
        logoUrl,
        createdById: session.user.id,
        website,
        email,
        phone,
      },
    });

    // Log activity
    await db.activity.create({
      data: {
        type: "company_created",
        itemId: company.id,
        itemType: "company",
        itemName: company.name,
        action: "created",
        userId: session.user.id,
        userName: session.user.name || session.user.email || "Unknown User",
      },
    });

    return NextResponse.json(company);
  } catch (error) {
    console.error("API /api/companies POST error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const companies = await db.company.findMany({
    select: {
      id: true,
      name: true,
      location: true,
      logoUrl: true,
      description: true,
      createdAt: true,
      _count: {
        select: { jobs: true },
      },
    },
    orderBy: { name: "asc" },
  });

  const formattedCompanies = companies.map(company => ({
    id: company.id,
    name: company.name,
    location: company.location ?? "Remote",
    logo: company.logoUrl ?? "/placeholder-logo.svg",
    description: company.description ?? "No description available.",
    founded: new Date(company.createdAt).getFullYear(),
    jobCount: company._count.jobs,
    industry: "Technology", // Default industry since we don't have this in the schema
    size: "1-50", // Default size since we don't have this in the schema
    website: company.website ?? '#',
    email: company.email ?? 'contact@example.com',
    phone: company.phone ?? '+1 (555) 000-0000',
    socialMedia: {
      linkedin: '#',
      twitter: '#',
      facebook: '#'
    },
    culture: [
      "Innovation-driven workplace",
      "Remote-friendly environment",
      "Continuous learning",
      "Work-life balance"
    ],
    benefits: [
      "Competitive salary",
      "Health insurance",
      "Flexible working hours",
      "Professional development"
    ],
    techStack: ["JavaScript", "React", "Node.js", "PostgreSQL"]
  }));

  return NextResponse.json(formattedCompanies);
}
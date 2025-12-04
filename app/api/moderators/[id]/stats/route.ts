import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  const moderatorId = params.id;
  try {
    // Total jobs created
    const totalJobsCreated = await db.job.count({ where: { createdById: moderatorId } });
    // Premium jobs created
    const premiumJobsCreated = await db.job.count({ where: { createdById: moderatorId, is_premium: true } });
    // Standard jobs created
    const standardJobsCreated = await db.job.count({ where: { createdById: moderatorId, is_premium: false } });
    // Companies created
    const companiesCreated = await db.company.count({ where: { createdById: moderatorId } });
    // Monthly stats for last 6 months
    const now = new Date();
    const months = Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    }).reverse();
    const monthlyStats = await Promise.all(
      months.map(async ({ year, month }) => {
        const monthStart = new Date(year, month, 1);
        const monthEnd = new Date(year, month + 1, 1);
        const jobsCreated = await db.job.count({
          where: {
            createdById: moderatorId,
            createdAt: { gte: monthStart, lt: monthEnd },
          },
        });
        const companiesCreated = await db.company.count({
          where: {
            createdById: moderatorId,
            createdAt: { gte: monthStart, lt: monthEnd },
          },
        });
        return {
          month: monthStart.toLocaleString('default', { month: 'short', year: 'numeric' }),
          jobsCreated,
          companiesCreated,
        };
      })
    );
    return NextResponse.json({
      totalJobsCreated,
      premiumJobsCreated,
      standardJobsCreated,
      companiesCreated,
      monthlyStats,
    });
  } catch (error) {
    console.error("Error fetching moderator stats:", error);
    return NextResponse.json({ error: "Failed to fetch moderator stats" }, { status: 500 });
  }
} 
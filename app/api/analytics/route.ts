import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  // Fetch all jobs and companies
  const [jobs, companies, moderators] = await Promise.all([
    db.job.findMany(),
    db.company.findMany(),
    db.user.findMany({ where: { role: "moderator" } }),
  ]);

  // Jobs by category
  const jobsByCategory = jobs.reduce((acc: Record<string, number>, job: any) => {
    acc[job.category] = (acc[job.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Jobs by location
  const jobsByLocation = jobs.reduce((acc: Record<string, number>, job: any) => {
    acc[job.location] = (acc[job.location] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Companies by industry (no industry field, so return empty object)
  const companiesByIndustry = {};

  // Monthly growth (last 6 months)
  const now = new Date();
  const months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    return { year: d.getFullYear(), month: d.getMonth() };
  }).reverse();

  const monthlyGrowth = months.map(({ year, month }) => {
    const monthStart = new Date(year, month, 1);
    const monthEnd = new Date(year, month + 1, 1);
    const jobsCount = jobs.filter((j: any) => j.createdAt >= monthStart && j.createdAt < monthEnd).length;
    const companiesCount = companies.filter((c: any) => c.createdAt >= monthStart && c.createdAt < monthEnd).length;
    return {
      month: monthStart.toLocaleString('default', { month: 'short', year: 'numeric' }),
      jobs: jobsCount,
      companies: companiesCount,
    };
  });

  // Top performing moderators (by jobs created)
  const moderatorJobCounts: Record<string, { id: string, name: string, jobsCreated: number }> = {};
  for (const job of jobs as any[]) {
    if (!moderatorJobCounts[job.createdById]) {
      const mod = (moderators as any[]).find((m: any) => m.id === job.createdById);
      moderatorJobCounts[job.createdById] = {
        id: job.createdById,
        name: mod?.name || mod?.email || 'Unknown',
        jobsCreated: 0,
      };
    }
    moderatorJobCounts[job.createdById].jobsCreated++;
  }
  const topPerformingModerators = Object.values(moderatorJobCounts)
    .sort((a, b) => b.jobsCreated - a.jobsCreated)
    .slice(0, 5);

  // Calculate totals
  const totalJobs = jobs.length;
  const activeJobs = jobs.length; // No explicit active field, so use all
  const premiumJobs = (jobs as any[]).filter((j: any) => j.is_premium).length;
  const standardJobs = (jobs as any[]).filter((j: any) => !j.is_premium).length;
  const totalCompanies = companies.length;
  const totalModerators = moderators.length;

  const analytics = {
    totalJobs,
    activeJobs,
    premiumJobs,
    standardJobs,
    totalCompanies,
    totalModerators,
    jobsByCategory,
    jobsByLocation,
    companiesByIndustry,
    monthlyGrowth,
    topPerformingModerators,
  };

  return NextResponse.json(analytics);
}

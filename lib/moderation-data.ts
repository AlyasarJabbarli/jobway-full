import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface SessionUser {
  id: string;
  role: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export interface ActivityItem {
  id: string;
  type: "job_review" | "company_review" | "user_report";
  status: "approved" | "rejected" | "pending";
  title: string;
  timestamp: string;
  details: string;
}

export async function getCurrentModerator() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    throw new Error("Not authenticated");
  }

  const user = session.user as SessionUser;
  if (!user.id) {
    throw new Error("User ID not found");
  }

  const moderator = await db.user.findUnique({
    where: { id: user.id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      isActive: true,
    },
  });

  if (!moderator) {
    throw new Error("Moderator not found");
  }

  return moderator;
}

export async function getModerationStats() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    throw new Error("Not authenticated");
  }

  const user = session.user as SessionUser;
  if (!user.id) {
    throw new Error("User ID not found");
  }

  // Get total jobs reviewed by this moderator
  const totalReviewed = await db.job.count({
    where: { createdById: user.id },
  });

  // Get pending jobs (jobs created in the last 24 hours)
  const pendingReviews = await db.job.count({
    where: {
      createdAt: {
        gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
    },
  });

  // Get total jobs managed by this moderator
  const totalJobs = await db.job.count({
    where: { createdById: user.id },
  });

  // Get total companies managed by this moderator
  const totalCompanies = await db.company.count({
    where: { createdById: user.id },
  });

  // Get monthly activity for the last 6 months
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const monthlyActivity = await db.job.groupBy({
    by: ['createdAt'],
    where: {
      createdById: user.id,
      createdAt: {
        gte: sixMonthsAgo,
      },
    },
    _count: true,
  });

  // Format monthly activity data
  const formattedMonthlyActivity = monthlyActivity.map(activity => ({
    month: activity.createdAt.toLocaleString('default', { month: 'short' }),
    reviews: activity._count,
  }));

  return {
    totalReviewed,
    pendingReviews,
    totalJobs,
    totalCompanies,
    averageResponseTime: "2.5 hours", // This would need to be calculated based on actual data
    accuracy: 98.5, // This would need to be calculated based on actual data
    monthlyActivity: formattedMonthlyActivity,
  };
}

export async function getRecentActivity(): Promise<ActivityItem[]> {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    throw new Error("Not authenticated");
  }

  const user = session.user as SessionUser;
  if (!user.id) {
    throw new Error("User ID not found");
  }

  // Get recent jobs
  const recentJobs = await db.job.findMany({
    where: {
      createdById: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 10,
    include: {
      company: true,
    },
  });

  // Convert jobs to activity items
  return recentJobs.map(job => ({
    id: job.id,
    type: "job_review",
    status: "approved", // This would need to be determined based on actual data
    title: job.title,
    timestamp: job.createdAt.toISOString(),
    details: `Job listing for ${job.company.name}`,
  }));
}

export async function getModerationActivity(): Promise<ActivityItem[]> {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    throw new Error("Not authenticated");
  }

  const user = session.user as SessionUser;
  if (!user.id) {
    throw new Error("User ID not found");
  }

  // Get all jobs created by this moderator
  const jobs = await db.job.findMany({
    where: {
      createdById: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      company: true,
    },
  });

  // Convert jobs to activity items
  return jobs.map(job => ({
    id: job.id,
    type: "job_review",
    status: "approved", // This would need to be determined based on actual data
    title: job.title,
    timestamp: job.createdAt.toISOString(),
    details: `Job listing for ${job.company.name}`,
  }));
}

// Fetch all jobs created by the current moderator
export async function getModeratorJobs() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    throw new Error("Not authenticated");
  }

  const user = session.user as SessionUser;
  if (!user.id) {
    throw new Error("User ID not found");
  }

  const jobs = await db.job.findMany({
    where: { createdById: user.id },
    orderBy: { createdAt: 'desc' },
    include: { company: true },
  });

  return jobs.map(job => ({
    id: job.id,
    title: job.title,
    company: job.company?.name ?? '',
    location: job.location ?? '',
    type: job.type ?? (job.is_premium ? 'Premium' : 'Simple'),
    createdAt: job.createdAt,
  }));
}

// Fetch all companies created by the current moderator
export async function getModeratorCompanies() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    throw new Error("Not authenticated");
  }

  const user = session.user as SessionUser;
  if (!user.id) {
    throw new Error("User ID not found");
  }

  const companies = await db.company.findMany({
    where: { createdById: user.id },
    orderBy: { createdAt: 'desc' },
  });

  return companies.map(company => ({
    id: company.id,
    name: company.name,
    industry: '', // Add industry if available in your schema
    location: company.location ?? '',
    logoUrl: company.logoUrl ?? '',
    description: company.description ?? '',
    createdAt: company.createdAt,
  }));
}

// Fetch a job by its ID
export async function getJobById(id: string) {
  const job = await db.job.findUnique({
    where: { id },
    include: { company: true },
  });
  if (!job) return null;
  return {
    id: job.id,
    title: job.title,
    company: job.company?.name ?? '',
    location: job.location ?? '',
    type: job.type ?? (job.is_premium ? 'Premium' : 'Simple'),
    description: job.description ?? '',
    experience: job.experience ?? '',
    salary_min: job.salary_min,
    salary_max: job.salary_max,
    companyId: job.companyId,
    requirements: job.requirements ?? [],
    benefits: job.benefits ?? [],
    responsibilities: job.responsibilities ?? [],
    employmentType: job.employmentType ?? '',
    teamSize: job.teamSize ?? '',
    datePosted: job.createdAt,
    applicationEmail: job.applicationEmail ?? '',
    applicationUrl: job.applicationUrl ?? '',
    expiryDate: job.expiryDate ?? '',
    category: job.category ?? '',
    is_premium: job.is_premium ?? false,
  };
} 
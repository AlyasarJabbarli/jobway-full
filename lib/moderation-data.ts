import type {
  ModerationReport,
  ContentFlag,
  ModerationActivity,
  ModerationStats,
  ModeratorUser,
} from "./moderation-types"

// Mock current moderator user
export const currentModerator: ModeratorUser = {
  id: "mod-1",
  email: "sarah.moderator@jobportal.com",
  name: "Sarah Johnson",
  role: "moderator",
  avatar: "/placeholder.svg?height=40&width=40",
  createdAt: new Date("2023-02-15"),
  lastLogin: new Date(),
  isActive: true,
  permissions: [
    {
      id: "mod-jobs",
      name: "Job Management",
      description: "Full access to job postings",
      resource: "jobs",
      actions: ["create", "read", "update", "delete", "moderate"],
    },
    {
      id: "mod-companies",
      name: "Company Management",
      description: "Full access to company profiles",
      resource: "companies",
      actions: ["create", "read", "update", "delete", "moderate"],
    },
    {
      id: "mod-reports",
      name: "Report Management",
      description: "Handle user reports and complaints",
      resource: "reports",
      actions: ["read", "update", "moderate"],
    },
    {
      id: "mod-flags",
      name: "Content Flags",
      description: "Manage content flags and reviews",
      resource: "flags",
      actions: ["create", "read", "update", "moderate"],
    },
  ],
  stats: {
    totalReportsResolved: 127,
    totalContentModerated: 89,
    averageResolutionTime: 2.4,
    accuracyScore: 94.2,
  },
}

// Mock moderation reports
export const moderationReports: ModerationReport[] = [
  {
    id: "report-1",
    type: "job",
    targetId: "job-1",
    targetTitle: "Senior Frontend Developer",
    reportedBy: "John Doe",
    reporterEmail: "john@example.com",
    reason: "fake",
    description: "This job posting seems fake. The company doesn't exist and the salary is unrealistic.",
    status: "pending",
    priority: "high",
    assignedTo: "mod-1",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    evidence: ["screenshot1.png", "email_thread.pdf"],
  },
  {
    id: "report-2",
    type: "company",
    targetId: "company-1",
    targetTitle: "TechCorp Inc.",
    reportedBy: "Jane Smith",
    reporterEmail: "jane@example.com",
    reason: "inappropriate",
    description: "Company profile contains inappropriate content and misleading information.",
    status: "reviewing",
    priority: "medium",
    assignedTo: "mod-1",
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
  },
  {
    id: "report-3",
    type: "job",
    targetId: "job-2",
    targetTitle: "Marketing Manager",
    reportedBy: "Bob Wilson",
    reporterEmail: "bob@example.com",
    reason: "outdated",
    description: "This job has been filled but is still showing as active.",
    status: "resolved",
    priority: "low",
    assignedTo: "mod-1",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    resolvedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    resolution: "Job posting updated and marked as filled.",
  },
]

// Mock content flags
export const contentFlags: ContentFlag[] = [
  {
    id: "flag-1",
    contentType: "job",
    contentId: "job-3",
    contentTitle: "Data Scientist Position",
    flagType: "expired",
    reason: "Job posting is over 60 days old",
    flaggedBy: "system",
    flaggedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    status: "active",
  },
  {
    id: "flag-2",
    contentType: "company",
    contentId: "company-2",
    contentTitle: "StartupXYZ",
    flagType: "needs_update",
    reason: "Company information appears outdated",
    flaggedBy: "mod-1",
    flaggedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    status: "active",
    notes: "Website URL returns 404, contact information may be invalid",
  },
  {
    id: "flag-3",
    contentType: "job",
    contentId: "job-4",
    contentTitle: "Remote Developer",
    flagType: "suspicious",
    reason: "Unusually high salary for entry level position",
    flaggedBy: "mod-1",
    flaggedAt: new Date(Date.now() - 18 * 60 * 60 * 1000),
    status: "resolved",
    resolvedBy: "mod-1",
    resolvedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    notes: "Verified with company, salary is accurate for specialized skills required",
  },
]

// Mock moderation activity
export const moderationActivity: ModerationActivity[] = [
  {
    id: "activity-1",
    moderatorId: "mod-1",
    moderatorName: "Sarah Johnson",
    action: "resolved",
    targetType: "report",
    targetId: "report-3",
    targetTitle: "Marketing Manager Report",
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    details: "Job posting updated and marked as filled",
    reason: "Outdated job posting",
  },
  {
    id: "activity-2",
    moderatorId: "mod-1",
    moderatorName: "Sarah Johnson",
    action: "flagged",
    targetType: "company",
    targetId: "company-2",
    targetTitle: "StartupXYZ",
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    details: "Flagged for outdated information",
  },
  {
    id: "activity-3",
    moderatorId: "mod-1",
    moderatorName: "Sarah Johnson",
    action: "approved",
    targetType: "job",
    targetId: "job-5",
    targetTitle: "UX Designer",
    timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000),
    details: "Job posting approved after review",
  },
]

// Mock moderation stats
export const moderationStats: ModerationStats = {
  pendingReports: 2,
  activeFlags: 2,
  resolvedToday: 3,
  totalResolved: 127,
  averageResolutionTime: 2.4,
  reportsByType: {
    job: 8,
    company: 3,
    user: 2,
    content: 1,
  },
  flagsByType: {
    expired: 5,
    needs_update: 3,
    suspicious: 2,
    pending_review: 4,
  },
  moderatorActivity: [
    {
      moderatorId: "mod-1",
      moderatorName: "Sarah Johnson",
      actionsToday: 5,
      totalActions: 234,
    },
  ],
}

// Helper functions
export function hasModeratorPermission(moderator: ModeratorUser, resource: string, action: string): boolean {
  return moderator.permissions.some(
    (permission) => permission.resource === resource && permission.actions.includes(action as any),
  )
}

export function getReportsByStatus(status: string): ModerationReport[] {
  return moderationReports.filter((report) => report.status === status)
}

export function getFlagsByStatus(status: string): ContentFlag[] {
  return contentFlags.filter((flag) => flag.status === status)
}

export function getRecentActivity(limit = 10): ModerationActivity[] {
  return moderationActivity.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, limit)
}

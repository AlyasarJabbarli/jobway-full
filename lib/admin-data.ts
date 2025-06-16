import type { User, ModeratorStats, PlatformAnalytics } from "./auth-types"

// Mock current user - in real app this would come from authentication
export const currentUser: User = {
  id: "admin-1",
  email: "admin@jobportal.com",
  name: "John Admin",
  role: "admin",
  avatar: "/placeholder.svg?height=40&width=40",
  createdAt: new Date("2023-01-01"),
  lastLogin: new Date(),
  isActive: true,
  permissions: [
    {
      id: "admin-jobs",
      name: "Job Management",
      description: "Full access to job postings",
      resource: "jobs",
      actions: ["create", "read", "update", "delete"],
    },
    {
      id: "admin-companies",
      name: "Company Management",
      description: "Full access to company profiles",
      resource: "companies",
      actions: ["create", "read", "update", "delete"],
    },
    {
      id: "admin-moderators",
      name: "Moderator Management",
      description: "Full access to moderator accounts",
      resource: "moderators",
      actions: ["create", "read", "update", "delete"],
    },
    {
      id: "admin-analytics",
      name: "Analytics Access",
      description: "Access to platform analytics",
      resource: "analytics",
      actions: ["read"],
    },
  ],
}

// Mock moderators data
export const moderatorsData: User[] = [
  {
    id: "mod-1",
    email: "sarah.moderator@jobportal.com",
    name: "Sarah Johnson",
    role: "moderator",
    avatar: "/placeholder.svg?height=40&width=40",
    createdAt: new Date("2023-02-15"),
    lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    isActive: true,
    permissions: [
      {
        id: "mod-jobs",
        name: "Job Management",
        description: "Full access to job postings",
        resource: "jobs",
        actions: ["create", "read", "update", "delete"],
      },
      {
        id: "mod-companies",
        name: "Company Management",
        description: "Full access to company profiles",
        resource: "companies",
        actions: ["create", "read", "update", "delete"],
      },
    ],
  },
  {
    id: "mod-2",
    email: "mike.moderator@jobportal.com",
    name: "Mike Chen",
    role: "moderator",
    avatar: "/placeholder.svg?height=40&width=40",
    createdAt: new Date("2023-03-10"),
    lastLogin: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    isActive: true,
    permissions: [
      {
        id: "mod-jobs",
        name: "Job Management",
        description: "Full access to job postings",
        resource: "jobs",
        actions: ["create", "read", "update", "delete"],
      },
      {
        id: "mod-companies",
        name: "Company Management",
        description: "Full access to company profiles",
        resource: "companies",
        actions: ["create", "read", "update", "delete"],
      },
    ],
  },
  {
    id: "mod-3",
    email: "emily.moderator@jobportal.com",
    name: "Emily Rodriguez",
    role: "moderator",
    avatar: "/placeholder.svg?height=40&width=40",
    createdAt: new Date("2023-04-05"),
    lastLogin: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    isActive: false,
    permissions: [
      {
        id: "mod-jobs",
        name: "Job Management",
        description: "Full access to job postings",
        resource: "jobs",
        actions: ["create", "read", "update", "delete"],
      },
      {
        id: "mod-companies",
        name: "Company Management",
        description: "Full access to company profiles",
        resource: "companies",
        actions: ["create", "read", "update", "delete"],
      },
    ],
  },
]

// Mock moderator statistics
export const moderatorStats: ModeratorStats[] = [
  {
    id: "stats-1",
    moderatorId: "mod-1",
    totalJobsCreated: 45,
    premiumJobsCreated: 18,
    standardJobsCreated: 27,
    companiesCreated: 12,
    lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000),
    monthlyStats: [
      { month: "2024-01", jobsCreated: 8, companiesCreated: 3 },
      { month: "2024-02", jobsCreated: 12, companiesCreated: 4 },
      { month: "2024-03", jobsCreated: 15, companiesCreated: 3 },
      { month: "2024-04", jobsCreated: 10, companiesCreated: 2 },
    ],
  },
  {
    id: "stats-2",
    moderatorId: "mod-2",
    totalJobsCreated: 32,
    premiumJobsCreated: 14,
    standardJobsCreated: 18,
    companiesCreated: 8,
    lastActivity: new Date(Date.now() - 24 * 60 * 60 * 1000),
    monthlyStats: [
      { month: "2024-01", jobsCreated: 6, companiesCreated: 2 },
      { month: "2024-02", jobsCreated: 9, companiesCreated: 3 },
      { month: "2024-03", jobsCreated: 11, companiesCreated: 2 },
      { month: "2024-04", jobsCreated: 6, companiesCreated: 1 },
    ],
  },
  {
    id: "stats-3",
    moderatorId: "mod-3",
    totalJobsCreated: 28,
    premiumJobsCreated: 10,
    standardJobsCreated: 18,
    companiesCreated: 6,
    lastActivity: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    monthlyStats: [
      { month: "2024-01", jobsCreated: 7, companiesCreated: 2 },
      { month: "2024-02", jobsCreated: 8, companiesCreated: 2 },
      { month: "2024-03", jobsCreated: 9, companiesCreated: 1 },
      { month: "2024-04", jobsCreated: 4, companiesCreated: 1 },
    ],
  },
]

// Mock platform analytics
export const platformAnalytics: PlatformAnalytics = {
  totalJobs: 105,
  totalCompanies: 26,
  totalModerators: 3,
  activeJobs: 89,
  premiumJobs: 42,
  standardJobs: 63,
  jobsByCategory: {
    Engineering: 35,
    Marketing: 18,
    Design: 12,
    Sales: 15,
    HR: 8,
    Finance: 10,
    Healthcare: 7,
  },
  jobsByLocation: {
    "San Francisco": 25,
    Remote: 30,
    "New York": 18,
    London: 12,
    Berlin: 8,
    Boston: 12,
  },
  companiesByIndustry: {
    Technology: 15,
    Healthcare: 4,
    Finance: 3,
    "Design & Creative": 2,
    "Sales & Marketing": 1,
    "Human Resources": 1,
  },
  monthlyGrowth: [
    { month: "2024-01", jobs: 21, companies: 7 },
    { month: "2024-02", jobs: 29, companies: 9 },
    { month: "2024-03", jobs: 35, companies: 7 },
    { month: "2024-04", jobs: 20, companies: 3 },
  ],
  topPerformingModerators: [
    { id: "mod-1", name: "Sarah Johnson", jobsCreated: 45 },
    { id: "mod-2", name: "Mike Chen", jobsCreated: 32 },
    { id: "mod-3", name: "Emily Rodriguez", jobsCreated: 28 },
  ],
}

// Helper functions
export function hasPermission(user: User, resource: string, action: string): boolean {
  return user.permissions.some(
    (permission) => permission.resource === resource && permission.actions.includes(action as any),
  )
}

export function getModeratorStats(moderatorId: string): ModeratorStats | undefined {
  return moderatorStats.find((stats) => stats.moderatorId === moderatorId)
}

export function getModerator(moderatorId: string): User | undefined {
  return moderatorsData.find((mod) => mod.id === moderatorId)
}

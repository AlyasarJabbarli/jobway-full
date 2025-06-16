export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "moderator"
  avatar?: string
  createdAt: Date
  lastLogin?: Date
  isActive: boolean
  permissions: Permission[]
}

export interface Permission {
  id: string
  name: string
  description: string
  resource: "jobs" | "companies" | "moderators" | "analytics"
  actions: ("create" | "read" | "update" | "delete")[]
}

export interface ModeratorStats {
  id: string
  moderatorId: string
  totalJobsCreated: number
  premiumJobsCreated: number
  standardJobsCreated: number
  companiesCreated: number
  lastActivity: Date
  monthlyStats: {
    month: string
    jobsCreated: number
    companiesCreated: number
  }[]
}

export interface PlatformAnalytics {
  totalJobs: number
  totalCompanies: number
  totalModerators: number
  activeJobs: number
  premiumJobs: number
  standardJobs: number
  jobsByCategory: Record<string, number>
  jobsByLocation: Record<string, number>
  companiesByIndustry: Record<string, number>
  monthlyGrowth: {
    month: string
    jobs: number
    companies: number
  }[]
  topPerformingModerators: {
    id: string
    name: string
    jobsCreated: number
  }[]
}

// Role-based permissions
export const ROLE_PERMISSIONS: Record<string, Permission[]> = {
  admin: [
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
  moderator: [
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
}

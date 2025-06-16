export interface ModerationReport {
  id: string
  type: "job" | "company" | "user" | "content"
  targetId: string
  targetTitle: string
  reportedBy: string
  reporterEmail: string
  reason: "inappropriate" | "spam" | "fake" | "outdated" | "other"
  description: string
  status: "pending" | "reviewing" | "resolved" | "dismissed"
  priority: "low" | "medium" | "high" | "urgent"
  assignedTo?: string
  createdAt: Date
  updatedAt: Date
  resolvedAt?: Date
  resolution?: string
  evidence?: string[]
}

export interface ContentFlag {
  id: string
  contentType: "job" | "company"
  contentId: string
  contentTitle: string
  flagType: "expired" | "needs_update" | "suspicious" | "pending_review" | "manual"
  reason: string
  flaggedBy: string
  flaggedAt: Date
  status: "active" | "resolved" | "dismissed"
  resolvedBy?: string
  resolvedAt?: Date
  notes?: string
}

export interface ModerationActivity {
  id: string
  moderatorId: string
  moderatorName: string
  action: "approved" | "rejected" | "flagged" | "updated" | "deleted" | "resolved" | "assigned"
  targetType: "job" | "company" | "report" | "flag"
  targetId: string
  targetTitle: string
  timestamp: Date
  details?: string
  reason?: string
}

export interface ModerationStats {
  pendingReports: number
  activeFlags: number
  resolvedToday: number
  totalResolved: number
  averageResolutionTime: number
  reportsByType: Record<string, number>
  flagsByType: Record<string, number>
  moderatorActivity: {
    moderatorId: string
    moderatorName: string
    actionsToday: number
    totalActions: number
  }[]
}

export interface ModeratorUser {
  id: string
  email: string
  name: string
  role: "moderator"
  avatar?: string
  createdAt: Date
  lastLogin?: Date
  isActive: boolean
  permissions: ModeratorPermission[]
  stats: {
    totalReportsResolved: number
    totalContentModerated: number
    averageResolutionTime: number
    accuracyScore: number
  }
}

export interface ModeratorPermission {
  id: string
  name: string
  description: string
  resource: "jobs" | "companies" | "reports" | "flags"
  actions: ("create" | "read" | "update" | "delete" | "moderate")[]
}

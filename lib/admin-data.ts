"use client"

import { apiClient } from "./api-client"
import { useSession } from "next-auth/react"
import { ModeratorUser } from "./moderation-types"
import { useEffect, useState } from "react"

// Types
export interface PlatformAnalytics {
  totalJobs: number
  activeJobs: number
  premiumJobs: number
  totalCompanies: number
  totalModerators: number
  jobsByCategory: Record<string, number>
  jobsByLocation: Record<string, number>
  companiesByIndustry: Record<string, number>
  monthlyGrowth: Array<{
    month: string
    jobs: number
    companies: number
  }>
  topPerformingModerators: Array<{
    id: string
    name: string
    jobsCreated: number
  }>
}

export interface ModeratorStats {
  jobsCreated: number
  companiesCreated: number
  activeJobs: number
  lastActive: string
}

// Data fetching functions
export async function getPlatformAnalytics(): Promise<PlatformAnalytics> {
  const response = await fetch("/api/analytics")
  if (!response.ok) throw new Error("Failed to fetch platform analytics")
  return response.json()
}

export async function getModerators(): Promise<ModeratorUser[]> {
  return apiClient.getModerators()
}

export async function getModeratorStats(moderatorId: string): Promise<ModeratorStats> {
  const response = await fetch(`/api/moderators/${moderatorId}/stats`)
  if (!response.ok) throw new Error("Failed to fetch moderator stats")
  return response.json()
}

// Hook for current user
export function useCurrentUser() {
  const { data: session } = useSession()
  return session?.user
}

// Hook for platform analytics
export function usePlatformAnalytics() {
  const [analytics, setAnalytics] = useState<PlatformAnalytics>({
    totalJobs: 0,
    activeJobs: 0,
    premiumJobs: 0,
    totalCompanies: 0,
    totalModerators: 0,
    jobsByCategory: {},
    jobsByLocation: {},
    companiesByIndustry: {},
    monthlyGrowth: [],
    topPerformingModerators: []
  })

  useEffect(() => {
    getPlatformAnalytics()
      .then(setAnalytics)
      .catch(console.error)
  }, [])

  return analytics
}

// Hook for moderators data
export function useModeratorsData() {
  const [moderators, setModerators] = useState<ModeratorUser[]>([])

  useEffect(() => {
    getModerators()
      .then(setModerators)
      .catch(console.error)
  }, [])

  return moderators
} 
"use client"

import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BarChart3, TrendingUp, Users, Briefcase, Building2, Award, Target } from "lucide-react"
import { useCurrentUser, usePlatformAnalytics, useModeratorsData, getModeratorStats, ModeratorStats, PlatformAnalytics } from "../../../lib/admin-data"
import { useEffect, useState } from "react"
import { apiClient } from "@/lib/api-client"

interface MonthlyGrowth {
  month: string
  jobs: number
  companies: number
}

interface TopPerformingModerator {
  id: string
  name: string
  jobsCreated: number
}

export default function AnalyticsPage() {
  const currentUser = useCurrentUser()
  const platformAnalytics = usePlatformAnalytics()
  const moderatorsData = useModeratorsData()
  const [moderatorStats, setModeratorStats] = useState<Record<string, ModeratorStats>>({})
  const [companiesWithJobs, setCompaniesWithJobs] = useState<number | null>(null)

  useEffect(() => {
    const fetchModeratorStats = async () => {
      const stats: Record<string, ModeratorStats> = {}
      for (const moderator of platformAnalytics.topPerformingModerators) {
        try {
          stats[moderator.id] = await getModeratorStats(moderator.id)
        } catch (error) {
          console.error(`Failed to fetch stats for moderator ${moderator.id}:`, error)
        }
      }
      setModeratorStats(stats)
    }

    if (platformAnalytics.topPerformingModerators.length > 0) {
      fetchModeratorStats()
    }
  }, [platformAnalytics.topPerformingModerators])

  useEffect(() => {
    // Fetch jobs and calculate companies with jobs
    async function fetchCompaniesWithJobs() {
      try {
        const jobs = await apiClient.getJobs()
        const companyIds = new Set(jobs.map((job: any) => job.companyId).filter(Boolean))
        setCompaniesWithJobs(companyIds.size)
      } catch (error) {
        setCompaniesWithJobs(null)
      }
    }
    fetchCompaniesWithJobs()
  }, [])

  // Redirect if not admin
  if (!currentUser || currentUser.role !== "admin") {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Comprehensive platform insights and performance metrics</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{platformAnalytics.totalJobs}</div>
              <p className="text-xs text-muted-foreground">
                {platformAnalytics.activeJobs} active (
                {Math.round((platformAnalytics.activeJobs / platformAnalytics.totalJobs) * 100)}%)
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Premium Jobs</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{platformAnalytics.premiumJobs}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((platformAnalytics.premiumJobs / platformAnalytics.totalJobs) * 100)}% of total jobs
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Companies</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{platformAnalytics.totalCompanies}</div>
              <p className="text-xs text-muted-foreground">
                {companiesWithJobs !== null ? `${companiesWithJobs} companies with jobs` : "Loading..."}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Moderators</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{platformAnalytics.totalModerators}</div>
              <p className="text-xs text-muted-foreground">
                {moderatorsData.filter((m: { isActive: boolean }) => m.isActive).length} active moderators
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Jobs by Category */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Jobs by Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(platformAnalytics.jobsByCategory)
                  .sort(([, a], [, b]) => (b as number) - (a as number))
                  .map(([category, count]) => (
                    <div key={category} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{category}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{
                              width: `${((count as number) / Math.max(...Object.values(platformAnalytics.jobsByCategory).map(v => v as number))) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 w-8 text-right">{String(count)}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Jobs by Location */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Jobs by Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(platformAnalytics.jobsByLocation)
                  .sort(([, a], [, b]) => (b as number) - (a as number))
                  .map(([location, count]) => (
                    <div key={location} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{location}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{
                              width: `${((count as number) / Math.max(...Object.values(platformAnalytics.jobsByLocation).map(v => v as number))) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 w-8 text-right">{String(count)}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Growth */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Monthly Growth Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {platformAnalytics.monthlyGrowth.map((month: MonthlyGrowth) => (
                <div key={month.month} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">{month.month}</div>
                  <div className="text-lg font-semibold text-blue-600">{month.jobs} jobs</div>
                  <div className="text-sm text-gray-500">{month.companies} companies</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Moderators */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Top Performing Moderators
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {platformAnalytics.topPerformingModerators
                .filter((moderator: TopPerformingModerator) => moderatorsData.some((m: { id: string }) => m.id === moderator.id))
                .map((moderator: TopPerformingModerator, index: number) => {
                  const moderatorData = moderatorsData.find((m: { id: string }) => m.id === moderator.id)
                  const stats = moderatorStats[moderator.id]
                  return (
                    <div key={moderator.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full font-semibold">
                        {index + 1}
                      </div>
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={moderatorData?.avatar || "/user_placeholder.svg"} />
                        <AvatarFallback>
                          {moderator.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-semibold text-black">{moderator.name}</h4>
                        <p className="text-sm text-gray-600">{moderatorData?.email}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-blue-600">{moderator.jobsCreated}</div>
                        <div className="text-sm text-gray-500">jobs created</div>
                      </div>
                      {stats && (
                        <div className="text-right">
                          <div className="text-lg font-semibold text-green-600">{stats.companiesCreated}</div>
                          <div className="text-sm text-gray-500">companies</div>
                        </div>
                      )}
                      <Badge variant={moderatorData?.isActive ? "default" : "secondary"}>
                        {moderatorData?.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  )
                })}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

"use client"

import { ModerationLayout } from "@/components/moderation/moderation-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { currentModerator, moderationStats, getRecentActivity } from "@/lib/moderation-data"
import { CheckCircle, Clock, TrendingUp, Activity, Plus, ArrowRight, Briefcase, Building2 } from "lucide-react"
import Link from "next/link"

export default function ModerationDashboard() {
  const recentActivity = getRecentActivity(5)

  return (
    <ModerationLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Moderation Dashboard</h1>
            <p className="text-gray-600">Welcome back, {currentModerator.name}</p>
          </div>
          <div className="flex gap-2">
            <Button asChild className="bg-orange-600 hover:bg-orange-700">
              <Link href="/moderation/jobs/new">
                <Plus className="h-4 w-4 mr-2" />
                New Job
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/moderation/companies/new">
                <Plus className="h-4 w-4 mr-2" />
                New Company
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
              <Briefcase className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{moderationStats.totalJobs}</div>
              <p className="text-xs text-muted-foreground">Jobs in the system</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Companies</CardTitle>
              <Building2 className="h-4 w-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">{moderationStats.totalCompanies}</div>
              <p className="text-xs text-muted-foreground">Companies in the system</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{moderationStats.resolvedToday}</div>
              <p className="text-xs text-muted-foreground">Great progress!</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Resolution</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{moderationStats.averageResolutionTime}h</div>
              <p className="text-xs text-muted-foreground">Response time</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        activity.action === "resolved"
                          ? "bg-green-500"
                          : activity.action === "flagged"
                            ? "bg-amber-500"
                            : activity.action === "approved"
                              ? "bg-blue-500"
                              : "bg-gray-500"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium capitalize">{activity.action}:</span> {activity.targetTitle}
                      </p>
                      <p className="text-xs text-gray-500">
                        {activity.timestamp.toLocaleTimeString()} • {activity.details}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link href="/moderation/activity">
                  View All Activity
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Performance Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Your Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Reports Resolved</span>
                  <span className="font-medium">{currentModerator.stats.totalReportsResolved}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Content Moderated</span>
                  <span className="font-medium">{currentModerator.stats.totalContentModerated}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Accuracy Score</span>
                  <span className="font-medium text-green-600">{currentModerator.stats.accuracyScore}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Avg Resolution Time</span>
                  <span className="font-medium">{currentModerator.stats.averageResolutionTime}h</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col" asChild>
                <Link href="/moderation/jobs/new">
                  <Briefcase className="h-6 w-6 mb-2" />
                  Create Job
                </Link>
              </Button>
              <Button variant="outline" className="h-20 flex-col" asChild>
                <Link href="/moderation/companies/new">
                  <Building2 className="h-6 w-6 mb-2" />
                  Add Company
                </Link>
              </Button>
              <Button variant="outline" className="h-20 flex-col" asChild>
                <Link href="/moderation/activity">
                  <Activity className="h-6 w-6 mb-2" />
                  View Activity
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ModerationLayout>
  )
}

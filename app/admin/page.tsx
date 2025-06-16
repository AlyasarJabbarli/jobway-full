"use client"

import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { currentUser, moderatorsData, platformAnalytics } from "@/lib/admin-data"
import { Briefcase, Building2, Users, TrendingUp, Activity, Clock, Plus, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const recentActivity = [
    { id: 1, action: "Job Created", item: "Senior Frontend Developer", user: "Sarah Johnson", time: "2 hours ago" },
    { id: 2, action: "Company Added", item: "TechStartup Inc.", user: "Mike Chen", time: "4 hours ago" },
    { id: 3, action: "Job Updated", item: "Product Manager", user: "Sarah Johnson", time: "6 hours ago" },
    { id: 4, action: "Company Updated", item: "DataFlow Systems", user: "Emily Rodriguez", time: "1 day ago" },
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back, {currentUser.name}</p>
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/admin/jobs/new">
                <Plus className="h-4 w-4 mr-2" />
                New Job
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/companies/new">
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
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{platformAnalytics.totalJobs}</div>
              <p className="text-xs text-muted-foreground">{platformAnalytics.activeJobs} active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Companies</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{platformAnalytics.totalCompanies}</div>
              <p className="text-xs text-muted-foreground">+3 this month</p>
            </CardContent>
          </Card>

          {currentUser.role === "admin" && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Moderators</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{platformAnalytics.totalModerators}</div>
                <p className="text-xs text-muted-foreground">
                  {moderatorsData.filter((m) => m.isActive).length} active
                </p>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Premium Jobs</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{platformAnalytics.premiumJobs}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((platformAnalytics.premiumJobs / platformAnalytics.totalJobs) * 100)}% of total
              </p>
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
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">{activity.action}:</span> {activity.item}
                      </p>
                      <p className="text-xs text-gray-500">by {activity.user}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      {activity.time}
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link href="/admin/activity">
                  View All Activity
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Team Overview */}
          {currentUser.role === "admin" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Team Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {moderatorsData.slice(0, 3).map((moderator) => (
                    <div key={moderator.id} className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={moderator.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {moderator.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{moderator.name}</p>
                        <p className="text-xs text-gray-500">{moderator.email}</p>
                      </div>
                      <Badge variant={moderator.isActive ? "default" : "secondary"}>
                        {moderator.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link href="/admin/moderators">
                    Manage Moderators
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Quick Stats for Moderators */}
          {currentUser.role === "moderator" && (
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
                    <span className="text-sm text-gray-600">Jobs Created</span>
                    <span className="font-medium">45</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Companies Added</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">This Month</span>
                    <span className="font-medium">10 jobs</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col" asChild>
                <Link href="/admin/jobs/new">
                  <Briefcase className="h-6 w-6 mb-2" />
                  Create Job
                </Link>
              </Button>
              <Button variant="outline" className="h-20 flex-col" asChild>
                <Link href="/admin/companies/new">
                  <Building2 className="h-6 w-6 mb-2" />
                  Add Company
                </Link>
              </Button>
              {currentUser.role === "admin" && (
                <>
                  <Button variant="outline" className="h-20 flex-col" asChild>
                    <Link href="/admin/moderators/new">
                      <Users className="h-6 w-6 mb-2" />
                      Add Moderator
                    </Link>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col" asChild>
                    <Link href="/admin/analytics">
                      <TrendingUp className="h-6 w-6 mb-2" />
                      View Analytics
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { moderatorsData, getModeratorStats, currentUser } from "@/lib/admin-data"
import { Plus, Search, Edit, UserCheck, UserX, Calendar, Briefcase, Building2 } from "lucide-react"
import Link from "next/link"

export default function ModeratorsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Redirect if not admin
  if (currentUser.role !== "admin") {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </AdminLayout>
    )
  }

  const filteredModerators = moderatorsData.filter((moderator) => {
    const matchesSearch =
      moderator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      moderator.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && moderator.isActive) ||
      (statusFilter === "inactive" && !moderator.isActive)
    return matchesSearch && matchesStatus
  })

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Moderators</h1>
            <p className="text-gray-600">Manage moderator accounts and permissions</p>
          </div>
          <Button asChild>
            <Link href="/admin/moderators/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Moderator
            </Link>
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search moderators..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Moderators List */}
        <div className="grid gap-6">
          {filteredModerators.map((moderator) => {
            const stats = getModeratorStats(moderator.id)
            return (
              <Card key={moderator.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={moderator.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {moderator.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                        <div>
                          <h3 className="font-semibold text-lg">{moderator.name}</h3>
                          <p className="text-gray-600">{moderator.email}</p>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Joined {moderator.createdAt.toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Last login {moderator.lastLogin?.toLocaleDateString() || "Never"}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={moderator.isActive ? "default" : "secondary"}>
                            {moderator.isActive ? "Active" : "Inactive"}
                          </Badge>
                          <Badge variant="outline">{moderator.role}</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/moderators/${moderator.id}/edit`}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className={
                          moderator.isActive ? "text-red-600 hover:text-red-700" : "text-green-600 hover:text-green-700"
                        }
                      >
                        {moderator.isActive ? (
                          <>
                            <UserX className="h-4 w-4 mr-2" />
                            Deactivate
                          </>
                        ) : (
                          <>
                            <UserCheck className="h-4 w-4 mr-2" />
                            Activate
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Performance Stats */}
                  {stats && (
                    <div className="mt-6 pt-6 border-t">
                      <h4 className="font-medium mb-3">Performance Overview</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Briefcase className="h-4 w-4 text-blue-600" />
                            <span className="text-lg font-semibold">{stats.totalJobsCreated}</span>
                          </div>
                          <p className="text-xs text-gray-600">Total Jobs</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Briefcase className="h-4 w-4 text-yellow-600" />
                            <span className="text-lg font-semibold">{stats.premiumJobsCreated}</span>
                          </div>
                          <p className="text-xs text-gray-600">Premium Jobs</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Building2 className="h-4 w-4 text-green-600" />
                            <span className="text-lg font-semibold">{stats.companiesCreated}</span>
                          </div>
                          <p className="text-xs text-gray-600">Companies</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Calendar className="h-4 w-4 text-purple-600" />
                            <span className="text-lg font-semibold">
                              {stats.monthlyStats[stats.monthlyStats.length - 1]?.jobsCreated || 0}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600">This Month</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredModerators.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No moderators found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria.</p>
              <Button asChild>
                <Link href="/admin/moderators/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Moderator
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  )
}

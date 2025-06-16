"use client"

import { useState } from "react"
import { ModerationLayout } from "@/components/moderation/moderation-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { moderationActivity, currentModerator } from "@/lib/moderation-data"
import { Search, Activity, CheckCircle, X, Flag, Edit, Trash2, UserCheck, Clock } from "lucide-react"

export default function ModerationActivityPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [actionFilter, setActionFilter] = useState("all")
  const [targetTypeFilter, setTargetTypeFilter] = useState("all")
  const [moderatorFilter, setModeratorFilter] = useState("all")

  const filteredActivity = moderationActivity.filter((activity) => {
    const matchesSearch =
      activity.targetTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.moderatorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (activity.details && activity.details.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesAction = actionFilter === "all" || activity.action === actionFilter
    const matchesTargetType = targetTypeFilter === "all" || activity.targetType === targetTypeFilter
    const matchesModerator = moderatorFilter === "all" || activity.moderatorId === moderatorFilter
    return matchesSearch && matchesAction && matchesTargetType && matchesModerator
  })

  const getActionIcon = (action: string) => {
    switch (action) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "rejected":
        return <X className="h-4 w-4 text-red-500" />
      case "flagged":
        return <Flag className="h-4 w-4 text-orange-500" />
      case "updated":
        return <Edit className="h-4 w-4 text-blue-500" />
      case "deleted":
        return <Trash2 className="h-4 w-4 text-red-500" />
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "assigned":
        return <UserCheck className="h-4 w-4 text-purple-500" />
      default:
        return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  const getActionColor = (action: string) => {
    switch (action) {
      case "approved":
        return "text-green-600 bg-green-50"
      case "rejected":
        return "text-red-600 bg-red-50"
      case "flagged":
        return "text-orange-600 bg-orange-50"
      case "updated":
        return "text-blue-600 bg-blue-50"
      case "deleted":
        return "text-red-600 bg-red-50"
      case "resolved":
        return "text-green-600 bg-green-50"
      case "assigned":
        return "text-purple-600 bg-purple-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h ago`

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`

    return date.toLocaleDateString()
  }

  return (
    <ModerationLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Activity Log</h1>
            <p className="text-gray-600">Track all moderation actions and changes</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-600">{moderationActivity.length}</div>
              <p className="text-sm text-gray-600">Total Actions</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">
                {moderationActivity.filter((a) => a.action === "approved" || a.action === "resolved").length}
              </div>
              <p className="text-sm text-gray-600">Approved/Resolved</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-orange-600">
                {moderationActivity.filter((a) => a.action === "flagged").length}
              </div>
              <p className="text-sm text-gray-600">Flagged</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-purple-600">
                {moderationActivity.filter((a) => a.moderatorId === currentModerator.id).length}
              </div>
              <p className="text-sm text-gray-600">Your Actions</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search activity..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={actionFilter} onValueChange={setActionFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="All Actions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="flagged">Flagged</SelectItem>
                  <SelectItem value="updated">Updated</SelectItem>
                  <SelectItem value="deleted">Deleted</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="assigned">Assigned</SelectItem>
                </SelectContent>
              </Select>
              <Select value={targetTypeFilter} onValueChange={setTargetTypeFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="job">Job</SelectItem>
                  <SelectItem value="company">Company</SelectItem>
                  <SelectItem value="report">Report</SelectItem>
                  <SelectItem value="flag">Flag</SelectItem>
                </SelectContent>
              </Select>
              <Select value={moderatorFilter} onValueChange={setModeratorFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="All Moderators" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Moderators</SelectItem>
                  <SelectItem value={currentModerator.id}>You</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Activity Timeline */}
        <div className="space-y-4">
          {filteredActivity.map((activity, index) => (
            <Card key={activity.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  {/* Timeline indicator */}
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white border-2 border-gray-200">
                      {getActionIcon(activity.action)}
                    </div>
                    {index < filteredActivity.length - 1 && <div className="w-px h-16 bg-gray-200 mt-2" />}
                  </div>

                  {/* Activity content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="secondary" className={`text-xs ${getActionColor(activity.action)}`}>
                        {activity.action}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {activity.targetType}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>{formatTimeAgo(activity.timestamp)}</span>
                      </div>
                    </div>

                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{activity.targetTitle}</h3>

                        {activity.details && <p className="text-sm text-gray-600 mb-2">{activity.details}</p>}

                        {activity.reason && <p className="text-sm text-gray-500 italic">Reason: {activity.reason}</p>}
                      </div>

                      {/* Moderator info */}
                      <div className="flex items-center gap-2 ml-4">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={currentModerator.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs">
                            {activity.moderatorName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-600">
                          {activity.moderatorId === currentModerator.id ? "You" : activity.moderatorName}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredActivity.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No activity found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </ModerationLayout>
  )
}

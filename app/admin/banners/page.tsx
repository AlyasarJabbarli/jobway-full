"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { sponsorshipBanners } from "@/lib/banner-management-data"
import { BANNER_POSITIONS } from "@/lib/banner-management-types"
import { Plus, Search, Edit, Trash2, BarChart3, Play, Pause, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function BannersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [positionFilter, setPositionFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredBanners = sponsorshipBanners.filter((banner) => {
    const matchesSearch =
      banner.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      banner.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      banner.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesPosition = positionFilter === "all" || banner.position === positionFilter
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && banner.isActive) ||
      (statusFilter === "inactive" && !banner.isActive)
    return matchesSearch && matchesPosition && matchesStatus
  })

  const toggleBannerStatus = (bannerId: string) => {
    // In a real app, this would make an API call
    console.log("Toggle banner status:", bannerId)
  }

  const deleteBanner = (bannerId: string) => {
    // In a real app, this would make an API call
    console.log("Delete banner:", bannerId)
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Banner Management</h1>
            <p className="text-gray-600">Create and manage sponsorship banners</p>
          </div>
          <Button asChild>
            <Link href="/admin/banners/new">
              <Plus className="h-4 w-4 mr-2" />
              Create Banner
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{sponsorshipBanners.length}</div>
              <p className="text-sm text-gray-600">Total Banners</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">
                {sponsorshipBanners.filter((b) => b.isActive).length}
              </div>
              <p className="text-sm text-gray-600">Active Banners</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-600">
                {sponsorshipBanners.reduce((sum, banner) => sum + banner.clickCount, 0)}
              </div>
              <p className="text-sm text-gray-600">Total Clicks</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-purple-600">
                {sponsorshipBanners.reduce((sum, banner) => sum + banner.impressionCount, 0)}
              </div>
              <p className="text-sm text-gray-600">Total Impressions</p>
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
                  placeholder="Search banners..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={positionFilter} onValueChange={setPositionFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="All Positions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Positions</SelectItem>
                  {BANNER_POSITIONS.map((position) => (
                    <SelectItem key={position.value} value={position.value}>
                      {position.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="All Status" />
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

        {/* Banners List */}
        <div className="grid gap-6">
          {filteredBanners.map((banner) => (
            <Card key={banner.id}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-6">
                  {/* Banner Preview */}
                  <div className="flex-shrink-0">
                    <img
                      src={banner.imageUrl || "/placeholder.svg"}
                      alt={banner.title}
                      className="w-32 h-24 object-cover rounded-lg border"
                    />
                  </div>

                  {/* Banner Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">{banner.title}</h3>
                        {banner.description && <p className="text-gray-600 text-sm mb-2">{banner.description}</p>}
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant={banner.isActive ? "default" : "secondary"}>
                            {banner.isActive ? "Active" : "Inactive"}
                          </Badge>
                          <Badge variant="outline">
                            {BANNER_POSITIONS.find((p) => p.value === banner.position)?.label}
                          </Badge>
                          <Badge variant="outline">Order: {banner.displayOrder}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Clicks: {banner.clickCount}</span>
                          <span>Impressions: {banner.impressionCount}</span>
                          <span>
                            CTR:{" "}
                            {banner.impressionCount > 0
                              ? ((banner.clickCount / banner.impressionCount) * 100).toFixed(2)
                              : 0}
                            %
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    {banner.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {banner.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Target URL */}
                    <div className="flex items-center gap-2 text-sm text-blue-600">
                      <ExternalLink className="h-4 w-4" />
                      <a href={banner.targetUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {banner.targetUrl}
                      </a>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/banners/${banner.id}/analytics`}>
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Analytics
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/banners/${banner.id}/edit`}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleBannerStatus(banner.id)}
                      className={
                        banner.isActive
                          ? "text-orange-600 hover:text-orange-700"
                          : "text-green-600 hover:text-green-700"
                      }
                    >
                      {banner.isActive ? (
                        <>
                          <Pause className="h-4 w-4 mr-2" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Activate
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteBanner(banner.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBanners.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No banners found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or create a new banner.</p>
              <Button asChild>
                <Link href="/admin/banners/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Banner
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  )
}

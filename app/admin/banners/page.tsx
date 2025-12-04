"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useBanners } from "@/lib/banner-management-data"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { AdminLayout } from "@/components/admin/admin-layout"
import Link from "next/link"
import { Plus, Search, BarChart3, Edit, Trash2 } from "lucide-react"

export default function BannersPage() {
  const router = useRouter()
  const { banners, isLoading, error, toggleBannerStatus, deleteBanner } = useBanners()
  const typedError: any = error;
  const [searchTerm, setSearchTerm] = useState("")
  const [positionFilter, setPositionFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  // Filter banners based on search term and filters
  const filteredBanners = banners.filter((banner) => {
    const matchesSearch = banner.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPosition = positionFilter === "all" || banner.position === positionFilter
    const matchesStatus = statusFilter === "all" || banner.isActive === (statusFilter === "active")
    return matchesSearch && matchesPosition && matchesStatus
  })

  const handleToggleStatus = async (bannerId: string) => {
    await toggleBannerStatus(bannerId)
  }

  const handleDelete = async (bannerId: string) => {
    if (window.confirm("Are you sure you want to delete this banner?")) {
      await deleteBanner(bannerId)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (typedError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error: {typedError.message}</div>
      </div>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Sponsorship Banners</h1>
            <p className="text-gray-600">Create, edit, and manage sponsorship banners</p>
          </div>
          <Button asChild>
            <Link href="/admin/banners/new">
              <Plus className="h-4 w-4 mr-2" />
              Add New Banner
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{banners.length}</div>
              <p className="text-sm text-gray-600">Total Banners</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">{banners.filter((banner) => banner.isActive).length}</div>
              <p className="text-sm text-gray-600">Active Banners</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-600">{banners.reduce((sum, banner) => sum + banner.clickCount, 0)}</div>
              <p className="text-sm text-gray-600">Total Clicks</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-purple-600">{banners.reduce((sum, banner) => sum + banner.impressionCount, 0)}</div>
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
                  <SelectValue placeholder="Position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Positions</SelectItem>
                  <SelectItem value="top">Top</SelectItem>
                  <SelectItem value="sidebar">Sidebar</SelectItem>
                  <SelectItem value="bottom">Bottom</SelectItem>
                  <SelectItem value="inline">Inline</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Status" />
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
        <div className="grid gap-4">
          {filteredBanners.map((banner) => (
            <Card key={banner.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{banner.title}</h3>
                      <Badge variant={banner.isActive ? "default" : "secondary"}>{banner.isActive ? "Active" : "Inactive"}</Badge>
                      <Badge variant="outline">{banner.position}</Badge>
                      {banner.tags.map((tag) => (
                        <Badge key={tag} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                    {banner.description && (
                      <p className="text-gray-600 text-sm line-clamp-2 mb-2">{banner.description}</p>
                    )}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-2">
                      <div>Clicks: {banner.clickCount}</div>
                      <div>Impressions: {banner.impressionCount}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
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
                    <Button variant="outline" size="sm" onClick={() => handleToggleStatus(banner.id)}>
                      {banner.isActive ? "Deactivate" : "Activate"}
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(banner.id)}>
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
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or add a new banner.</p>
              <Button asChild>
                <Link href="/admin/banners/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Banner
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
        {isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading banners...</p>
          </div>
        )}
        {typedError && (
          <div className="text-center py-12">
            <p className="text-red-600">{typedError?.message || String(typedError)}</p>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { BannerUploadComponent } from "@/components/admin/banner-upload"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { BANNER_POSITIONS } from "@/lib/banner-management-types"
import type { BannerUpload } from "@/lib/banner-management-types"
import { ArrowLeft, Save, Eye, Plus, X } from "lucide-react"
import Link from "next/link"

export default function NewBannerPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    targetUrl: "",
    position: "",
    displayOrder: 1,
    isActive: true,
    startDate: "",
    endDate: "",
    tags: [] as string[],
  })
  const [bannerUpload, setBannerUpload] = useState<BannerUpload | undefined>()
  const [newTag, setNewTag] = useState("")
  const [showPreview, setShowPreview] = useState(false)

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit to an API
    console.log("Creating banner:", { ...formData, bannerUpload })
    // Redirect to banners list
  }

  const isFormValid = formData.title && formData.targetUrl && formData.position && bannerUpload

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/banners">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Banners
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Create New Banner</h1>
              <p className="text-gray-600">Upload and configure a new sponsorship banner</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowPreview(!showPreview)}>
              <Eye className="h-4 w-4 mr-2" />
              {showPreview ? "Hide" : "Show"} Preview
            </Button>
            <Button onClick={handleSubmit} disabled={!isFormValid}>
              <Save className="h-4 w-4 mr-2" />
              Create Banner
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form */}
          <div className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Banner Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Enter banner title"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Brief description of the banner"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="targetUrl">Target URL *</Label>
                  <Input
                    id="targetUrl"
                    type="url"
                    value={formData.targetUrl}
                    onChange={(e) => handleInputChange("targetUrl", e.target.value)}
                    placeholder="https://example.com"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Display Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Display Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="position">Position *</Label>
                  <Select value={formData.position} onValueChange={(value) => handleInputChange("position", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select banner position" />
                    </SelectTrigger>
                    <SelectContent>
                      {BANNER_POSITIONS.map((position) => (
                        <SelectItem key={position.value} value={position.value}>
                          {position.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="displayOrder">Display Order</Label>
                  <Input
                    id="displayOrder"
                    type="number"
                    min="1"
                    value={formData.displayOrder}
                    onChange={(e) => handleInputChange("displayOrder", Number.parseInt(e.target.value) || 1)}
                  />
                  <p className="text-xs text-gray-500 mt-1">Lower numbers appear first</p>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => handleInputChange("isActive", checked)}
                  />
                  <Label htmlFor="isActive">Active</Label>
                </div>
              </CardContent>
            </Card>

            {/* Schedule */}
            <Card>
              <CardHeader>
                <CardTitle>Schedule (Optional)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange("startDate", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleInputChange("endDate", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" onClick={addTag} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Upload and Preview */}
          <div className="space-y-6">
            {/* Image Upload */}
            <Card>
              <CardHeader>
                <CardTitle>Banner Image</CardTitle>
              </CardHeader>
              <CardContent>
                <BannerUploadComponent
                  onUpload={setBannerUpload}
                  onRemove={() => setBannerUpload(undefined)}
                  currentUpload={bannerUpload}
                  position={formData.position || "left"}
                />
              </CardContent>
            </Card>

            {/* Preview */}
            {showPreview && bannerUpload && (
              <Card>
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <div className="text-center">
                      <img
                        src={bannerUpload.preview || "/placeholder.svg"}
                        alt="Banner preview"
                        className="max-w-full h-auto rounded border"
                      />
                      <div className="mt-2 text-sm text-gray-600">
                        {formData.title && <div className="font-medium">{formData.title}</div>}
                        {formData.description && <div>{formData.description}</div>}
                        <div className="text-xs text-blue-600 mt-1">{formData.targetUrl}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Form Validation */}
            <Card>
              <CardHeader>
                <CardTitle>Checklist</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className={`flex items-center gap-2 ${formData.title ? "text-green-600" : "text-gray-400"}`}>
                    <div className={`w-2 h-2 rounded-full ${formData.title ? "bg-green-600" : "bg-gray-400"}`} />
                    Banner title
                  </div>
                  <div className={`flex items-center gap-2 ${formData.targetUrl ? "text-green-600" : "text-gray-400"}`}>
                    <div className={`w-2 h-2 rounded-full ${formData.targetUrl ? "bg-green-600" : "bg-gray-400"}`} />
                    Target URL
                  </div>
                  <div className={`flex items-center gap-2 ${formData.position ? "text-green-600" : "text-gray-400"}`}>
                    <div className={`w-2 h-2 rounded-full ${formData.position ? "bg-green-600" : "bg-gray-400"}`} />
                    Banner position
                  </div>
                  <div className={`flex items-center gap-2 ${bannerUpload ? "text-green-600" : "text-gray-400"}`}>
                    <div className={`w-2 h-2 rounded-full ${bannerUpload ? "bg-green-600" : "bg-gray-400"}`} />
                    Banner image
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

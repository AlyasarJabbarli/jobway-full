"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload } from "lucide-react"
import type { BannerFormData } from "@/lib/form-types"

interface BannerFormProps {
  initialData?: Partial<BannerFormData>
  onSubmit: (data: BannerFormData) => void
  isLoading?: boolean
}

export function BannerForm({ initialData, onSubmit, isLoading }: BannerFormProps) {
  const [formData, setFormData] = useState<BannerFormData>({
    title: initialData?.title || "",
    image: initialData?.image || "",
    url: initialData?.url || "",
    position: initialData?.position || "sidebar",
    active: initialData?.active ?? true,
    order: initialData?.order || 0,
    startDate: initialData?.startDate || "",
    endDate: initialData?.endDate || "",
  })

  const [imagePreview, setImagePreview] = useState(initialData?.image || "")

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setImagePreview(result)
        setFormData((prev) => ({ ...prev, image: result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Banner Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Banner Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="image">Banner Image</Label>
            <div className="space-y-4">
              <div>
                <Input id="image" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("image")?.click()}
                  className="w-full"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Banner Image
                </Button>
              </div>
              {imagePreview && (
                <div className="border rounded-lg overflow-hidden">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Banner preview"
                    className="w-full h-auto max-h-48 object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="url">Target URL</Label>
            <Input
              id="url"
              type="url"
              value={formData.url}
              onChange={(e) => setFormData((prev) => ({ ...prev, url: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="position">Position</Label>
            <Select
              value={formData.position}
              onValueChange={(value: any) => setFormData((prev) => ({ ...prev, position: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="top">Top of Page</SelectItem>
                <SelectItem value="sidebar">Sidebar</SelectItem>
                <SelectItem value="bottom">Bottom of Page</SelectItem>
                <SelectItem value="inline">Inline Content</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="order">Display Order</Label>
            <Input
              id="order"
              type="number"
              value={formData.order}
              onChange={(e) => setFormData((prev) => ({ ...prev, order: Number.parseInt(e.target.value) || 0 }))}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="active"
              checked={formData.active}
              onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, active: checked }))}
            />
            <Label htmlFor="active">Active Banner</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Scheduling (Optional)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData((prev) => ({ ...prev, startDate: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData((prev) => ({ ...prev, endDate: e.target.value }))}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Banner"}
        </Button>
        <Button type="button" variant="outline">
          Cancel
        </Button>
      </div>
    </form>
  )
}

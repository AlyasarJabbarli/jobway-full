"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload } from "lucide-react"
import type { ModeratorFormData } from "@/lib/form-types"

interface ModeratorFormProps {
  initialData?: Partial<ModeratorFormData>
  onSubmit: (data: ModeratorFormData) => void
  isLoading?: boolean
}

const AVAILABLE_PERMISSIONS = [
  { id: "manage_jobs", label: "Manage Jobs" },
  { id: "manage_companies", label: "Manage Companies" },
  { id: "manage_banners", label: "Manage Banners" },
  { id: "view_analytics", label: "View Analytics" },
  { id: "manage_users", label: "Manage Users" },
  { id: "system_settings", label: "System Settings" },
]

export function ModeratorForm({ initialData, onSubmit, isLoading }: ModeratorFormProps) {
  const [formData, setFormData] = useState<ModeratorFormData>({
    name: initialData?.name || "",
    email: initialData?.email || "",
    avatar: initialData?.avatar || "",
    role: initialData?.role || "moderator",
    permissions: initialData?.permissions || [],
    active: initialData?.active ?? true,
  })

  const [avatarPreview, setAvatarPreview] = useState(initialData?.avatar || "")

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setAvatarPreview(result)
        setFormData((prev) => ({ ...prev, avatar: result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      permissions: checked ? [...prev.permissions, permissionId] : prev.permissions.filter((p) => p !== permissionId),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Moderator Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="avatar">Avatar</Label>
            <div className="space-y-4">
              <div>
                <Input id="avatar" type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("avatar")?.click()}
                  className="w-full"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Avatar
                </Button>
              </div>
              {avatarPreview && (
                <div className="w-20 h-20 border rounded-full overflow-hidden">
                  <img
                    src={avatarPreview || "/placeholder.svg"}
                    alt="Avatar preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="role">Role</Label>
            <Select
              value={formData.role}
              onValueChange={(value: any) => setFormData((prev) => ({ ...prev, role: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Administrator</SelectItem>
                <SelectItem value="moderator">Moderator</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="active"
              checked={formData.active}
              onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, active: checked }))}
            />
            <Label htmlFor="active">Active Account</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {AVAILABLE_PERMISSIONS.map((permission) => (
              <div key={permission.id} className="flex items-center space-x-2">
                <Checkbox
                  id={permission.id}
                  checked={formData.permissions.includes(permission.id)}
                  onCheckedChange={(checked) => handlePermissionChange(permission.id, checked as boolean)}
                />
                <Label htmlFor={permission.id}>{permission.label}</Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Moderator"}
        </Button>
        <Button type="button" variant="outline">
          Cancel
        </Button>
      </div>
    </form>
  )
}

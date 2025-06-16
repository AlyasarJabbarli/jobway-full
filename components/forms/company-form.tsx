"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, X, Plus, Building2, Globe, Mail, Phone, MapPin } from "lucide-react"
import type { CompanyFormData } from "@/lib/form-types"

interface CompanyFormProps {
  initialData?: Partial<CompanyFormData>
  onSubmit: (data: CompanyFormData) => void
  isLoading?: boolean
}

export function CompanyForm({ initialData, onSubmit, isLoading }: CompanyFormProps) {
  const [formData, setFormData] = useState<CompanyFormData>({
    name: initialData?.name || "",
    logo: initialData?.logo || "",
    description: initialData?.description || "",
    website: initialData?.website || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    address: initialData?.address || "",
    industry: initialData?.industry || "",
    size: initialData?.size || "",
    benefits: initialData?.benefits || [],
    socialLinks: initialData?.socialLinks || {},
  })

  const [logoPreview, setLogoPreview] = useState(initialData?.logo || "")
  const [newBenefit, setNewBenefit] = useState("")

  const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Manufacturing",
    "Retail",
    "Consulting",
    "Media",
    "Non-profit",
    "Government",
    "Design & Creative",
    "Sales & Marketing",
    "Human Resources",
    "Data & Analytics",
  ]

  const companySizes = [
    "1-10 employees",
    "11-50 employees",
    "51-200 employees",
    "201-500 employees",
    "501-1000 employees",
    "1000+ employees",
  ]

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setLogoPreview(result)
        setFormData((prev) => ({ ...prev, logo: result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const addBenefit = () => {
    if (newBenefit.trim()) {
      setFormData((prev) => ({
        ...prev,
        benefits: [...prev.benefits, newBenefit.trim()],
      }))
      setNewBenefit("")
    }
  }

  const removeBenefit = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Company Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Company Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Enter company name"
              required
            />
          </div>

          <div>
            <Label htmlFor="logo">Company Logo</Label>
            <div className="space-y-4">
              <div>
                <Input id="logo" type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("logo")?.click()}
                  className="w-full"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {logoPreview ? "Change Logo" : "Upload Company Logo"}
                </Button>
              </div>
              {logoPreview && (
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 border rounded-lg overflow-hidden bg-gray-50">
                    <img
                      src={logoPreview || "/placeholder.svg"}
                      alt="Company logo preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-sm text-gray-600">Logo preview</div>
                </div>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="description">Company Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Describe what your company does..."
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="industry">Industry *</Label>
              <Select
                value={formData.industry}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, industry: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="size">Company Size *</Label>
              <Select
                value={formData.size}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, size: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select company size" />
                </SelectTrigger>
                <SelectContent>
                  {companySizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="website" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Website *
            </Label>
            <Input
              id="website"
              type="url"
              value={formData.website}
              onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
              placeholder="https://company.com"
              required
            />
          </div>

          <div>
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              placeholder="contact@company.com"
              required
            />
          </div>

          <div>
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Phone
            </Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div>
            <Label htmlFor="address" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Address
            </Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
              placeholder="Company headquarters address"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Social Media */}
      <Card>
        <CardHeader>
          <CardTitle>Social Media Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input
              id="linkedin"
              type="url"
              value={formData.socialLinks.linkedin || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  socialLinks: { ...prev.socialLinks, linkedin: e.target.value },
                }))
              }
              placeholder="https://linkedin.com/company/..."
            />
          </div>

          <div>
            <Label htmlFor="twitter">Twitter</Label>
            <Input
              id="twitter"
              type="url"
              value={formData.socialLinks.twitter || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  socialLinks: { ...prev.socialLinks, twitter: e.target.value },
                }))
              }
              placeholder="https://twitter.com/..."
            />
          </div>

          <div>
            <Label htmlFor="facebook">Facebook</Label>
            <Input
              id="facebook"
              type="url"
              value={formData.socialLinks.facebook || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  socialLinks: { ...prev.socialLinks, facebook: e.target.value },
                }))
              }
              placeholder="https://facebook.com/..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Company Benefits */}
      <Card>
        <CardHeader>
          <CardTitle>Company Benefits</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newBenefit}
              onChange={(e) => setNewBenefit(e.target.value)}
              placeholder="Add a company benefit"
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addBenefit())}
            />
            <Button type="button" onClick={addBenefit} variant="outline">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.benefits.map((benefit, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {benefit}
                <X className="h-3 w-3 cursor-pointer" onClick={() => removeBenefit(index)} />
              </Badge>
            ))}
          </div>
          {formData.benefits.length === 0 && (
            <p className="text-sm text-gray-500">No benefits added yet. Add some to attract talent!</p>
          )}
        </CardContent>
      </Card>

      {/* Form Actions */}
      <div className="flex gap-4 pt-4">
        <Button type="submit" disabled={isLoading} className="min-w-32">
          {isLoading ? "Saving..." : "Save Company"}
        </Button>
        <Button type="button" variant="outline">
          Cancel
        </Button>
      </div>
    </form>
  )
}

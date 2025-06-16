"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"
import type { JobFormData } from "@/lib/form-types"
import { companiesData } from "@/lib/companies-data"

interface JobFormProps {
  initialData?: Partial<JobFormData>
  onSubmit: (data: JobFormData) => void
  isLoading?: boolean
}

export function JobForm({ initialData, onSubmit, isLoading }: JobFormProps) {
  const [formData, setFormData] = useState<JobFormData>({
    title: initialData?.title || "",
    company: initialData?.company || "",
    location: initialData?.location || "",
    type: initialData?.type || "full-time",
    remote: initialData?.remote || false,
    salary: initialData?.salary || { min: 0, max: 0, currency: "USD" },
    description: initialData?.description || "",
    requirements: initialData?.requirements || [],
    benefits: initialData?.benefits || [],
    tags: initialData?.tags || [],
    applicationEmail: initialData?.applicationEmail || "",
    applicationUrl: initialData?.applicationUrl || "",
    expiryDate: initialData?.expiryDate || "",
  })

  const [newRequirement, setNewRequirement] = useState("")
  const [newBenefit, setNewBenefit] = useState("")
  const [newTag, setNewTag] = useState("")

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setFormData((prev) => ({
        ...prev,
        requirements: [...prev.requirements, newRequirement.trim()],
      }))
      setNewRequirement("")
    }
  }

  const removeRequirement = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index),
    }))
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

  const addTag = () => {
    if (newTag.trim()) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const removeTag = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
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
          <CardTitle>Job Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Job Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="company">Company</Label>
            <Select
              value={formData.company}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, company: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a company" />
              </SelectTrigger>
              <SelectContent>
                {companiesData.map((company) => (
                  <SelectItem key={company.id} value={company.name}>
                    {company.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="type">Job Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value: any) => setFormData((prev) => ({ ...prev, type: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full Time</SelectItem>
                <SelectItem value="part-time">Part Time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="remote"
              checked={formData.remote}
              onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, remote: checked }))}
            />
            <Label htmlFor="remote">Remote Work Available</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Salary Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="salaryMin">Minimum Salary</Label>
              <Input
                id="salaryMin"
                type="number"
                value={formData.salary.min}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    salary: { ...prev.salary, min: Number.parseInt(e.target.value) || 0 },
                  }))
                }
              />
            </div>
            <div>
              <Label htmlFor="salaryMax">Maximum Salary</Label>
              <Input
                id="salaryMax"
                type="number"
                value={formData.salary.max}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    salary: { ...prev.salary, max: Number.parseInt(e.target.value) || 0 },
                  }))
                }
              />
            </div>
            <div>
              <Label htmlFor="currency">Currency</Label>
              <Select
                value={formData.salary.currency}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    salary: { ...prev.salary, currency: value },
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Job Description</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
            rows={6}
            required
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Requirements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newRequirement}
              onChange={(e) => setNewRequirement(e.target.value)}
              placeholder="Add a requirement"
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addRequirement())}
            />
            <Button type="button" onClick={addRequirement}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.requirements.map((req, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {req}
                <X className="h-3 w-3 cursor-pointer" onClick={() => removeRequirement(index)} />
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Benefits</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newBenefit}
              onChange={(e) => setNewBenefit(e.target.value)}
              placeholder="Add a benefit"
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addBenefit())}
            />
            <Button type="button" onClick={addBenefit}>
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
        </CardContent>
      </Card>

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
            <Button type="button" onClick={addTag}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="flex items-center gap-1">
                {tag}
                <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(index)} />
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Application Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="applicationEmail">Application Email</Label>
            <Input
              id="applicationEmail"
              type="email"
              value={formData.applicationEmail}
              onChange={(e) => setFormData((prev) => ({ ...prev, applicationEmail: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="applicationUrl">Application URL (Optional)</Label>
            <Input
              id="applicationUrl"
              type="url"
              value={formData.applicationUrl}
              onChange={(e) => setFormData((prev) => ({ ...prev, applicationUrl: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="expiryDate">Expiry Date</Label>
            <Input
              id="expiryDate"
              type="date"
              value={formData.expiryDate}
              onChange={(e) => setFormData((prev) => ({ ...prev, expiryDate: e.target.value }))}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Job"}
        </Button>
        <Button type="button" variant="outline">
          Cancel
        </Button>
      </div>
    </form>
  )
}

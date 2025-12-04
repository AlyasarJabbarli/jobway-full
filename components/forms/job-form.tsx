"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { BaseForm } from "./base-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const CATEGORY_OPTIONS = [
  "Engineering",
  "Marketing",
  "Design",
  "Sales",
  "HR",
  "Finance",
  "Operations"
];
const EXPERIENCE_OPTIONS = [
  "Entry-level (0-2 years)",
  "Mid-level (3-5 years)",
  "Senior (5+ years)",
  "Executive (10+ years)"
];

const jobFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  company: z.string().min(1, "Company is required"),
  location: z.string().min(1, "Location is required"),
  type: z.string().min(1, "Job type is required"),
  remote: z.boolean().default(false),
  salary: z.object({
    min: z.number().min(0),
    max: z.number().min(0),
    currency: z.string().default("AZN"),
  }),
  description: z.string().min(1, "Description is required"),
  requirements: z.array(z.string()).default([]),
  responsibilities: z.array(z.string()).default([]),
  benefits: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  applicationEmail: z.string().email().optional(),
  applicationUrl: z.string().url().optional(),
  expiryDate: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  experience: z.string().min(1, "Experience is required"),
  is_premium: z.boolean().default(false),
})

type JobFormValues = z.infer<typeof jobFormSchema>

interface JobFormProps {
  initialData?: Partial<JobFormData>
  onSubmit: (data: JobFormData) => void
  isSubmitting?: boolean
}

export function JobForm({ initialData, onSubmit, isSubmitting }: JobFormProps) {
  const [newRequirement, setNewRequirement] = useState("")
  const [newResponsibility, setNewResponsibility] = useState("")
  const [newBenefit, setNewBenefit] = useState("")
  const [newTag, setNewTag] = useState("")
  const [companies, setCompanies] = useState<{ id: string; name: string; location: string }[]>([])
  const [loadingCompanies, setLoadingCompanies] = useState(true)

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: initialData?.title || "",
      company: initialData?.company || "",
      location: initialData?.location || "",
      type: initialData?.type || "full-time",
      remote: initialData?.remote || false,
      salary: initialData?.salary || { min: 0, max: 0, currency: "USD" },
      description: initialData?.description || "",
      requirements: initialData?.requirements || [],
      responsibilities: initialData?.responsibilities || [],
      benefits: initialData?.benefits || [],
      tags: initialData?.tags || [],
      applicationEmail: initialData?.applicationEmail || "",
      applicationUrl: initialData?.applicationUrl || "",
      expiryDate: initialData?.expiryDate || "",
      category: initialData?.category || "",
      experience: initialData?.experience || "",
      is_premium: initialData?.is_premium || false,
    },
  })

  useEffect(() => {
    setLoadingCompanies(true)
    fetch("/api/companies")
      .then((res) => res.json())
      .then((data) => setCompanies(data as { id: string; name: string; location: string }[]))
      .finally(() => setLoadingCompanies(false))
  }, [])

  const handleSubmit = (data: JobFormValues) => {
    let expiryDate = data.expiryDate
    if (!expiryDate) {
      const date = new Date()
      date.setMonth(date.getMonth() + 1)
      expiryDate = date.toISOString().split('T')[0]
    }
    onSubmit({ ...data, expiryDate } as JobFormData)
  }

  const addRequirement = () => {
    if (newRequirement.trim()) {
      const currentRequirements = form.getValues("requirements")
      form.setValue("requirements", [...currentRequirements, newRequirement.trim()])
      setNewRequirement("")
    }
  }

  const removeRequirement = (index: number) => {
    const currentRequirements = form.getValues("requirements")
    form.setValue(
      "requirements",
      currentRequirements.filter((_, i) => i !== index)
    )
  }

  const addResponsibility = () => {
    if (newResponsibility.trim()) {
      const currentResponsibilities = form.getValues("responsibilities")
      form.setValue("responsibilities", [...currentResponsibilities, newResponsibility.trim()])
      setNewResponsibility("")
    }
  }

  const removeResponsibility = (index: number) => {
    const currentResponsibilities = form.getValues("responsibilities")
    form.setValue(
      "responsibilities",
      currentResponsibilities.filter((_, i) => i !== index)
    )
  }

  const addBenefit = () => {
    if (newBenefit.trim()) {
      const currentBenefits = form.getValues("benefits")
      form.setValue("benefits", [...currentBenefits, newBenefit.trim()])
      setNewBenefit("")
    }
  }

  const removeBenefit = (index: number) => {
    const currentBenefits = form.getValues("benefits")
    form.setValue(
      "benefits",
      currentBenefits.filter((_, i) => i !== index)
    )
  }

  const addTag = () => {
    if (newTag.trim()) {
      const currentTags = form.getValues("tags")
      form.setValue("tags", [...currentTags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (index: number) => {
    const currentTags = form.getValues("tags")
    form.setValue(
      "tags",
      currentTags.filter((_, i) => i !== index)
    )
  }

  return (
    <BaseForm
      title="Job Details"
      onSubmit={form.handleSubmit(handleSubmit)}
      isSubmitting={isSubmitting}
    >
      <Form {...form}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                {loadingCompanies ? (
                  <div>Loading companies...</div>
                ) : companies.length > 0 ? (
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value)
                      const selected = companies.find((c) => c.id === value)
                      if (selected && selected.location) {
                        form.setValue("location", selected.location)
                      }
                    }}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a company" />
                    </SelectTrigger>
                    <SelectContent>
                      {companies.map((company) => (
                        <SelectItem key={company.id} value={company.id}>
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div>
                    <div>No companies found.</div>
                    <a href="/admin/companies/new" className="text-blue-600 underline">Create a new company</a>
                  </div>
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="full-time">Full Time</SelectItem>
                  <SelectItem value="part-time">Part Time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="remote"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>Remote Work</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="salary.min"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Minimum Salary</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="salary.max"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Maximum Salary</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="applicationEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Application Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="applicationUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Application URL</FormLabel>
              <FormControl>
                <Input type="url" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="expiryDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expiry Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  <Select
                    value={CATEGORY_OPTIONS.includes(field.value) ? field.value : ""}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORY_OPTIONS.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Or enter new category"
                    value={!CATEGORY_OPTIONS.includes(field.value) ? field.value : ""}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Experience</FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  <Select
                    value={EXPERIENCE_OPTIONS.includes(field.value) ? field.value : ""}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent>
                      {EXPERIENCE_OPTIONS.map((exp) => (
                        <SelectItem key={exp} value={exp}>{exp}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Or enter experience"
                    value={!EXPERIENCE_OPTIONS.includes(field.value) ? field.value : ""}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="requirements"
          render={() => (
            <FormItem>
              <FormLabel>Requirements</FormLabel>
              <div className="flex gap-2 mb-2">
                <Input
                  placeholder="Add a requirement"
                  value={newRequirement}
                  onChange={(e) => setNewRequirement(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addRequirement();
                    }
                  }}
                />
                <Button type="button" onClick={addRequirement} variant="secondary">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {form.watch("requirements").map((req, idx) => (
                  <Badge key={idx} className="flex items-center gap-1">
                    {req}
                    <button type="button" onClick={() => removeRequirement(idx)}>
                      <X className="w-3 h-3 ml-1" />
                    </button>
                  </Badge>
                ))}
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="responsibilities"
          render={() => (
            <FormItem>
              <FormLabel>Responsibilities</FormLabel>
              <div className="flex gap-2 mb-2">
                <Input
                  placeholder="Add a responsibility"
                  value={newResponsibility}
                  onChange={(e) => setNewResponsibility(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addResponsibility();
                    }
                  }}
                />
                <Button type="button" onClick={addResponsibility} variant="secondary">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {form.watch("responsibilities").map((resp, idx) => (
                  <Badge key={idx} className="flex items-center gap-1">
                    {resp}
                    <button type="button" onClick={() => removeResponsibility(idx)}>
                      <X className="w-3 h-3 ml-1" />
                    </button>
                  </Badge>
                ))}
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="benefits"
          render={() => (
            <FormItem>
              <FormLabel>Benefits</FormLabel>
              <div className="flex gap-2 mb-2">
                <Input
                  placeholder="Add a benefit"
                  value={newBenefit}
                  onChange={(e) => setNewBenefit(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addBenefit();
                    }
                  }}
                />
                <Button type="button" onClick={addBenefit} variant="secondary">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {form.watch("benefits").map((benefit, idx) => (
                  <Badge key={idx} className="flex items-center gap-1">
                    {benefit}
                    <button type="button" onClick={() => removeBenefit(idx)}>
                      <X className="w-3 h-3 ml-1" />
                    </button>
                  </Badge>
                ))}
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="is_premium"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>Premium Listing</FormLabel>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
      </Form>
    </BaseForm>
  )
}

"use client"

import { use, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { JobForm } from "@/components/forms/job-form"
import type { JobFormData } from "@/lib/form-types"
import { apiClient } from "@/lib/api-client"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Loader2 } from "lucide-react"
import Link from "next/link"

interface EditJobPageProps {
  params: Promise<{ id: string }>
}

export default function EditJobPage({ params }: EditJobPageProps) {
  const unwrappedParams = use(params)
  const router = useRouter()
  const [job, setJob] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setIsLoading(true)
        const jobData = await apiClient.getJob(unwrappedParams.id)
        setJob(jobData)
      } catch (err) {
        setError("Failed to load job data")
        console.error("Error fetching job:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchJob()
  }, [unwrappedParams.id])

  const handleSubmit = async (data: JobFormData) => {
    try {
      setIsSaving(true)
      await apiClient.updateJob(unwrappedParams.id, data)
      router.push("/admin/jobs")
    } catch (err) {
      console.error("Error updating job:", err)
      setError("Failed to update job")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading job data...</span>
          </div>
        </div>
      </AdminLayout>
    )
  }

  if (error || !job) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold">Error</h2>
          <p className="text-gray-600 mt-2">{error || "Job not found"}</p>
          <Button asChild className="mt-4">
            <Link href="/admin/jobs">Back to Jobs</Link>
          </Button>
        </div>
      </AdminLayout>
    )
  }

  const initialData: Partial<JobFormData> = {
    title: job.title,
    company: job.companyId,
    location: job.location,
    type: job.type,
    remote: job.location === "Remote",
    salary: {
      min: job.salary_min,
      max: job.salary_max,
      currency: "USD",
    },
    description: job.description,
    requirements: job.requirements || [],
    benefits: job.benefits || [],
    tags: job.tags || [],
    applicationEmail: job.applicationEmail || "",
    applicationUrl: job.applicationUrl || "",
    expiryDate: job.expiryDate || "",
    category: job.category || "",
    experience: job.experience || "",
    is_premium: job.is_premium || false,
  }

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Edit Job</h1>
          <Button asChild variant="outline">
            <Link href="/admin/jobs">Back to Jobs</Link>
          </Button>
        </div>
        <JobForm
          initialData={initialData}
          onSubmit={handleSubmit}
          isSubmitting={isSaving}
        />
      </div>
    </AdminLayout>
  )
}

"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin/admin-layout"
import { JobForm } from "@/components/forms/job-form"
import type { JobFormData } from "@/lib/form-types"
import { allJobs } from "@/lib/enhanced-jobs-data"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface EditJobPageProps {
  params: {
    id: string
  }
}

export default function EditJobPage({ params }: EditJobPageProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [job, setJob] = useState<any>(null)

  useEffect(() => {
    const foundJob = allJobs.find((j) => j.id === params.id)
    if (foundJob) {
      setJob(foundJob)
    }
  }, [params.id])

  const handleSubmit = async (data: JobFormData) => {
    setIsLoading(true)
    try {
      // In a real app, this would make an API call
      console.log("Updating job:", data)
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
      router.push("/admin/jobs")
    } catch (error) {
      console.error("Error updating job:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!job) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold">Job not found</h2>
          <p className="text-gray-600 mt-2">The job you're looking for doesn't exist.</p>
          <Button asChild className="mt-4">
            <Link href="/admin/jobs">Back to Jobs</Link>
          </Button>
        </div>
      </AdminLayout>
    )
  }

  const initialData: Partial<JobFormData> = {
    title: job.title,
    company: job.company,
    location: job.location,
    type: "full-time",
    remote: job.location === "Remote",
    salary: job.salary || { min: 0, max: 0, currency: "USD" },
    description: job.description,
    requirements: job.requirements || [],
    benefits: job.benefits || [],
    tags: job.tags || [],
    applicationEmail: job.applicationEmail || "",
    applicationUrl: job.applicationUrl || "",
    expiryDate: job.expiryDate || "",
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/jobs">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Jobs
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Job</h1>
            <p className="text-gray-600">Update job posting details</p>
          </div>
        </div>

        <JobForm initialData={initialData} onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </AdminLayout>
  )
}

"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { JobForm } from "@/components/forms/job-form"
import type { JobFormData } from "@/lib/form-types"
import { enhancedJobs } from "@/lib/enhanced-jobs-data"

export default function EditJobPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [job, setJob] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const foundJob = enhancedJobs.find((j) => j.id === params.id)
    if (foundJob) {
      setJob(foundJob)
    }
  }, [params.id])

  const handleSubmit = async (data: JobFormData) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Updating job:", data)
      router.push("/admin/jobs")
    } catch (error) {
      console.error("Error updating job:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">Edit Job: {job.title}</h1>
        <p className="text-muted-foreground">Update job posting details</p>
      </div>

      <JobForm
        initialData={{
          title: job.title,
          company: job.company,
          location: job.location,
          type: job.type,
          remote: job.remote,
          salary: job.salary,
          description: job.description,
          requirements: job.requirements || [],
          benefits: job.benefits || [],
          applicationUrl: job.applicationUrl,
          applicationEmail: job.applicationEmail,
          tags: job.tags || [],
          featured: job.featured || false,
          expiryDate: job.expiryDate || "",
        }}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  )
}

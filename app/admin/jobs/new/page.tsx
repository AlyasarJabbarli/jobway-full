"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin/admin-layout"
import { JobForm } from "@/components/forms/job-form"
import type { JobFormData } from "@/lib/form-types"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { apiClient } from "@/lib/api-client"

export default function NewJobPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (data: JobFormData) => {
    setIsLoading(true)
    try {
      const payload: any = {
        ...data,
        companyId: data.company,
        salary_min: data.salary.min,
        salary_max: data.salary.max,
      }
      delete payload.company
      delete payload.salary
      await apiClient.createJob(payload)
      router.push("/admin/jobs")
    } catch (error) {
      console.error("Error creating job:", error)
      // Optionally, show a toast or error message here
    } finally {
      setIsLoading(false)
    }
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
            <h1 className="text-2xl font-bold text-gray-900">Create New Job</h1>
            <p className="text-gray-600">Add a new job posting to the platform</p>
          </div>
        </div>

        <JobForm onSubmit={handleSubmit} isSubmitting={isLoading} />
      </div>
    </AdminLayout>
  )
}

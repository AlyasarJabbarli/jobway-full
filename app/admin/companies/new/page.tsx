"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin/admin-layout"
import { CompanyForm } from "@/components/forms/company-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import type { CompanyFormData } from "@/lib/form-types"
import Link from "next/link"

export default function NewCompanyPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (formData: CompanyFormData) => {
    try {
      setIsLoading(true)

      const data = new FormData()
      data.append("name", formData.name)
      if (formData.location) data.append("location", formData.location)
      if (formData.description) data.append("description", formData.description)
      if (formData.logo) data.append("logo", formData.logo)
      if (formData.website) data.append("website", formData.website)
      if (formData.email) data.append("email", formData.email)
      if (formData.phone) data.append("phone", formData.phone)

      const res = await fetch("/api/companies", {
        method: "POST",
        body: data,
      })

      if (!res.ok) {
        let errorMessage = "Unknown error"
        try {
          const text = await res.text()
          errorMessage = JSON.parse(text).error || text
        } catch {
          errorMessage = "Server returned an invalid response or no details."
        }
        console.error("API error:", errorMessage)
        alert("Failed to create company: " + errorMessage)
        return
      }

      // Redirect back to companies list
      router.push("/admin/companies")
    } catch (err) {
      console.error("Error creating company:", err)
      alert("Failed to create company. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/companies">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Companies
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Create New Company</h1>
              <p className="text-gray-600">Add a new company to the platform</p>
            </div>
          </div>
        </div>

        {/* Company Form */}
        <div className="max-w-4xl">
          <CompanyForm onSubmit={handleSubmit} isSubmitting={isLoading} />
        </div>
      </div>
    </AdminLayout>
  )
}

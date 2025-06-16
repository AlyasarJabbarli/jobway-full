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

      // Simulate API call to create company
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log("Creating new company:", formData)

      // In a real app, you would make an API call here
      // await createCompany(formData)

      // Redirect back to companies list
      router.push("/admin/companies")
    } catch (err) {
      console.error("Error creating company:", err)
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
          <CompanyForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      </div>
    </AdminLayout>
  )
}

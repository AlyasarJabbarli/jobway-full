"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CompanyForm } from "@/components/forms/company-form"
import type { CompanyFormData } from "@/lib/form-types"
import { apiClient } from "@/lib/api-client"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Loader2 } from "lucide-react"
import Link from "next/link"

interface EditCompanyPageProps {
  params: Promise<{
    id: string
  }>
}

export default function EditCompanyPage({ params }: EditCompanyPageProps) {
  const router = useRouter()
  const { id } = use(params)
  const [company, setCompany] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        setIsLoading(true)
        const companyData = await apiClient.getCompany(id)
        setCompany(companyData)
      } catch (err) {
        setError("Failed to load company data")
        console.error("Error fetching company:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCompany()
  }, [id])

  const handleSubmit = async (data: CompanyFormData) => {
    try {
      setIsSaving(true)
      
      // Use FormData for file uploads
      const formData = new FormData()
      formData.append("name", data.name)
      if (data.location) formData.append("location", data.location)
      if (data.description) formData.append("description", data.description)
      if (data.logo) formData.append("logo", data.logo)
      if (data.website) formData.append("website", data.website)
      if (data.email) formData.append("email", data.email)
      if (data.phone) formData.append("phone", data.phone)

      const response = await fetch(`/api/companies/${id}`, {
        method: "PUT",
        body: formData,
      })

      if (!response.ok) {
        let errorMessage = "Unknown error"
        try {
          const text = await response.text()
          errorMessage = JSON.parse(text).error || text
        } catch {
          errorMessage = "Server returned an invalid response or no details."
        }
        console.error("API error:", errorMessage)
        setError("Failed to update company: " + errorMessage)
        return
      }

      router.push("/admin/companies")
    } catch (err) {
      console.error("Error updating company:", err)
      setError("Failed to update company")
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
            <span>Loading company data...</span>
          </div>
        </div>
      </AdminLayout>
    )
  }

  if (error || !company) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold">Error</h2>
          <p className="text-gray-600 mt-2">{error || "Company not found"}</p>
          <Button asChild className="mt-4">
            <Link href="/admin/companies">Back to Companies</Link>
          </Button>
        </div>
      </AdminLayout>
    )
  }

  const initialData: Partial<CompanyFormData> = {
    name: company.name,
    description: company.description,
    logoUrl: company.logoUrl,
    location: company.location,
  }

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Edit Company</h1>
          <Button asChild variant="outline">
            <Link href="/admin/companies">Back to Companies</Link>
          </Button>
        </div>
        <CompanyForm
          initialData={initialData}
          onSubmit={handleSubmit}
          isSubmitting={isSaving}
        />
      </div>
    </AdminLayout>
  )
}

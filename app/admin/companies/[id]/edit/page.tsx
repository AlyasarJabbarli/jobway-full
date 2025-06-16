"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin/admin-layout"
import { CompanyForm } from "@/components/forms/company-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2 } from "lucide-react"
import { getCompanyById } from "@/lib/companies-data"
import type { CompanyFormData } from "@/lib/form-types"
import Link from "next/link"

interface EditCompanyPageProps {
  params: {
    id: string
  }
}

export default function EditCompanyPage({ params }: EditCompanyPageProps) {
  const router = useRouter()
  const [company, setCompany] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        setIsLoading(true)
        const companyData = getCompanyById(params.id)

        if (!companyData) {
          setError("Company not found")
          return
        }

        setCompany(companyData)
      } catch (err) {
        setError("Failed to load company data")
        console.error("Error fetching company:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCompany()
  }, [params.id])

  const handleSubmit = async (formData: CompanyFormData) => {
    try {
      setIsSaving(true)

      // Simulate API call to update company
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log("Updating company:", params.id, formData)

      // In a real app, you would make an API call here
      // await updateCompany(params.id, formData)

      // Redirect back to companies list
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
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/companies">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Companies
              </Link>
            </Button>
          </div>

          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{error || "Company Not Found"}</h2>
            <p className="text-gray-600 mb-4">The company you're looking for doesn't exist or couldn't be loaded.</p>
            <Button asChild>
              <Link href="/admin/companies">Return to Companies List</Link>
            </Button>
          </div>
        </div>
      </AdminLayout>
    )
  }

  // Transform company data to match form structure
  const initialFormData: Partial<CompanyFormData> = {
    name: company.name,
    logo: company.logo,
    description: company.description,
    website: company.website,
    email: company.email,
    phone: company.phone,
    address: company.location, // Map location to address
    industry: company.industry,
    size: company.size,
    benefits: company.benefits || [],
    socialLinks: {
      linkedin: company.socialMedia?.linkedin,
      twitter: company.socialMedia?.twitter,
      facebook: company.socialMedia?.facebook,
    },
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
              <h1 className="text-2xl font-bold text-gray-900">Edit Company</h1>
              <p className="text-gray-600">Update {company.name} information</p>
            </div>
          </div>
        </div>

        {/* Company Form */}
        <div className="max-w-4xl">
          <CompanyForm initialData={initialFormData} onSubmit={handleSubmit} isLoading={isSaving} />
        </div>
      </div>
    </AdminLayout>
  )
}

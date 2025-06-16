"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin/admin-layout"
import { BannerForm } from "@/components/forms/banner-form"
import type { BannerFormData } from "@/lib/form-types"
import { sponsorshipBanners } from "@/lib/banner-management-data"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface EditBannerPageProps {
  params: {
    id: string
  }
}

export default function EditBannerPage({ params }: EditBannerPageProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [banner, setBanner] = useState<any>(null)

  useEffect(() => {
    const foundBanner = sponsorshipBanners.find((b) => b.id === params.id)
    if (foundBanner) {
      setBanner(foundBanner)
    }
  }, [params.id])

  const handleSubmit = async (data: BannerFormData) => {
    setIsLoading(true)
    try {
      // In a real app, this would make an API call
      console.log("Updating banner:", data)
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
      router.push("/admin/banners")
    } catch (error) {
      console.error("Error updating banner:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!banner) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold">Banner not found</h2>
          <p className="text-gray-600 mt-2">The banner you're looking for doesn't exist.</p>
          <Button asChild className="mt-4">
            <Link href="/admin/banners">Back to Banners</Link>
          </Button>
        </div>
      </AdminLayout>
    )
  }

  const initialData: Partial<BannerFormData> = {
    title: banner.title,
    image: banner.imageUrl,
    url: banner.targetUrl,
    position: banner.position,
    active: banner.isActive,
    order: banner.displayOrder,
    startDate: banner.startDate ? banner.startDate.toISOString().split("T")[0] : "",
    endDate: banner.endDate ? banner.endDate.toISOString().split("T")[0] : "",
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/banners">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Banners
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Banner</h1>
            <p className="text-gray-600">Update banner details and settings</p>
          </div>
        </div>

        <BannerForm initialData={initialData} onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </AdminLayout>
  )
}

"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BannerForm } from "@/components/forms/banner-form"
import type { BannerFormData } from "@/lib/form-types"
import { apiClient } from "@/lib/api-client"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Loader2 } from "lucide-react"
import Link from "next/link"

interface EditBannerPageProps {
  params: Promise<{
    id: string
  }>
}

export default function EditBannerPage({ params }: EditBannerPageProps) {
  const router = useRouter()
  const { id } = use(params)
  const [banner, setBanner] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        setIsLoading(true)
        const bannerData = await apiClient.getBanner(id)
        setBanner(bannerData)
      } catch (err) {
        setError("Failed to load banner data")
        console.error("Error fetching banner:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBanner()
  }, [id])

  const handleSubmit = async (data: BannerFormData) => {
    try {
      setIsSaving(true)
      await apiClient.updateBanner(id, data)
      router.push("/admin/banners")
    } catch (err) {
      console.error("Error updating banner:", err)
      setError("Failed to update banner")
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
            <span>Loading banner data...</span>
          </div>
        </div>
      </AdminLayout>
    )
  }

  if (error || !banner) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold">Error</h2>
          <p className="text-gray-600 mt-2">{error || "Banner not found"}</p>
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
    order: banner.displayOrder || 0,
    startDate: banner.startDate || "",
    endDate: banner.endDate || "",
  }

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Edit Banner</h1>
          <Button asChild variant="outline">
            <Link href="/admin/banners">Back to Banners</Link>
          </Button>
        </div>
        <BannerForm
          initialData={initialData}
          onSubmit={handleSubmit}
          isSubmitting={isSaving}
        />
      </div>
    </AdminLayout>
  )
}

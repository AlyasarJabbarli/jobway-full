"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeratorForm } from "@/components/forms/moderator-form"
import type { ModeratorFormData } from "@/lib/form-types"
import { apiClient } from "@/lib/api-client"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Loader2 } from "lucide-react"
import Link from "next/link"

interface EditModeratorPageProps {
  params: Promise<{
    id: string
  }>
}

export default function EditModeratorPage({ params }: EditModeratorPageProps) {
  const router = useRouter()
  const { id } = use(params)
  const [moderator, setModerator] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchModerator = async () => {
      try {
        setIsLoading(true)
        const moderatorData = await apiClient.getModerator(id)
        setModerator(moderatorData)
      } catch (err) {
        setError("Failed to load moderator data")
        console.error("Error fetching moderator:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchModerator()
  }, [id])

  const handleSubmit = async (data: ModeratorFormData) => {
    try {
      setIsSaving(true)
      await apiClient.updateModerator(id, data)
      router.push("/admin/moderators")
    } catch (err) {
      console.error("Error updating moderator:", err)
      setError("Failed to update moderator")
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
            <span>Loading moderator data...</span>
          </div>
        </div>
      </AdminLayout>
    )
  }

  if (error || !moderator) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold">Error</h2>
          <p className="text-gray-600 mt-2">{error || "Moderator not found"}</p>
          <Button asChild className="mt-4">
            <Link href="/admin/moderators">Back to Moderators</Link>
          </Button>
        </div>
      </AdminLayout>
    )
  }

  const initialData: Partial<ModeratorFormData> = {
    name: moderator.name,
    email: moderator.email,
    role: moderator.role,
    active: moderator.isActive,
    permissions: moderator.permissions || [],
  }

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Edit Moderator</h1>
          <Button asChild variant="outline">
            <Link href="/admin/moderators">Back to Moderators</Link>
          </Button>
        </div>
        <ModeratorForm
          initialData={initialData}
          onSubmit={handleSubmit}
          isSubmitting={isSaving}
        />
      </div>
    </AdminLayout>
  )
}


"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin/admin-layout"
import { ModeratorForm } from "@/components/forms/moderator-form"
import type { ModeratorFormData } from "@/lib/form-types"
import { moderatorsData } from "@/lib/admin-data"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface EditModeratorPageProps {
  params: {
    id: string
  }
}

export default function EditModeratorPage({ params }: EditModeratorPageProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [moderator, setModerator] = useState<any>(null)

  useEffect(() => {
    const foundModerator = moderatorsData.find((m) => m.id === params.id)
    if (foundModerator) {
      setModerator(foundModerator)
    }
  }, [params.id])

  const handleSubmit = async (data: ModeratorFormData) => {
    setIsLoading(true)
    try {
      // In a real app, this would make an API call
      console.log("Updating moderator:", data)
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
      router.push("/admin/moderators")
    } catch (error) {
      console.error("Error updating moderator:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!moderator) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold">Moderator not found</h2>
          <p className="text-gray-600 mt-2">The moderator you're looking for doesn't exist.</p>
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
    avatar: moderator.avatar,
    role: moderator.role,
    permissions: moderator.permissions?.map((p: any) => p.id) || [],
    active: moderator.isActive,
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/moderators">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Moderators
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Moderator</h1>
            <p className="text-gray-600">Update moderator account details</p>
          </div>
        </div>

        <ModeratorForm initialData={initialData} onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </AdminLayout>
  )
}

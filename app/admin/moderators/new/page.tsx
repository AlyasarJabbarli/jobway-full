"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin/admin-layout"
import { ModeratorForm } from "@/components/forms/moderator-form"
import type { ModeratorFormData } from "@/lib/form-types"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NewModeratorPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (data: ModeratorFormData) => {
    setIsLoading(true)
    try {
      // In a real app, this would make an API call
      console.log("Creating moderator:", data)
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
      router.push("/admin/moderators")
    } catch (error) {
      console.error("Error creating moderator:", error)
    } finally {
      setIsLoading(false)
    }
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
            <h1 className="text-2xl font-bold text-gray-900">Create New Moderator</h1>
            <p className="text-gray-600">Add a new moderator account</p>
          </div>
        </div>

        <ModeratorForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </AdminLayout>
  )
}

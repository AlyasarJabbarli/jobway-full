import React from "react"
import { ModerationLayout } from "@/components/moderation/moderation-layout"
import { CompanyForm } from "@/components/forms/company-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { CompanyFormData } from "@/lib/form-types"
import { getCurrentModerator, getModerationStats } from "@/lib/moderation-data"
import { db } from "@/lib/db"
import EditCompanyClient from "./EditCompanyClient"

interface EditModerationCompanyPageProps {
  params: { id: string }
}

export default async function EditModerationCompanyPage({ params }: EditModerationCompanyPageProps) {
  const moderator = await getCurrentModerator()
  const stats = await getModerationStats()
  const safeModerator = {
    ...moderator,
    name: moderator.name ?? 'Moderator',
    isActive: typeof moderator.isActive === 'boolean' ? moderator.isActive : true,
  }

  const company = await db.company.findUnique({
    where: { id: params.id },
  })

  if (!company) {
    return (
      <ModerationLayout moderator={safeModerator} stats={stats}>
        <div>Company not found</div>
      </ModerationLayout>
    )
  }

  return (
    <ModerationLayout moderator={safeModerator} stats={stats}>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/moderation/companies">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Companies
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Company</h1>
            <p className="text-gray-600">Modify company profile details</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Company Details</CardTitle>
          </CardHeader>
          <CardContent>
            <EditCompanyClient initialData={company} id={params.id} />
          </CardContent>
        </Card>
      </div>
    </ModerationLayout>
  )
}

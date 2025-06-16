"use client"

import { ModerationLayout } from "@/components/moderation/moderation-layout"
import { CompanyForm } from "@/components/forms/company-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { companiesData } from "@/lib/companies-data"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

interface EditModerationCompanyPageProps {
  params: {
    id: string
  }
}

export default function EditModerationCompanyPage({ params }: EditModerationCompanyPageProps) {
  const company = companiesData.find((c) => c.id === params.id)

  if (!company) {
    notFound()
  }

  return (
    <ModerationLayout>
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
            <CompanyForm initialData={company} />
          </CardContent>
        </Card>
      </div>
    </ModerationLayout>
  )
}

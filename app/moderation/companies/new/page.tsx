"use client"

import { ModerationLayout } from "@/components/moderation/moderation-layout"
import { CompanyForm } from "@/components/forms/company-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NewModerationCompanyPage() {
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
            <h1 className="text-2xl font-bold text-gray-900">Add New Company</h1>
            <p className="text-gray-600">Create a new company profile</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Company Details</CardTitle>
          </CardHeader>
          <CardContent>
            <CompanyForm />
          </CardContent>
        </Card>
      </div>
    </ModerationLayout>
  )
}

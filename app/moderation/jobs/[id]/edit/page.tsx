"use client"

import { ModerationLayout } from "@/components/moderation/moderation-layout"
import { JobForm } from "@/components/forms/job-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { enhancedJobsData } from "@/lib/enhanced-jobs-data"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

interface EditModerationJobPageProps {
  params: {
    id: string
  }
}

export default function EditModerationJobPage({ params }: EditModerationJobPageProps) {
  const job = enhancedJobsData.find((j) => j.id === params.id)

  if (!job) {
    notFound()
  }

  return (
    <ModerationLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/moderation/jobs">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Jobs
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Job</h1>
            <p className="text-gray-600">Modify job posting details</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
          </CardHeader>
          <CardContent>
            <JobForm initialData={job} />
          </CardContent>
        </Card>
      </div>
    </ModerationLayout>
  )
}

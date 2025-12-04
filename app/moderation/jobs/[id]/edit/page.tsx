import { ModerationLayout } from "@/components/moderation/moderation-layout"
import { JobForm } from "@/components/forms/job-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { getJobById, getCurrentModerator, getModerationStats } from "@/lib/moderation-data"
import JobFormEditClient from "@/components/forms/job-form-edit-client"

interface EditModerationJobPageProps {
  params: {
    id: string
  }
}

export default async function EditModerationJobPage({ params }: EditModerationJobPageProps) {
  const job = await getJobById(params.id)
  const moderator = await getCurrentModerator()
  const stats = await getModerationStats()

  if (!job) {
    notFound()
  }

  // Allowed job types for the form
  const allowedTypes = ["full-time", "part-time", "contract", "internship"];

  // Map job fields to JobFormData structure
  const parseStringOrArray = (field: any) => {
    if (Array.isArray(field)) return field.filter((v) => typeof v === 'string');
    if (typeof field === 'string') {
      try {
        const parsed = JSON.parse(field);
        return Array.isArray(parsed) ? parsed.filter((v) => typeof v === 'string') : [];
      } catch {
        return [];
      }
    }
    return [];
  };

  const initialData = job && {
    title: job.title,
    company: job.companyId || '',
    location: job.location || '',
    type: (allowedTypes.includes(job.type) ? job.type : 'full-time') as 'full-time' | 'part-time' | 'contract' | 'internship',
    remote: false, // You may want to fetch/set this if available
    salary: { min: job.salary_min || 0, max: job.salary_max || 0, currency: 'USD' },
    description: job.description || '',
    requirements: parseStringOrArray(job.requirements),
    responsibilities: parseStringOrArray(job.responsibilities),
    benefits: parseStringOrArray(job.benefits),
    tags: [],
    applicationEmail: job.applicationEmail || '',
    applicationUrl: job.applicationUrl || '',
    expiryDate: job.expiryDate ? (typeof job.expiryDate === 'string' ? job.expiryDate : new Date(job.expiryDate).toISOString().slice(0, 10)) : '',
    category: job.category || '',
    experience: job.experience || '',
    is_premium: job.is_premium ?? false,
  };

  const safeModerator = {
    ...moderator,
    name: moderator.name ?? 'Moderator',
    isActive: typeof moderator.isActive === 'boolean' ? moderator.isActive : true,
  };

  return (
    <ModerationLayout moderator={safeModerator} stats={stats}>
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
            <JobFormEditClient initialData={initialData} jobId={params.id} />
          </CardContent>
        </Card>
      </div>
    </ModerationLayout>
  )
}

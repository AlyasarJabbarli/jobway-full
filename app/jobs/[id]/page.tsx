import { notFound } from "next/navigation"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { ResponsiveBannerContainer } from "@/components/responsive-banner-container"
import { ContentAwareLayout } from "@/components/content-aware-layout"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { headers } from "next/headers"
import type { Job } from "@/lib/enhanced-jobs-data"
import {
  MapPin,
  Building2,
  Clock,
  DollarSign,
  ArrowLeft,
  ExternalLink,
  Share2,
  Bookmark,
  Star,
  Users,
  Calendar,
  Award,
} from "lucide-react"

// A helper type used only in this file – adds a human-readable postedDate string.
type DisplayJob = Job & { postedDate: string }

export default async function JobDetailPage(props: { params: { id: string } }) {
  const params = await props.params;
  // Since this is a server component, we need to use absolute URLs
  const hostHeader = await headers();
  const host = hostHeader.get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http"
  const baseUrl = `${protocol}://${host}/api`

  // Fetch the specific job and related jobs
  const [jobRes, allJobsRes] = await Promise.all([
    fetch(`${baseUrl}/jobs/${params.id}`, { cache: "no-store" }),
    fetch(`${baseUrl}/jobs`, { cache: "no-store" }),
  ])

  if (!jobRes.ok) {
    notFound()
  }

  const matchedJob = await jobRes.json()
  const allJobs = await allJobsRes.json()

  // Transform API response to match our Job interface
  const transformJob = (apiJob: any): Job => ({
    id: apiJob.id,
    title: apiJob.title,
    company: typeof apiJob.company === "string" ? apiJob.company : apiJob.company?.name ?? "Unknown Company",
    companyId: typeof apiJob.company === "object" ? apiJob.company.id : undefined,
    location: apiJob.location,
    category: apiJob.category,
    type: apiJob.type ?? (apiJob.is_premium ? "Premium" : "Simple"),
    is_premium: apiJob.is_premium || false,
    salary: {
      min: apiJob.salary?.min ?? apiJob.salary_min,
      max: apiJob.salary?.max ?? apiJob.salary_max,
    },
    experience: apiJob.experience,
    industry: apiJob.industry ?? "",
    description: apiJob.description,
    requirements: apiJob.requirements ?? [],
    benefits: apiJob.benefits ?? [],
    companyLogo: apiJob.company?.logoUrl ?? undefined,
    datePosted: new Date(apiJob.datePosted ?? apiJob.createdAt),
    employmentType: apiJob.employmentType,
    teamSize: apiJob.teamSize,
    responsibilities: apiJob.responsibilities ?? [],
  })

  // Transform the matched job
  const transformedJob = transformJob(matchedJob)

  // Prepare the job object for display (add a formatted postedDate string)
  const job: DisplayJob = {
    ...transformedJob,
    postedDate: new Date(matchedJob!.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
  }

  // Get related jobs (same category, excluding current job)
  const relatedJobs: DisplayJob[] = allJobs
    .filter((j: any) => j.category === job.category && j.id !== job.id)
    .slice(0, 3)
    .map((j: any) => ({
      ...transformJob(j),
      postedDate: new Date(j.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    }))

  // Extended job details
  const jobDetails = {
    ...job,
    companyInfo: {
      size: "500-1000 employees",
      founded: "2015",
      website: "https://example.com",
      logo: "/placeholder.svg?height=60&width=60",
    },
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Banner System */}
      <ResponsiveBannerContainer />

      <ContentAwareLayout>
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link
              href="/jobs"
              className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Jobs
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-4">
                        <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
                        <Badge
                          variant={job.type === "Premium" ? "default" : "secondary"}
                          className={job.type === "Premium" ? "bg-yellow-500 hover:bg-yellow-600" : ""}
                        >
                          {job.type}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center space-x-1">
                          <Building2 className="h-4 w-4" />
                          {job.companyId ? (
                            <Link
                              href={`/companies/${job.companyId}`}
                              className="hover:text-blue-600 transition-colors"
                            >
                              {job.company}
                            </Link>
                          ) : (
                            <span>{job.company}</span>
                          )}
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>Posted {job.postedDate}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-4 w-4" />
                          <span>
                            ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {job.category}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {job.employmentType || "Full-time"}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Award className="h-3 w-3" />
                          {job.experience}
                        </Badge>
                        <Badge variant="outline">{job.industry}</Badge>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="prose max-w-none">
                    <p className="whitespace-pre-wrap">{job.description}</p>
                  </div>

                  <div className="mt-8 space-y-6">
                    {/* Responsibilities - Only show if we have any */}
                    {job.responsibilities && job.responsibilities.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Key Responsibilities</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {job.responsibilities.map((responsibility: string, index: number) => (
                              <li key={index} className="flex items-start">
                                <span className="text-blue-600 mr-2">•</span>
                                <span className="text-gray-700">{responsibility}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    )}

                    {/* Requirements - Only show if we have any */}
                    {job.requirements && job.requirements.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Requirements</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {job.requirements.map((requirement: string, index: number) => (
                              <li key={index} className="flex items-start">
                                <span className="text-blue-600 mr-2">•</span>
                                <span className="text-gray-700">{requirement}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    )}

                    {/* Benefits - Only show if we have any */}
                    {job.benefits && job.benefits.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Benefits & Perks</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {job.benefits.map((benefit: string, index: number) => (
                              <li key={index} className="flex items-start">
                                <span className="text-green-600 mr-2">✓</span>
                                <span className="text-gray-700">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div>
              <div className="space-y-6">
                {/* Company Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>Company Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-16 w-16 relative">
                        <img
                          src={job.companyLogo || jobDetails.companyInfo.logo}
                          alt={`${job.company} logo`}
                          className="rounded-lg object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold">{job.company}</h3>
                        <p className="text-sm text-gray-600">{job.location}</p>
                      </div>
                    </div>

                    <div className="text-sm text-gray-600 space-y-2">
                      <p>
                        <strong>Application Deadline:</strong> Open until filled
                      </p>
                      <p>
                        <strong>Start Date:</strong> Immediate
                      </p>
                      {job.teamSize && (
                        <p>
                          <strong>Team Size:</strong> {job.teamSize}
                        </p>
                      )}
                      <p>
                        <strong>Experience Required:</strong> {job.experience}
                      </p>
                    </div>

                    <Separator className="my-4" />

                    <Button className="w-full" asChild>
                      <Link href={`/jobs/${job.id}/apply`}>Apply Now</Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Related Jobs */}
                {relatedJobs.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Similar Jobs</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {relatedJobs.map((relatedJob) => (
                          <Link
                            key={relatedJob.id}
                            href={`/jobs/${relatedJob.id}`}
                            className="block hover:bg-gray-50 rounded-lg p-3 -mx-3 transition-colors"
                          >
                            <div className="flex items-start justify-between mb-1">
                              <h3 className="font-medium text-gray-900">{relatedJob.title}</h3>
                              <Badge variant="outline">{relatedJob.type}</Badge>
                            </div>
                            <div className="text-sm text-gray-600">
                              <p>{relatedJob.company}</p>
                              <p>{relatedJob.location}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </ContentAwareLayout>

      <Footer />
    </div>
  )
}

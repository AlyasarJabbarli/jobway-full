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
import { allJobs } from "@/lib/enhanced-jobs-data"
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

interface JobDetailPageProps {
  params: {
    id: string
  }
}

export default function JobDetailPage({ params }: JobDetailPageProps) {
  const job = allJobs.find((j) => j.id === params.id)

  if (!job) {
    notFound()
  }

  // Get related jobs (same category, excluding current job)
  const relatedJobs = allJobs.filter((j) => j.category === job.category && j.id !== job.id).slice(0, 3)

  // Extended job details
  const jobDetails = {
    ...job,
    employmentType: "Full-time",
    teamSize: "10-50 employees",
    benefits: [
      "Health, dental, and vision insurance",
      "401(k) with company matching",
      "Flexible work arrangements",
      "Professional development budget",
      "Unlimited PTO",
      "Stock options",
    ],
    requirements: [
      "Bachelor's degree in relevant field or equivalent experience",
      "Strong communication and collaboration skills",
      "Experience with modern development tools and practices",
      "Problem-solving mindset and attention to detail",
      "Ability to work in a fast-paced environment",
    ],
    responsibilities: [
      "Design and develop high-quality software solutions",
      "Collaborate with cross-functional teams to deliver projects",
      "Participate in code reviews and maintain coding standards",
      "Contribute to technical documentation and knowledge sharing",
      "Stay updated with industry trends and best practices",
    ],
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
            <div className="lg:col-span-2 space-y-6">
              {/* Job Header */}
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <h1 className="text-xl md:text-2xl font-bold text-gray-900">{job.title}</h1>
                        <Badge
                          variant={job.type === "Premium" ? "default" : "secondary"}
                          className={job.type === "Premium" ? "bg-yellow-500 hover:bg-yellow-600" : ""}
                        >
                          {job.type === "Premium" && <Star className="h-3 w-3 mr-1" />}
                          {job.type}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Building2 className="h-4 w-4" />
                          <span>{job.company}</span>
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
                          {jobDetails.employmentType}
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
                </CardHeader>
              </Card>

              {/* Job Description */}
              <Card>
                <CardHeader>
                  <CardTitle>Job Description</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">{job.description}</p>
                  <p className="text-gray-700 leading-relaxed">
                    We are looking for a talented professional to join our growing team. This role offers an excellent
                    opportunity to work with cutting-edge technologies and contribute to meaningful projects that impact
                    thousands of users worldwide.
                  </p>
                </CardContent>
              </Card>

              {/* Responsibilities */}
              <Card>
                <CardHeader>
                  <CardTitle>Key Responsibilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {jobDetails.responsibilities.map((responsibility, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span className="text-gray-700">{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle>Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {jobDetails.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span className="text-gray-700">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Benefits */}
              <Card>
                <CardHeader>
                  <CardTitle>Benefits & Perks</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {jobDetails.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Apply Card */}
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Apply for this position</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-xl md:text-2xl font-bold text-green-600 mb-1">
                      ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Annual Salary</div>
                  </div>
                  <Button size="lg" className="w-full" asChild>
                    <a
                      href={`mailto:jobs@example.com?subject=Application for ${job.title}&body=I am interested in applying for the ${job.title} position at ${job.company}.`}
                    >
                      Apply Now
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" className="w-full" asChild>
                    <a href="https://forms.google.com/your-form-id" target="_blank" rel="noopener noreferrer">
                      Quick Apply
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Separator />
                  <div className="text-sm text-gray-600 space-y-2">
                    <p>
                      <strong>Application Deadline:</strong> Open until filled
                    </p>
                    <p>
                      <strong>Start Date:</strong> Immediate
                    </p>
                    <p>
                      <strong>Experience Required:</strong> {job.experience}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Company Info */}
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <img
                      src={jobDetails.companyInfo.logo || "/placeholder.svg"}
                      alt={`${job.company} logo`}
                      className="w-12 h-12 rounded-lg border"
                    />
                    <div>
                      <CardTitle className="text-lg">{job.company}</CardTitle>
                      <p className="text-sm text-gray-600">{job.industry}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Industry:</span>
                    <span className="font-medium">{job.industry}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Company Size:</span>
                    <span className="font-medium">{jobDetails.companyInfo.size}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Founded:</span>
                    <span className="font-medium">{jobDetails.companyInfo.founded}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Team Size:</span>
                    <span className="font-medium">{jobDetails.teamSize}</span>
                  </div>
                  <Separator />
                  <Button variant="outline" className="w-full" asChild>
                    <a href={jobDetails.companyInfo.website} target="_blank" rel="noopener noreferrer">
                      Visit Company Website
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Job Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Job Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Applications:</span>
                    <span className="font-medium">47 candidates</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Views:</span>
                    <span className="font-medium">1,234 views</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Posted:</span>
                    <span className="font-medium">{job.postedDate}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Experience Level:</span>
                    <span className="font-medium">{job.experience}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Related Jobs */}
          {relatedJobs.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Similar Jobs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedJobs.map((relatedJob) => (
                  <Card key={relatedJob.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">
                            <Link href={`/jobs/${relatedJob.id}`} className="hover:text-blue-600 transition-colors">
                              {relatedJob.title}
                            </Link>
                          </CardTitle>
                          <p className="text-gray-600 text-sm">
                            {relatedJob.company} • {relatedJob.location}
                          </p>
                          <p className="text-green-600 text-sm font-medium">
                            ${relatedJob.salary.min.toLocaleString()} - ${relatedJob.salary.max.toLocaleString()}
                          </p>
                        </div>
                        <Badge
                          variant={relatedJob.type === "Premium" ? "default" : "secondary"}
                          className={relatedJob.type === "Premium" ? "bg-yellow-500 hover:bg-yellow-600" : ""}
                        >
                          {relatedJob.type}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm mb-3">{relatedJob.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1">
                          <Badge variant="outline" className="text-xs">
                            {relatedJob.category}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {relatedJob.experience}
                          </Badge>
                        </div>
                        <span className="text-xs text-gray-500">{relatedJob.postedDate}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </ContentAwareLayout>

      <Footer />
    </div>
  )
}

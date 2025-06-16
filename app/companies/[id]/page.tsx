import { notFound } from "next/navigation"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { JobCard } from "@/components/job-card"
import { ResponsiveBannerContainer } from "@/components/responsive-banner-container"
import { ContentAwareLayout } from "@/components/content-aware-layout"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getCompanyById } from "@/lib/companies-data"
import { getJobsByCompanyId } from "@/lib/enhanced-jobs-data"
import {
  ArrowLeft,
  Building2,
  MapPin,
  Users,
  Calendar,
  Globe,
  Mail,
  Phone,
  ExternalLink,
  Linkedin,
  Twitter,
  Facebook,
  Star,
  Award,
  Heart,
  Code,
  Briefcase,
} from "lucide-react"

interface CompanyProfilePageProps {
  params: {
    id: string
  }
}

export default function CompanyProfilePage({ params }: CompanyProfilePageProps) {
  const company = getCompanyById(params.id)
  const companyJobs = getJobsByCompanyId(params.id)

  if (!company) {
    notFound()
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
              href="/companies"
              className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Companies
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Company Header */}
              <Card>
                <CardHeader>
                  <div className="flex items-start gap-6">
                    <img
                      src={company.logo || "/placeholder.svg"}
                      alt={`${company.name} logo`}
                      className="w-20 h-20 rounded-lg border object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{company.name}</h1>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-1">
                          <Building2 className="h-4 w-4" />
                          <span>{company.industry}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{company.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{company.size}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>Founded {company.founded}</span>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4">{company.description}</p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Briefcase className="h-3 w-3" />
                          {company.jobCount} Open {company.jobCount === 1 ? "Position" : "Positions"}
                        </Badge>
                        <Badge variant="outline">{company.industry}</Badge>
                        <Badge variant="outline">{company.size}</Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* About Company */}
              <Card>
                <CardHeader>
                  <CardTitle>About {company.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{company.detailedDescription}</p>
                </CardContent>
              </Card>

              {/* Company Culture */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    Company Culture
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {company.culture.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Benefits & Perks */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-blue-500" />
                    Benefits & Perks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {company.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tech Stack */}
              {company.techStack && company.techStack.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="h-5 w-5 text-purple-500" />
                      Tech Stack
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {company.techStack.map((tech, index) => (
                        <Badge key={index} variant="secondary" className="bg-purple-50 text-purple-700">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Open Positions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-green-500" />
                    Open Positions ({companyJobs.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {companyJobs.length > 0 ? (
                    <div className="space-y-4">
                      {companyJobs.map((job) => (
                        <JobCard key={job.id} job={job} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No open positions at the moment.</p>
                      <p className="text-sm text-gray-400 mt-1">Check back later for new opportunities!</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Information */}
              <Card className="top-24">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Globe className="h-4 w-4 text-gray-500" />
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Visit Website
                        <ExternalLink className="inline h-3 w-3 ml-1" />
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <a href={`mailto:${company.email}`} className="text-blue-600 hover:text-blue-800 text-sm">
                        {company.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{company.phone}</span>
                    </div>
                  </div>

                  <Separator />

                  {/* Social Media */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Follow Us</h4>
                    <div className="flex gap-2">
                      {company.socialMedia.linkedin && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={company.socialMedia.linkedin} target="_blank" rel="noopener noreferrer">
                            <Linkedin className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      {company.socialMedia.twitter && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={company.socialMedia.twitter} target="_blank" rel="noopener noreferrer">
                            <Twitter className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      {company.socialMedia.facebook && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={company.socialMedia.facebook} target="_blank" rel="noopener noreferrer">
                            <Facebook className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>

                  <Separator />

                  {/* Quick Actions */}
                  <div className="space-y-2">
                    {companyJobs.length > 0 && (
                      <Button variant="outline" className="w-full" asChild>
                        <Link href="/jobs">View All Jobs</Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Company Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Company Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Industry:</span>
                    <span className="font-medium">{company.industry}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Company Size:</span>
                    <span className="font-medium">{company.size}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Founded:</span>
                    <span className="font-medium">{company.founded}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium">{company.location}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Open Positions:</span>
                    <span className="font-medium text-green-600">{company.jobCount}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </ContentAwareLayout>

      <Footer />
    </div>
  )
}

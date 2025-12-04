'use client'

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
import { apiClient } from "@/lib/api-client"
import { use, useEffect, useState } from "react"
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
  const { id } = use(params)
  const [company, setCompany] = useState<any>(null)
  const [companyJobs, setCompanyJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const companyData = await apiClient.getCompany(id)
        setCompany(companyData)
        // Fetch all jobs and filter by companyId
        const allJobs = await apiClient.getJobs()
        const jobsForCompany = allJobs.filter((job: any) => job.companyId === id)
        setCompanyJobs(jobsForCompany)
      } catch (e) {
        setCompany(null)
        setCompanyJobs([])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

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
                      src={company.logoUrl || "/placeholder-logo.svg"}
                      alt={`${company.name} logo`}
                      className="w-20 h-20 rounded-lg border object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                        {company.name}
                        <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded">
                          {companyJobs.length} Open Position{companyJobs.length === 1 ? '' : 's'}
                        </span>
                      </h1>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                        {company.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{company.location}</span>
                          </div>
                        )}
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
                  <p className="text-gray-700 leading-relaxed">{company.description}</p>
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
                      {(company.techStack ?? []).map((tech: string, index: number) => (
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
                        <JobCard
                          key={job.id}
                          job={{
                            ...job,
                            company: typeof job.company === "object" ? job.company.name : job.company
                          }}
                        />
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
                    {company.website && (
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
                    )}
                    {company.email && (
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <a href={`mailto:${company.email}`} className="text-blue-600 hover:text-blue-800 text-sm">
                          {company.email}
                        </a>
                      </div>
                    )}
                    {company.phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-700">{company.phone}</span>
                      </div>
                    )}
                  </div>
                  <Separator />
                </CardContent>
              </Card>

              {/* Company Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Company Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium">{company.location}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Open Positions:</span>
                    <span className="font-medium text-green-600">{companyJobs.length}</span>
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

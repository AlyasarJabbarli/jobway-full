"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Building2, Clock } from "lucide-react"

interface JobCardProps {
  job: {
    id: string
    title: string
    company: string
    location: string
    description: string
    type: "Premium" | "Simple"
    category: string
    datePosted: Date
    companyId?: string
    is_premium: boolean
  }
}

export function JobCard({ job }: JobCardProps) {
  const router = useRouter();
  return (
    <Card
      className={`hover:shadow-lg transition-shadow cursor-pointer ${
        job.is_premium 
          ? "border-2 border-yellow-400 bg-gradient-to-r from-yellow-50 to-yellow-100" 
          : ""
      }`}
      onClick={() => router.push(`/jobs/${job.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') router.push(`/jobs/${job.id}`) }}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg hover:text-blue-600 transition-colors">
                {job.title}
              </CardTitle>
              {job.is_premium && (
                <Badge className="bg-yellow-500 hover:bg-yellow-600">
                  Featured
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Building2 className="h-4 w-4" />
                {job.companyId ? (
                  <Link
                    href={`/companies/${job.companyId}`}
                    className="hover:text-blue-600 transition-colors"
                    onClick={e => e.stopPropagation()}
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
                <span>{new Date(job.datePosted).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 text-sm mb-3">{job.description}</p>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {job.category}
          </Badge>
          {job.is_premium && (
            <Badge variant="outline" className="text-xs border-yellow-500 text-yellow-700">
              Premium
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

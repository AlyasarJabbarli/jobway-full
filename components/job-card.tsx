"use client"

import Link from "next/link"
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
    postedDate: string
    companyId?: string
  }
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Card
      className={`hover:shadow-lg transition-shadow cursor-pointer ${
        job.type === "Premium" ? "border-yellow-400 bg-yellow-50/30" : ""
      }`}
    >
      <Link href={`/jobs/${job.id}`}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-lg hover:text-blue-600 transition-colors">{job.title}</CardTitle>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Building2 className="h-4 w-4" />
                  {job.companyId ? (
                    <Link
                      href={`/companies/${job.companyId}`}
                      className="hover:text-blue-600 transition-colors"
                      onClick={(e) => e.stopPropagation()}
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
                  <span>{job.postedDate}</span>
                </div>
              </div>
            </div>
            <Badge
              variant={job.type === "Premium" ? "default" : "secondary"}
              className={job.type === "Premium" ? "bg-yellow-500 hover:bg-yellow-600" : ""}
            >
              {job.type}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 text-sm mb-3">{job.description}</p>
          <Badge variant="outline" className="text-xs">
            {job.category}
          </Badge>
        </CardContent>
      </Link>
    </Card>
  )
}

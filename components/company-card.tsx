import Link from "next/link"
import { Card, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, MapPin, Users, Briefcase } from "lucide-react"
import type { Company } from "@/lib/companies-data"

interface CompanyCardProps {
  company: Company
}

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
      <Link href={`/companies/${company.id}`}>
        <CardHeader className="pb-4">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <img
                src={company.logo || "/placeholder.svg"}
                alt={`${company.name} logo`}
                className="w-16 h-16 rounded-lg border object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                {company.name}
              </h3>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-3">
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
              </div>
              <p className="text-gray-600 text-sm line-clamp-2 mb-3">{company.description}</p>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Briefcase className="h-3 w-3" />
                  {company.jobCount} {company.jobCount === 1 ? "Job" : "Jobs"}
                </Badge>
                <span className="text-xs text-gray-500">Founded {company.founded}</span>
              </div>
            </div>
          </div>
        </CardHeader>
      </Link>
    </Card>
  )
}

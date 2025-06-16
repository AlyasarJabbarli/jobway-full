"use client"

import { useState } from "react"
import { ModerationLayout } from "@/components/moderation/moderation-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { companiesData } from "@/lib/companies-data"
import { Search, Plus, Eye, Edit, Flag, Building2, MapPin, Users, Calendar, Globe } from "lucide-react"
import Link from "next/link"

export default function ModerationCompaniesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sizeFilter, setSizeFilter] = useState("all")
  const [industryFilter, setIndustryFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")

  const filteredCompanies = companiesData.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSize = sizeFilter === "all" || company.size === sizeFilter
    const matchesIndustry = industryFilter === "all" || company.industry === industryFilter
    const matchesLocation = locationFilter === "all" || company.location.includes(locationFilter)
    return matchesSearch && matchesSize && matchesIndustry && matchesLocation
  })

  const getSizeColor = (size: string) => {
    switch (size) {
      case "Startup":
        return "bg-purple-100 text-purple-800"
      case "Small":
        return "bg-blue-100 text-blue-800"
      case "Medium":
        return "bg-green-100 text-green-800"
      case "Large":
        return "bg-orange-100 text-orange-800"
      case "Enterprise":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <ModerationLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Company Management</h1>
            <p className="text-gray-600">Create, edit, and moderate company profiles</p>
          </div>
          <Button asChild className="bg-orange-600 hover:bg-orange-700">
            <Link href="/moderation/companies/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Company
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Companies</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{companiesData.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Verified</CardTitle>
              <Building2 className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {companiesData.filter((company) => company.verified).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Featured</CardTitle>
              <Building2 className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {companiesData.filter((company) => company.featured).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
              <Building2 className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {companiesData.reduce((sum, company) => sum + company.openPositions, 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search companies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={sizeFilter} onValueChange={setSizeFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="All Sizes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sizes</SelectItem>
                  <SelectItem value="Startup">Startup</SelectItem>
                  <SelectItem value="Small">Small</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Large">Large</SelectItem>
                  <SelectItem value="Enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
              <Select value={industryFilter} onValueChange={setIndustryFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="All Industries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="E-commerce">E-commerce</SelectItem>
                  <SelectItem value="Consulting">Consulting</SelectItem>
                </SelectContent>
              </Select>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="New York">New York</SelectItem>
                  <SelectItem value="San Francisco">San Francisco</SelectItem>
                  <SelectItem value="London">London</SelectItem>
                  <SelectItem value="Berlin">Berlin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Companies List */}
        <div className="grid gap-4">
          {filteredCompanies.map((company) => (
            <Card key={company.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Building2 className="h-8 w-8 text-gray-400" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge className={getSizeColor(company.size)}>{company.size}</Badge>
                        {company.verified && (
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            Verified
                          </Badge>
                        )}
                        {company.featured && (
                          <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                            Featured
                          </Badge>
                        )}
                      </div>

                      <h3 className="text-lg font-semibold mb-2">{company.name}</h3>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
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
                          <span>{company.employees} employees</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{company.openPositions} open positions</span>
                        </div>
                        {company.website && (
                          <div className="flex items-center gap-1">
                            <Globe className="h-4 w-4" />
                            <a
                              href={company.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              Website
                            </a>
                          </div>
                        )}
                      </div>

                      <p className="text-gray-600 text-sm line-clamp-2">{company.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/companies/${company.id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/moderation/companies/${company.id}/edit`}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm">
                      <Flag className="h-4 w-4 mr-2" />
                      Flag
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No companies found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </ModerationLayout>
  )
}

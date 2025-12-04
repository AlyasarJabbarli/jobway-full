"use client"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Edit, Trash2, Eye, MapPin, Building2, Calendar, DollarSign } from "lucide-react"
import Link from "next/link"

// Add Job type matching the API response
interface Company {
  id: string;
  name: string;
  logoUrl?: string;
  location?: string;
  description?: string;
}

interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  category: string;
  type: string;
  experience: string;
  salary_min: number;
  salary_max: number;
  is_premium: boolean;
  company: Company;
  companyId: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  useEffect(() => {
    setLoading(true)
    fetch("/api/jobs")
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch jobs")
        return res.json()
      })
      .then((data) => {
        setJobs(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message || "Error loading jobs")
        setLoading(false)
      })
  }, [])

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.company?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || job.category === categoryFilter
    const matchesType = typeFilter === "all" || (job.is_premium ? "Premium" : "Simple") === typeFilter
    return matchesSearch && matchesCategory && matchesType
  })

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Job Management</h1>
            <p className="text-gray-600">Create, edit, and manage job postings</p>
          </div>
          <Button asChild>
            <Link href="/admin/jobs/new">
              <Plus className="h-4 w-4 mr-2" />
              Create Job
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{jobs.length}</div>
              <p className="text-sm text-gray-600">Total Jobs</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-yellow-600">
                {jobs.filter((j) => j.is_premium).length}
              </div>
              <p className="text-sm text-gray-600">Premium Jobs</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-600">
                {jobs.filter((j) => !j.is_premium).length}
              </div>
              <p className="text-sm text-gray-600">Standard Jobs</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">
                {jobs.filter((j) => j.location === "Remote").length}
              </div>
              <p className="text-sm text-gray-600">Remote Jobs</p>
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
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="HR">HR</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Premium">Premium</SelectItem>
                  <SelectItem value="Simple">Standard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Loading/Error States */}
        {loading && (
          <Card>
            <CardContent className="text-center py-12">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Loading jobs...</h3>
            </CardContent>
          </Card>
        )}
        {error && (
          <Card>
            <CardContent className="text-center py-12">
              <h3 className="text-lg font-semibold text-red-600 mb-2">{error}</h3>
            </CardContent>
          </Card>
        )}

        {/* Jobs List */}
        {!loading && !error && (
          <div className="grid gap-4">
            {filteredJobs.map((job) => (
              <Card key={job.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold">{job.title}</h3>
                            <Badge
                              variant={job.is_premium ? "default" : "secondary"}
                              className={job.is_premium ? "bg-yellow-500 hover:bg-yellow-600" : ""}
                            >
                              {job.is_premium ? "Premium" : "Simple"}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center gap-1">
                              <Building2 className="h-4 w-4" />
                              <span>{job.company?.name || "Unknown"}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(job.createdAt).toLocaleDateString()}</span>
                            </div>
                            {(job.salary_min && job.salary_max) && (
                              <div className="flex items-center gap-1">
                                <DollarSign className="h-4 w-4" />
                                <span>
                                  ${job.salary_min.toLocaleString()} - ${job.salary_max.toLocaleString()}
                                </span>
                              </div>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm line-clamp-2 mb-3">{job.description}</p>
                          <div className="flex gap-2">
                            <Badge variant="outline">{job.category}</Badge>
                            <Badge variant="outline">{job.experience}</Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/jobs/${job.id}`} target="_blank">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/jobs/${job.id}/edit`}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && !error && filteredJobs.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or create a new job.</p>
              <Button asChild>
                <Link href="/admin/jobs/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Job
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  )
}

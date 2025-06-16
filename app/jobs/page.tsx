"use client"

import { useState, useMemo } from "react"
import { Navigation } from "@/components/navigation"
import { JobCard } from "@/components/job-card"
import { AdvancedJobFilters } from "@/components/advanced-job-filters"
import { Footer } from "@/components/footer"
import { allJobs } from "@/lib/enhanced-jobs-data"
import { ResponsiveBannerContainer } from "@/components/responsive-banner-container"
import { ContentAwareLayout } from "@/components/content-aware-layout"

export default function JobsPage() {
  const [filters, setFilters] = useState({
    category: "all",
    location: "all",
    type: "all",
    salaryMin: "",
    salaryMax: "",
    experience: "all",
    industry: "all",
    datePosted: "all",
  })

  const filteredJobs = useMemo(() => {
    return allJobs.filter((job) => {
      // Basic filters
      const categoryMatch = filters.category === "all" || job.category === filters.category
      const locationMatch = filters.location === "all" || job.location === filters.location
      const typeMatch = filters.type === "all" || job.type === filters.type

      // Advanced filters
      const salaryMatch =
        (!filters.salaryMin || job.salary.min >= Number.parseInt(filters.salaryMin)) &&
        (!filters.salaryMax || job.salary.max <= Number.parseInt(filters.salaryMax))

      const experienceMatch = filters.experience === "all" || job.experience === filters.experience
      const industryMatch = filters.industry === "all" || job.industry === filters.industry

      // Date posted filter
      let dateMatch = true
      if (filters.datePosted !== "all") {
        const now = new Date()
        const jobDate = job.datePosted
        const diffTime = Math.abs(now.getTime() - jobDate.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        switch (filters.datePosted) {
          case "24h":
            dateMatch = diffDays <= 1
            break
          case "7d":
            dateMatch = diffDays <= 7
            break
          case "30d":
            dateMatch = diffDays <= 30
            break
        }
      }

      return categoryMatch && locationMatch && typeMatch && salaryMatch && experienceMatch && industryMatch && dateMatch
    })
  }, [filters])

  // Sort jobs to show Premium jobs first
  const sortedJobs = useMemo(() => {
    return [...filteredJobs].sort((a, b) => {
      if (a.type === "Premium" && b.type === "Simple") return -1
      if (a.type === "Simple" && b.type === "Premium") return 1
      return 0
    })
  }, [filteredJobs])

  const updateFilter = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      category: "all",
      location: "all",
      type: "all",
      salaryMin: "",
      salaryMax: "",
      experience: "all",
      industry: "all",
      datePosted: "all",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Banner System */}
      <ResponsiveBannerContainer />

      <ContentAwareLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Job Listings</h1>
            <p className="text-gray-600">Discover your next opportunity from {allJobs.length} available positions</p>
          </div>

          <div className="mb-8">
            <AdvancedJobFilters
              onCategoryChange={(value) => updateFilter("category", value)}
              onLocationChange={(value) => updateFilter("location", value)}
              onTypeChange={(value) => updateFilter("type", value)}
              onSalaryRangeChange={(min, max) => {
                setFilters((prev) => ({ ...prev, salaryMin: min, salaryMax: max }))
              }}
              onExperienceChange={(value) => updateFilter("experience", value)}
              onIndustryChange={(value) => updateFilter("industry", value)}
              onDatePostedChange={(value) => updateFilter("datePosted", value)}
              onClearFilters={clearFilters}
              activeFilters={filters}
            />
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-600">
              Showing {sortedJobs.length} of {allJobs.length} jobs
              {Object.values(filters).some((filter) => filter !== "all" && filter !== "") && " (filtered)"}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sortedJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>

          {sortedJobs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No jobs found matching your criteria.</p>
              <button onClick={clearFilters} className="text-blue-600 hover:text-blue-800 mt-2">
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </ContentAwareLayout>

      <Footer />
    </div>
  )
}

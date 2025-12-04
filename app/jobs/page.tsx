"use client"

import { useState, useMemo, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { JobCard } from "@/components/job-card"
import { AdvancedJobFilters } from "@/components/advanced-job-filters"
import { Footer } from "@/components/footer"
import { fetchJobs, type Job } from "@/lib/enhanced-jobs-data"
import { ResponsiveBannerContainer } from "@/components/responsive-banner-container"
import { ContentAwareLayout } from "@/components/content-aware-layout"

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const fetchedJobs = await fetchJobs()
        setJobs(fetchedJobs)
      } catch (err) {
        setError('Failed to load jobs. Please try again later.')
        console.error('Error loading jobs:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadJobs()
  }, [])

  const [filters, setFilters] = useState({
    category: "all",
    location: "all",
    type: "all",
    salaryMin: "",
    salaryMax: "",
    experience: "all",
    datePosted: "all",
  })

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Basic filters
      const categoryMatch = filters.category === "all" || job.category === filters.category
      const locationMatch = filters.location === "all" || job.location.includes(filters.location.replace(", Remote", ""))
      const typeMatch = filters.type === "all" || (
        filters.type === "Premium" ? job.is_premium : !job.is_premium
      )

      // Advanced filters
      const salaryMatch =
        (!filters.salaryMin || job.salary.min >= Number.parseInt(filters.salaryMin)) &&
        (!filters.salaryMax || job.salary.max <= Number.parseInt(filters.salaryMax))

      const experienceMatch = filters.experience === "all" || job.experience === filters.experience

      // Date posted filter
      let dateMatch = true
      if (filters.datePosted !== "all") {
        const now = new Date()
        const jobDate = new Date(job.datePosted)
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

      return categoryMatch && locationMatch && typeMatch && salaryMatch && experienceMatch && dateMatch
    })
  }, [jobs, filters])

  // Sort jobs to show Premium jobs first
  const sortedJobs = useMemo(() => {
    return [...filteredJobs].sort((a, b) => {
      if (a.is_premium && !b.is_premium) return -1
      if (!a.is_premium && b.is_premium) return 1
      // If both are premium or both are not, sort by date
      return new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime()
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
      datePosted: "all",
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading jobs...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    )
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
            <p className="text-gray-600">Discover your next opportunity from {jobs.length} available positions</p>
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
              onDatePostedChange={(value) => updateFilter("datePosted", value)}
              onClearFilters={clearFilters}
              activeFilters={filters}
            />
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-600">
              Showing {sortedJobs.length} of {jobs.length} jobs
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

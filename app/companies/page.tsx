"use client"

import { useState, useMemo } from "react"
import { Navigation } from "@/components/navigation"
import { CompanyCard } from "@/components/company-card"
import { CompanySearchFilters } from "@/components/company-search-filters"
import { Footer } from "@/components/footer"
import { ResponsiveBannerContainer } from "@/components/responsive-banner-container"
import { ContentAwareLayout } from "@/components/content-aware-layout"
import { companiesData } from "@/lib/companies-data"
import { Building2, TrendingUp } from "lucide-react"

export default function CompaniesPage() {
  const [filters, setFilters] = useState({
    search: "",
    industry: "all",
    size: "all",
    location: "all",
  })

  const filteredCompanies = useMemo(() => {
    return companiesData.filter((company) => {
      // Search filter
      const searchMatch =
        !filters.search ||
        company.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        company.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        company.industry.toLowerCase().includes(filters.search.toLowerCase())

      // Industry filter
      const industryMatch = filters.industry === "all" || company.industry === filters.industry

      // Size filter
      let sizeMatch = true
      if (filters.size !== "all") {
        const companySize = company.size.toLowerCase()
        switch (filters.size) {
          case "1-25":
            sizeMatch = companySize.includes("25") && !companySize.includes("50")
            break
          case "25-100":
            sizeMatch = companySize.includes("25-") || companySize.includes("50-100")
            break
          case "100-500":
            sizeMatch = companySize.includes("100-") || companySize.includes("150-") || companySize.includes("200-")
            break
          case "500+":
            sizeMatch = companySize.includes("500")
            break
        }
      }

      // Location filter
      const locationMatch =
        filters.location === "all" || company.location.toLowerCase().includes(filters.location.toLowerCase())

      return searchMatch && industryMatch && sizeMatch && locationMatch
    })
  }, [filters])

  const updateFilter = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      search: "",
      industry: "all",
      size: "all",
      location: "all",
    })
  }

  // Get industry stats
  const industryStats = useMemo(() => {
    const stats: Record<string, number> = {}
    companiesData.forEach((company) => {
      stats[company.industry] = (stats[company.industry] || 0) + 1
    })
    return Object.entries(stats).sort((a, b) => b[1] - a[1])
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Banner System */}
      <ResponsiveBannerContainer />

      <ContentAwareLayout>
        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Companies</h1>
            </div>
            <p className="text-gray-600 mb-6">
              Discover {companiesData.length} innovative companies hiring on our platform. Explore their culture,
              benefits, and open positions.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg border text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">{companiesData.length}</div>
                <div className="text-sm text-gray-600">Total Companies</div>
              </div>
              <div className="bg-white p-4 rounded-lg border text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {companiesData.reduce((sum, company) => sum + company.jobCount, 0)}
                </div>
                <div className="text-sm text-gray-600">Open Positions</div>
              </div>
              <div className="bg-white p-4 rounded-lg border text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">{industryStats.length}</div>
                <div className="text-sm text-gray-600">Industries</div>
              </div>
              <div className="bg-white p-4 rounded-lg border text-center">
                <div className="text-2xl font-bold text-orange-600 mb-1">
                  {companiesData.filter((c) => c.location === "Remote").length}
                </div>
                <div className="text-sm text-gray-600">Remote-First</div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            <CompanySearchFilters
              onSearchChange={(value) => updateFilter("search", value)}
              onIndustryChange={(value) => updateFilter("industry", value)}
              onSizeChange={(value) => updateFilter("size", value)}
              onLocationChange={(value) => updateFilter("location", value)}
              onClearFilters={clearFilters}
              activeFilters={filters}
            />
          </div>

          {/* Results Summary */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {filteredCompanies.length} of {companiesData.length} companies
              {Object.values(filters).some((filter) => filter !== "all" && filter !== "") && " (filtered)"}
            </p>
            {filteredCompanies.length > 0 && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <TrendingUp className="h-4 w-4" />
                <span>
                  {filteredCompanies.reduce((sum, company) => sum + company.jobCount, 0)} total jobs available
                </span>
              </div>
            )}
          </div>

          {/* Companies Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredCompanies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>

          {/* No Results */}
          {filteredCompanies.length === 0 && (
            <div className="text-center py-12">
              <Building2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No companies found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search criteria or clearing the filters.</p>
              <button onClick={clearFilters} className="text-blue-600 hover:text-blue-800 font-medium">
                Clear all filters
              </button>
            </div>
          )}

          {/* Industry Breakdown */}
          {filteredCompanies.length > 0 && (
            <div className="mt-12 bg-white p-6 rounded-lg border">
              <h3 className="text-lg font-semibold mb-4">Companies by Industry</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {industryStats.map(([industry, count]) => (
                  <div key={industry} className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-semibold text-gray-900">{count}</div>
                    <div className="text-sm text-gray-600">{industry}</div>
                  </div>
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

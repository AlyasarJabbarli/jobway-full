"use client"

import { useState, useMemo, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { CompanyCard } from "@/components/company-card"
import { CompanySearchFilters } from "@/components/company-search-filters"
import { Footer } from "@/components/footer"
import { ResponsiveBannerContainer } from "@/components/responsive-banner-container"
import { ContentAwareLayout } from "@/components/content-aware-layout"
import { Building2, TrendingUp } from "lucide-react"
import type { Company } from "@/lib/companies-data"

export default function CompaniesPage() {
  const [companiesData, setCompaniesData] = useState<Company[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch('/api/companies')
        const data = await response.json()
        setCompaniesData(data)
      } catch (error) {
        console.error('Error fetching companies:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCompanies()
  }, [])

  const [filters, setFilters] = useState({
    search: "",
    size: "all",
    location: "all",
  })

  const filteredCompanies = useMemo(() => {
    return companiesData.filter((company) => {
      const matchesSearch =
        !filters.search ||
        company.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        (company.description && company.description.toLowerCase().includes(filters.search.toLowerCase()));
      const matchesSize = filters.size === "all" || company.size === filters.size;
      const matchesLocation = filters.location === "all" || company.location === filters.location;
      return matchesSearch && matchesSize && matchesLocation;
    })
  }, [filters, companiesData])

  const updateFilter = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({ search: "", size: "all", location: "all" })
  }

  // Get industry stats
  const industryStats = useMemo(() => {
    const uniqueIndustries = new Set<string>();
    companiesData.forEach((company) => {
      if (company.industry && company.industry !== "Unknown") {
        uniqueIndustries.add(company.industry);
      }
    });
    return Array.from(uniqueIndustries);
  }, [companiesData])

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
            {isLoading ? (
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-gray-200 p-4 rounded-lg h-20"></div>
                  ))}
                </div>
              </div>
            ) : (
              <>
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
                      {companiesData.reduce((sum, company) => sum + (typeof company.openPositions === 'number' ? company.openPositions : (typeof (company as any).jobCount === 'number' ? (company as any).jobCount : 0)), 0)}
                    </div>
                    <div className="text-sm text-gray-600">Open Positions</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-1">{industryStats.length}</div>
                    <div className="text-sm text-gray-600">Industries</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border text-center">
                    <div className="text-2xl font-bold text-orange-600 mb-1">
                      {companiesData.filter((c) => typeof c.location === 'string' && c.location.toLowerCase().includes('remote')).length}
                    </div>
                    <div className="text-sm text-gray-600">Remote-First</div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            <CompanySearchFilters
              onSearchChange={(value) => updateFilter("search", value)}
              onSizeChange={(value) => updateFilter("size", value)}
              onLocationChange={(value) => updateFilter("location", value)}
              onClearFilters={clearFilters}
              activeFilters={filters}
            />
          </div>

          {/* Results Summary */}
          {!isLoading && (
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing {filteredCompanies.length} of {companiesData.length} companies
                {Object.values(filters).some((filter) => filter !== "all" && filter !== "") && " (filtered)"}
              </p>
              {filteredCompanies.length > 0 && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <TrendingUp className="h-4 w-4" />
                  <span>
                    {filteredCompanies.reduce((sum, company) => sum + company.openPositions, 0)} total jobs available
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Companies Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-lg border animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredCompanies.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
          )}

          {/* No Results */}
          {!isLoading && filteredCompanies.length === 0 && (
            <div className="text-center py-12">
              <Building2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No companies found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search criteria or clearing the filters.</p>
              <button onClick={clearFilters} className="text-blue-600 hover:text-blue-800 font-medium">
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

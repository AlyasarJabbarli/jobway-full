"use client"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, X } from "lucide-react"

interface CompanySearchFiltersProps {
  onSearchChange: (search: string) => void
  onIndustryChange: (industry: string) => void
  onSizeChange: (size: string) => void
  onLocationChange: (location: string) => void
  onClearFilters: () => void
  activeFilters: {
    search: string
    industry: string
    size: string
    location: string
  }
}

export function CompanySearchFilters({
  onSearchChange,
  onIndustryChange,
  onSizeChange,
  onLocationChange,
  onClearFilters,
  activeFilters,
}: CompanySearchFiltersProps) {
  const getActiveFilterCount = () => {
    let count = 0
    if (activeFilters.search) count++
    if (activeFilters.industry !== "all") count++
    if (activeFilters.size !== "all") count++
    if (activeFilters.location !== "all") count++
    return count
  }

  const clearSpecificFilter = (filterType: string) => {
    switch (filterType) {
      case "search":
        onSearchChange("")
        break
      case "industry":
        onIndustryChange("all")
        break
      case "size":
        onSizeChange("all")
        break
      case "location":
        onLocationChange("all")
        break
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Search & Filter Companies
          {getActiveFilterCount() > 0 && (
            <Badge variant="secondary" className="ml-2">
              {getActiveFilterCount()}
            </Badge>
          )}
        </h3>
        <Button variant="outline" size="sm" onClick={onClearFilters}>
          Clear All
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search companies by name or description..."
          value={activeFilters.search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filter Dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select value={activeFilters.industry} onValueChange={onIndustryChange}>
          <SelectTrigger>
            <SelectValue placeholder="All Industries" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Industries</SelectItem>
            <SelectItem value="Technology">Technology</SelectItem>
            <SelectItem value="Design & Creative">Design & Creative</SelectItem>
            <SelectItem value="Sales & Marketing">Sales & Marketing</SelectItem>
            <SelectItem value="Human Resources">Human Resources</SelectItem>
            <SelectItem value="Data & Analytics">Data & Analytics</SelectItem>
            <SelectItem value="Finance">Finance</SelectItem>
            <SelectItem value="Healthcare">Healthcare</SelectItem>
          </SelectContent>
        </Select>

        <Select value={activeFilters.size} onValueChange={onSizeChange}>
          <SelectTrigger>
            <SelectValue placeholder="Company Size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sizes</SelectItem>
            <SelectItem value="1-25">Startup (1-25)</SelectItem>
            <SelectItem value="25-100">Small (25-100)</SelectItem>
            <SelectItem value="100-500">Medium (100-500)</SelectItem>
            <SelectItem value="500+">Large (500+)</SelectItem>
          </SelectContent>
        </Select>

        <Select value={activeFilters.location} onValueChange={onLocationChange}>
          <SelectTrigger>
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="Remote">Remote</SelectItem>
            <SelectItem value="San Francisco">San Francisco</SelectItem>
            <SelectItem value="New York">New York</SelectItem>
            <SelectItem value="London">London</SelectItem>
            <SelectItem value="Berlin">Berlin</SelectItem>
            <SelectItem value="Boston">Boston</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Active Filters Display */}
      {getActiveFilterCount() > 0 && (
        <div className="space-y-2">
          <span className="text-sm font-medium text-gray-700">Active Filters:</span>
          <div className="flex flex-wrap gap-2">
            {activeFilters.search && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Search: "{activeFilters.search}"
                <X className="h-3 w-3 cursor-pointer" onClick={() => clearSpecificFilter("search")} />
              </Badge>
            )}
            {activeFilters.industry !== "all" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Industry: {activeFilters.industry}
                <X className="h-3 w-3 cursor-pointer" onClick={() => clearSpecificFilter("industry")} />
              </Badge>
            )}
            {activeFilters.size !== "all" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Size: {activeFilters.size}
                <X className="h-3 w-3 cursor-pointer" onClick={() => clearSpecificFilter("size")} />
              </Badge>
            )}
            {activeFilters.location !== "all" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Location: {activeFilters.location}
                <X className="h-3 w-3 cursor-pointer" onClick={() => clearSpecificFilter("location")} />
              </Badge>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

"use client"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, X } from "lucide-react"
import { Label } from "@/components/ui/label"
import { companiesData } from "@/lib/companies-data"

interface CompanySearchFiltersProps {
  onSearchChange: (search: string) => void
  onSizeChange: (size: string) => void
  onLocationChange: (location: string) => void
  onClearFilters: () => void
  activeFilters: {
    search: string
    size: string
    location: string
  }
}

export function CompanySearchFilters({
  onSearchChange,
  onSizeChange,
  onLocationChange,
  onClearFilters,
  activeFilters,
}: CompanySearchFiltersProps) {
  // Extract unique filter values from real data
  const sizes = Array.from(new Set(companiesData.map(c => c.size)));
  const locations = Array.from(new Set(companiesData.map(c => c.location)));

  return (
    <div className="bg-white p-4 rounded-lg border flex items-center gap-4">
      <div className="flex-1 flex items-center">
        <Search className="mr-2 text-gray-400" />
        <input
          id="search"
          type="text"
          placeholder="Search companies..."
          value={activeFilters.search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full border-none outline-none bg-transparent"
        />
      </div>
      <Select value={activeFilters.size || "all"} onValueChange={onSizeChange}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="All Sizes" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Sizes</SelectItem>
          {sizes.map(size => (
            <SelectItem key={size} value={size}>{size}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={activeFilters.location || "all"} onValueChange={onLocationChange}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="All Locations" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Locations</SelectItem>
          {locations.map(location => (
            <SelectItem key={location} value={location}>{location}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

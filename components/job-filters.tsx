"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

interface JobFiltersProps {
  onCategoryChange: (category: string) => void
  onLocationChange: (location: string) => void
  onTypeChange: (type: string) => void
  onClearFilters: () => void
}

export function JobFilters({ onCategoryChange, onLocationChange, onTypeChange, onClearFilters }: JobFiltersProps) {
  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Filter Jobs</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Select onValueChange={onCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Engineering">Engineering</SelectItem>
            <SelectItem value="Marketing">Marketing</SelectItem>
            <SelectItem value="Design">Design</SelectItem>
            <SelectItem value="Sales">Sales</SelectItem>
            <SelectItem value="HR">Human Resources</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={onLocationChange}>
          <SelectTrigger>
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="Remote">Remote</SelectItem>
            <SelectItem value="New York">New York</SelectItem>
            <SelectItem value="San Francisco">San Francisco</SelectItem>
            <SelectItem value="London">London</SelectItem>
            <SelectItem value="Berlin">Berlin</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={onTypeChange}>
          <SelectTrigger>
            <SelectValue placeholder="Job Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Premium">Premium</SelectItem>
            <SelectItem value="Simple">Simple</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" onClick={onClearFilters}>
          Clear Filters
        </Button>
      </div>
    </div>
  )
}

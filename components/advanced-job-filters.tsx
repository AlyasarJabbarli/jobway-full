"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { X, Filter } from "lucide-react"

interface AdvancedJobFiltersProps {
  onCategoryChange: (category: string) => void
  onLocationChange: (location: string) => void
  onTypeChange: (type: string) => void
  onSalaryRangeChange: (min: string, max: string) => void
  onExperienceChange: (experience: string) => void
  onDatePostedChange: (datePosted: string) => void
  onClearFilters: () => void
  activeFilters: {
    category: string
    location: string
    type: string
    salaryMin: string
    salaryMax: string
    experience: string
    datePosted: string
  }
}

export function AdvancedJobFilters({
  onCategoryChange,
  onLocationChange,
  onTypeChange,
  onSalaryRangeChange,
  onExperienceChange,
  onDatePostedChange,
  onClearFilters,
  activeFilters,
}: AdvancedJobFiltersProps) {
  const getActiveFilterCount = () => {
    let count = 0
    if (activeFilters.category !== "all") count++
    if (activeFilters.location !== "all") count++
    if (activeFilters.type !== "all") count++
    if (activeFilters.salaryMin) count++
    if (activeFilters.salaryMax) count++
    if (activeFilters.experience !== "all") count++
    if (activeFilters.datePosted !== "all") count++
    return count
  }

  const clearSpecificFilter = (filter: keyof typeof activeFilters) => {
    switch (filter) {
      case "category":
        onCategoryChange("all")
        break
      case "location":
        onLocationChange("all")
        break
      case "type":
        onTypeChange("all")
        break
      case "salaryMin":
      case "salaryMax":
        onSalaryRangeChange("", "")
        break
      case "experience":
        onExperienceChange("all")
        break
      case "datePosted":
        onDatePostedChange("all")
        break
    }
  }

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Advanced Filters
            {getActiveFilterCount() > 0 && (
              <Badge variant="secondary" className="ml-2">
                {getActiveFilterCount()}
              </Badge>
            )}
          </CardTitle>
          <Button variant="outline" size="sm" onClick={onClearFilters}>
            Clear All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={activeFilters.category} onValueChange={onCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Sales">Sales</SelectItem>
                <SelectItem value="HR">Human Resources</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
                <SelectItem value="Operations">Operations</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Select value={activeFilters.location} onValueChange={onLocationChange}>
              <SelectTrigger>
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="San Francisco, CA">San Francisco</SelectItem>
                <SelectItem value="New York, NY">New York</SelectItem>
                <SelectItem value="London, UK">London</SelectItem>
                <SelectItem value="Berlin, Germany">Berlin</SelectItem>
                <SelectItem value="Remote">Remote</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Job Type</Label>
            <Select value={activeFilters.type} onValueChange={onTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Premium">Premium</SelectItem>
                <SelectItem value="Simple">Simple</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Salary Range */}
        <div className="space-y-2">
          <Label>Salary Range</Label>
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="number"
              placeholder="Min"
              value={activeFilters.salaryMin}
              onChange={(e) => onSalaryRangeChange(e.target.value, activeFilters.salaryMax)}
            />
            <Input
              type="number"
              placeholder="Max"
              value={activeFilters.salaryMax}
              onChange={(e) => onSalaryRangeChange(activeFilters.salaryMin, e.target.value)}
            />
          </div>
        </div>

        {/* Experience Level */}
        <div className="space-y-2">
          <Label htmlFor="experience">Experience Level</Label>
          <Select value={activeFilters.experience} onValueChange={onExperienceChange}>
            <SelectTrigger>
              <SelectValue placeholder="All Experience Levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Experience Levels</SelectItem>
              <SelectItem value="Entry-level (0-2 years)">Entry Level (0-2 years)</SelectItem>
              <SelectItem value="Mid-level (3-5 years)">Mid Level (3-5 years)</SelectItem>
              <SelectItem value="Senior (5+ years)">Senior (5+ years)</SelectItem>
              <SelectItem value="Executive (10+ years)">Executive (10+ years)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date Posted */}
        <div className="space-y-2">
          <Label htmlFor="datePosted">Date Posted</Label>
          <Select value={activeFilters.datePosted} onValueChange={onDatePostedChange}>
            <SelectTrigger>
              <SelectValue placeholder="Any Time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Time</SelectItem>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Active Filters */}
        {getActiveFilterCount() > 0 && (
          <>
            <Separator />
            <div className="space-y-2">
              <Label>Active Filters</Label>
              <div className="flex flex-wrap gap-2">
                {activeFilters.category !== "all" && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Category: {activeFilters.category}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => clearSpecificFilter("category")} />
                  </Badge>
                )}
                {activeFilters.location !== "all" && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Location: {activeFilters.location}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => clearSpecificFilter("location")} />
                  </Badge>
                )}
                {activeFilters.type !== "all" && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Type: {activeFilters.type}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => clearSpecificFilter("type")} />
                  </Badge>
                )}
                {(activeFilters.salaryMin || activeFilters.salaryMax) && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Salary: {activeFilters.salaryMin || "0"} - {activeFilters.salaryMax || "∞"}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => {
                        clearSpecificFilter("salaryMin")
                        clearSpecificFilter("salaryMax")
                      }}
                    />
                  </Badge>
                )}
                {activeFilters.experience !== "all" && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Experience: {activeFilters.experience}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => clearSpecificFilter("experience")} />
                  </Badge>
                )}
                {activeFilters.datePosted !== "all" && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Posted:{" "}
                    {activeFilters.datePosted === "24h"
                      ? "Last 24 hours"
                      : activeFilters.datePosted === "7d"
                        ? "Last 7 days"
                        : activeFilters.datePosted === "30d"
                          ? "Last 30 days"
                          : activeFilters.datePosted}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => clearSpecificFilter("datePosted")} />
                  </Badge>
                )}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

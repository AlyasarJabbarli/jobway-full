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
  onIndustryChange: (industry: string) => void
  onDatePostedChange: (datePosted: string) => void
  onClearFilters: () => void
  activeFilters: {
    category: string
    location: string
    type: string
    salaryMin: string
    salaryMax: string
    experience: string
    industry: string
    datePosted: string
  }
}

export function AdvancedJobFilters({
  onCategoryChange,
  onLocationChange,
  onTypeChange,
  onSalaryRangeChange,
  onExperienceChange,
  onIndustryChange,
  onDatePostedChange,
  onClearFilters,
  activeFilters,
}: AdvancedJobFiltersProps) {
  const [salaryMin, setSalaryMin] = useState(activeFilters.salaryMin)
  const [salaryMax, setSalaryMax] = useState(activeFilters.salaryMax)

  const handleSalaryChange = () => {
    onSalaryRangeChange(salaryMin, salaryMax)
  }

  const getActiveFilterCount = () => {
    let count = 0
    if (activeFilters.category !== "all") count++
    if (activeFilters.location !== "all") count++
    if (activeFilters.type !== "all") count++
    if (activeFilters.salaryMin || activeFilters.salaryMax) count++
    if (activeFilters.experience !== "all") count++
    if (activeFilters.industry !== "all") count++
    if (activeFilters.datePosted !== "all") count++
    return count
  }

  const clearSpecificFilter = (filterType: string) => {
    switch (filterType) {
      case "category":
        onCategoryChange("all")
        break
      case "location":
        onLocationChange("all")
        break
      case "type":
        onTypeChange("all")
        break
      case "salary":
        setSalaryMin("")
        setSalaryMax("")
        onSalaryRangeChange("", "")
        break
      case "experience":
        onExperienceChange("all")
        break
      case "industry":
        onIndustryChange("all")
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
                <SelectItem value="Remote">Remote</SelectItem>
                <SelectItem value="New York">New York</SelectItem>
                <SelectItem value="San Francisco">San Francisco</SelectItem>
                <SelectItem value="London">London</SelectItem>
                <SelectItem value="Berlin">Berlin</SelectItem>
                <SelectItem value="Boston">Boston</SelectItem>
                <SelectItem value="Seattle">Seattle</SelectItem>
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

        <Separator />

        {/* Advanced Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Salary Range */}
          <div className="space-y-2">
            <Label>Salary Range (USD)</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={salaryMin}
                onChange={(e) => setSalaryMin(e.target.value)}
                onBlur={handleSalaryChange}
                className="text-sm"
              />
              <Input
                type="number"
                placeholder="Max"
                value={salaryMax}
                onChange={(e) => setSalaryMax(e.target.value)}
                onBlur={handleSalaryChange}
                className="text-sm"
              />
            </div>
          </div>

          {/* Experience Level */}
          <div className="space-y-2">
            <Label htmlFor="experience">Experience Level</Label>
            <Select value={activeFilters.experience} onValueChange={onExperienceChange}>
              <SelectTrigger>
                <SelectValue placeholder="Any Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Level</SelectItem>
                <SelectItem value="Entry-level">Entry-level (0-2 years)</SelectItem>
                <SelectItem value="Mid-level">Mid-level (3-5 years)</SelectItem>
                <SelectItem value="Senior">Senior (5+ years)</SelectItem>
                <SelectItem value="Executive">Executive (10+ years)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Industry */}
          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <Select value={activeFilters.industry} onValueChange={onIndustryChange}>
              <SelectTrigger>
                <SelectValue placeholder="All Industries" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Healthcare">Healthcare</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
                <SelectItem value="Education">Education</SelectItem>
                <SelectItem value="Retail">Retail</SelectItem>
                <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                <SelectItem value="Consulting">Consulting</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Posted */}
          <div className="space-y-2">
            <Label htmlFor="datePosted">Date Posted</Label>
            <Select value={activeFilters.datePosted} onValueChange={onDatePostedChange}>
              <SelectTrigger>
                <SelectValue placeholder="Any time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any time</SelectItem>
                <SelectItem value="24h">Last 24 hours</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active Filters Display */}
        {getActiveFilterCount() > 0 && (
          <>
            <Separator />
            <div className="space-y-2">
              <Label className="text-sm font-medium">Active Filters:</Label>
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
                    Salary: ${activeFilters.salaryMin || "0"} - ${activeFilters.salaryMax || "∞"}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => clearSpecificFilter("salary")} />
                  </Badge>
                )}
                {activeFilters.experience !== "all" && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Experience: {activeFilters.experience}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => clearSpecificFilter("experience")} />
                  </Badge>
                )}
                {activeFilters.industry !== "all" && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Industry: {activeFilters.industry}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => clearSpecificFilter("industry")} />
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

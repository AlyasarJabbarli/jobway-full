"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Job {
  id: string
  title: string
  company: string
  location: string
  description: string
  type: "Premium" | "Simple"
  category: string
  postedDate: string
}

interface SearchBarProps {
  jobs: Job[]
  onJobSelect?: (job: Job) => void
  placeholder?: string
}

export function SearchBar({
  jobs,
  onJobSelect,
  placeholder = "Search jobs, companies, or keywords...",
}: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (query.trim() === "") {
      setFilteredJobs([])
      setIsOpen(false)
      return
    }

    const filtered = jobs.filter((job) => {
      const searchTerm = query.toLowerCase()
      return (
        job.title.toLowerCase().includes(searchTerm) ||
        job.company.toLowerCase().includes(searchTerm) ||
        job.description.toLowerCase().includes(searchTerm) ||
        job.category.toLowerCase().includes(searchTerm) ||
        job.location.toLowerCase().includes(searchTerm)
      )
    })

    setFilteredJobs(filtered.slice(0, 5)) // Limit to 5 results
    setIsOpen(filtered.length > 0)
  }, [query, jobs])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleJobSelect = (job: Job) => {
    setQuery("")
    setIsOpen(false)
    router.push(`/jobs/${job.id}`)
    onJobSelect?.(job)
  }

  const clearSearch = () => {
    setQuery("")
    setIsOpen(false)
  }

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10"
          onFocus={() => query && setIsOpen(true)}
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
            onClick={clearSearch}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      {isOpen && filteredJobs.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 shadow-lg">
          <CardContent className="p-2">
            <div className="space-y-1">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="p-3 hover:bg-gray-50 cursor-pointer rounded-md transition-colors"
                  onClick={() => handleJobSelect(job)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{job.title}</h4>
                      <p className="text-xs text-gray-600">
                        {job.company} • {job.location}
                      </p>
                    </div>
                    <Badge
                      variant={job.type === "Premium" ? "default" : "secondary"}
                      className={`text-xs ${job.type === "Premium" ? "bg-yellow-500 hover:bg-yellow-600" : ""}`}
                    >
                      {job.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            {jobs.filter((job) => {
              const searchTerm = query.toLowerCase()
              return (
                job.title.toLowerCase().includes(searchTerm) ||
                job.company.toLowerCase().includes(searchTerm) ||
                job.description.toLowerCase().includes(searchTerm) ||
                job.category.toLowerCase().includes(searchTerm) ||
                job.location.toLowerCase().includes(searchTerm)
              )
            }).length > 5 && (
              <div className="text-center pt-2 border-t">
                <p className="text-xs text-gray-500">
                  +
                  {jobs.filter((job) => {
                    const searchTerm = query.toLowerCase()
                    return (
                      job.title.toLowerCase().includes(searchTerm) ||
                      job.company.toLowerCase().includes(searchTerm) ||
                      job.description.toLowerCase().includes(searchTerm) ||
                      job.category.toLowerCase().includes(searchTerm) ||
                      job.location.toLowerCase().includes(searchTerm)
                    )
                  }).length - 5}{" "}
                  more results
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

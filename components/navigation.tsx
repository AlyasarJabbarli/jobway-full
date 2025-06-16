"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Briefcase } from "lucide-react"
import { SearchBar } from "./search-bar"
import { MobileNavigation } from "./mobile-navigation"
import { allJobs } from "@/lib/enhanced-jobs-data"

export function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/jobs", label: "Jobs" },
    { href: "/companies", label: "Companies" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
  ]

  const handleJobSelect = (job: any) => {
    // In a real app, this would navigate to the job detail page
    console.log("Selected job:", job)
  }

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Briefcase className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">JobWay</span>
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden lg:block flex-1 max-w-md mx-8">
            <SearchBar jobs={allJobs} onJobSelect={handleJobSelect} />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  pathname === item.href ? "text-blue-600" : "text-gray-600"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Navigation */}
          <MobileNavigation />
        </nav>

        {/* Mobile Search Bar */}
        <div className="lg:hidden mt-4">
          <SearchBar jobs={allJobs} onJobSelect={handleJobSelect} />
        </div>
      </div>
    </header>
  )
}

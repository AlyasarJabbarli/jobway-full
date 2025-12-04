"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Briefcase, Sun, Moon } from "lucide-react"
import { SearchBar } from "./search-bar"
import { MobileNavigation } from "./mobile-navigation"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

export function Navigation() {
  const pathname = usePathname()
  const [allJobs, setAllJobs] = useState([])
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => setAllJobs(data))
  }, [])

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
    <header className="border-b bg-background sticky top-0 z-50">
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
                className={`text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                  pathname === item.href
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
            {/* Dark mode toggle */}
            <button
              aria-label="Toggle dark mode"
              className="ml-4 p-2 rounded-full border border-transparent hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-800" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          <MobileNavigation />
        </nav>

        {/* Mobile Search Bar */}
        <div className="lg:hidden mt-4">
          <SearchBar jobs={allJobs} onJobSelect={handleJobSelect} />
        </div>

        {/* Mobile dark mode toggle */}
        <div className="flex md:hidden justify-end mt-2">
          <button
            aria-label="Toggle dark mode"
            className="p-2 rounded-full border border-transparent hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-gray-800" />
            )}
          </button>
        </div>
      </div>
    </header>
  )
}

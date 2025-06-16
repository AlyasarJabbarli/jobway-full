"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Menu, Briefcase, Home, Search, Building2, Settings, Info, X } from "lucide-react"

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/jobs", label: "Jobs", icon: Search },
    { href: "/companies", label: "Companies", icon: Building2 },
    { href: "/services", label: "Services", icon: Settings },
    { href: "/about", label: "About", icon: Info },
  ]

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="p-2">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-0">
          <SheetHeader className="p-6 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Briefcase className="h-6 w-6 text-blue-600" />
                <SheetTitle className="text-xl font-bold text-gray-900">JobWay</SheetTitle>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="p-1">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </SheetHeader>

          <div className="px-6">
            <Separator />
          </div>

          <nav className="flex flex-col space-y-1 p-6">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleLinkClick}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                    ${
                      isActive
                        ? "bg-blue-50 text-blue-600 border border-blue-200"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }
                  `}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          <div className="px-6">
            <Separator />
          </div>

          <div className="p-6 space-y-4">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-900">Quick Actions</h3>
              <div className="space-y-2">
                <Button asChild className="w-full justify-start" size="sm">
                  <a href="mailto:jobs@example.com">
                    <Briefcase className="mr-2 h-4 w-4" />
                    Post a Job
                  </a>
                </Button>
                <Button variant="outline" asChild className="w-full justify-start" size="sm">
                  <a href="https://forms.google.com/your-form-id" target="_blank" rel="noopener noreferrer">
                    <Search className="mr-2 h-4 w-4" />
                    Send Your CV
                  </a>
                </Button>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-900">Contact</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>📧 hello@jobportal.com</p>
                <p>📞 +1 (555) 123-4567</p>
                <p>📍 San Francisco, CA</p>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

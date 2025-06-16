"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { currentModerator, moderationStats } from "@/lib/moderation-data"
import { LayoutDashboard, Briefcase, Building2, Activity, Settings, Menu, LogOut, Shield } from "lucide-react"

interface ModerationLayoutProps {
  children: React.ReactNode
}

export function ModerationLayout({ children }: ModerationLayoutProps) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigation = [
    { name: "Dashboard", href: "/moderation", icon: LayoutDashboard },
    { name: "Jobs", href: "/moderation/jobs", icon: Briefcase },
    { name: "Companies", href: "/moderation/companies", icon: Building2 },
    { name: "Activity Log", href: "/moderation/activity", icon: Activity },
    { name: "Settings", href: "/moderation/settings", icon: Settings },
  ]

  const Sidebar = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-2 p-6 border-b">
        <Shield className="h-8 w-8 text-orange-600" />
        <div>
          <h1 className="text-xl font-bold">JobPortal</h1>
          <p className="text-xs text-gray-500">Moderation Panel</p>
        </div>
      </div>

      {/* User Info */}
      <div className="p-6 border-b">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={currentModerator.avatar || "/placeholder.svg"} />
            <AvatarFallback>
              {currentModerator.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-medium text-sm">{currentModerator.name}</p>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-700">
                {currentModerator.role}
              </Badge>
              <span className={`w-2 h-2 rounded-full ${currentModerator.isActive ? "bg-green-500" : "bg-gray-400"}`} />
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
          <div className="bg-orange-50 p-2 rounded">
            <div className="flex items-center gap-1 text-orange-600">
              <Briefcase className="h-3 w-3" />
              <span>Jobs Managed</span>
            </div>
            <div className="font-semibold text-orange-700">{moderationStats.totalJobs}</div>
          </div>
          <div className="bg-green-50 p-2 rounded">
            <div className="flex items-center gap-1 text-green-600">
              <Building2 className="h-3 w-3" />
              <span>Companies Managed</span>
            </div>
            <div className="font-semibold text-green-700">{moderationStats.totalCompanies}</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? "bg-orange-100 text-orange-700" : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </div>
                  {item.badge && item.badge > 0 && (
                    <Badge variant="destructive" className="h-5 text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t">
        <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-orange-50/30">
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-orange-200 overflow-y-auto">
          <Sidebar />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="lg:hidden fixed top-4 left-4 z-50">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <Sidebar />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="lg:pl-72">
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  )
}

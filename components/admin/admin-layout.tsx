"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { currentUser } from "@/lib/admin-data"
import { LayoutDashboard, Briefcase, Building2, Users, BarChart3, Settings, Menu, LogOut, Shield } from "lucide-react"

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Jobs", href: "/admin/jobs", icon: Briefcase },
    { name: "Companies", href: "/admin/companies", icon: Building2 },
    { name: "Banners", href: "/admin/banners", icon: BarChart3 },
    ...(currentUser.role === "admin"
      ? [
          { name: "Moderators", href: "/admin/moderators", icon: Users },
          { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
        ]
      : []),
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ]

  const Sidebar = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-2 p-6 border-b">
        <Shield className="h-8 w-8 text-blue-600" />
        <div>
          <h1 className="text-xl font-bold">JobPortal</h1>
          <p className="text-xs text-gray-500">Admin Panel</p>
        </div>
      </div>

      {/* User Info */}
      <div className="p-6 border-b">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={currentUser.avatar || "/placeholder.svg"} />
            <AvatarFallback>
              {currentUser.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-medium text-sm">{currentUser.name}</p>
            <div className="flex items-center gap-2">
              <Badge variant={currentUser.role === "admin" ? "default" : "secondary"} className="text-xs">
                {currentUser.role}
              </Badge>
              <span className={`w-2 h-2 rounded-full ${currentUser.isActive ? "bg-green-500" : "bg-gray-400"}`} />
            </div>
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
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
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
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 overflow-y-auto">
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

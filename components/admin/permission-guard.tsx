"use client"

import { currentUser, hasPermission } from "@/lib/admin-data"
import type { ReactNode } from "react"

interface PermissionGuardProps {
  children: ReactNode
  resource: string
  action: string
  fallback?: ReactNode
}

export function PermissionGuard({ children, resource, action, fallback }: PermissionGuardProps) {
  if (!hasPermission(currentUser, resource, action)) {
    return (
      fallback || (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">
            You don't have permission to {action} {resource}.
          </p>
        </div>
      )
    )
  }

  return <>{children}</>
}

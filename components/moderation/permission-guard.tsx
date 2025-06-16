"use client"

import type React from "react"
import { currentModerator, hasModeratorPermission } from "@/lib/moderation-data"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield } from "lucide-react"

interface PermissionGuardProps {
  children: React.ReactNode
  resource: string
  action: string
  fallback?: React.ReactNode
}

export function PermissionGuard({ children, resource, action, fallback }: PermissionGuardProps) {
  const hasPermission = hasModeratorPermission(currentModerator, resource, action)

  if (!hasPermission) {
    return (
      fallback || (
        <Alert>
          <Shield className="h-4 w-4" />
          <AlertDescription>
            You don't have permission to {action} {resource}. Contact an administrator if you need access.
          </AlertDescription>
        </Alert>
      )
    )
  }

  return <>{children}</>
}

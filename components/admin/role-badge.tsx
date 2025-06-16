import { Badge } from "@/components/ui/badge"
import { Shield, User } from "lucide-react"

interface RoleBadgeProps {
  role: "admin" | "moderator"
  className?: string
}

export function RoleBadge({ role, className }: RoleBadgeProps) {
  return (
    <Badge variant={role === "admin" ? "default" : "secondary"} className={`flex items-center gap-1 ${className}`}>
      {role === "admin" ? <Shield className="h-3 w-3" /> : <User className="h-3 w-3" />}
      {role}
    </Badge>
  )
}

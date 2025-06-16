"use client"

import type { ReactNode } from "react"

interface ContentAwareLayoutProps {
  children: ReactNode
  hasBanners?: boolean
}

export function ContentAwareLayout({ children, hasBanners = true }: ContentAwareLayoutProps) {
  return (
    <div className="relative">
      {/* Main content with proper margins to avoid banner overlap */}
      <div
        className={`
          ${
            hasBanners
              ? "xl:mx-80 2xl:mx-96" // Margins for banner space on larger screens
              : ""
          }
          transition-all duration-300
        `}
      >
        <div className="max-w-7xl mx-auto">{children}</div>
      </div>
    </div>
  )
}

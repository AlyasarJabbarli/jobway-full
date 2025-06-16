"use client"

import { Button } from "@/components/ui/button"
import { ExternalLink, Star, Target } from "lucide-react"

interface BannerContent {
  id: string
  type: "promotion" | "advertisement"
  title: string
  description: string
  buttonText: string
  buttonLink: string
  badge?: string
}

interface ResponsiveSponsorshipBannerProps {
  position: "left" | "right"
  content: BannerContent
}

const bannerIcons = {
  promotion: Star,
  advertisement: Target,
}

const bannerColors = {
  promotion: "bg-gradient-to-br from-amber-500 to-orange-600",
  advertisement: "bg-gradient-to-br from-purple-600 to-violet-700",
}

export function ResponsiveSponsorshipBanner({ position, content }: ResponsiveSponsorshipBannerProps) {
  const Icon = bannerIcons[content.type]
  const colorClass = bannerColors[content.type]

  return (
    <>
      {/* Desktop Banners - Fixed Position with proper spacing */}
      <div
        className={`
          hidden xl:block fixed top-32 z-30 w-64
          ${position === "left" ? "left-4" : "right-4"}
        `}
      >
        <div className={`${colorClass} text-white rounded-xl shadow-xl p-4 border border-white/20 backdrop-blur-sm`}>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">
              <div className="bg-white/25 p-2 rounded-lg">
                <Icon className="h-4 w-4" />
              </div>
            </div>
            <div className="flex-1 space-y-3">
              {content.badge && (
                <div className="bg-white/20 text-white text-xs px-2 py-1 rounded-md inline-block font-semibold">
                  {content.badge}
                </div>
              )}
              <div>
                <h3 className="font-bold text-sm leading-tight mb-2">{content.title}</h3>
                <p className="text-xs leading-relaxed opacity-95">{content.description}</p>
              </div>
              <Button
                size="sm"
                className="w-full text-xs bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
                asChild
              >
                <a href={content.buttonLink} target="_blank" rel="noopener noreferrer">
                  {content.buttonText}
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </Button>
            </div>
          </div>
          <div className="mt-3 text-center border-t border-white/20 pt-2">
            <span className="text-xs opacity-80 font-semibold tracking-wide">SPONSORED</span>
          </div>
        </div>
      </div>

      {/* Tablet & Mobile: Inline banners */}
      <div className="xl:hidden mb-4">
        <div className={`${colorClass} text-white rounded-lg shadow-lg mx-4 p-3`}>
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <div className="bg-white/25 p-2 rounded-lg">
                <Icon className="h-4 w-4" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-sm truncate">{content.title}</h3>
                {content.badge && (
                  <div className="bg-white/20 text-white text-xs px-2 py-1 rounded-md font-semibold ml-2">
                    {content.badge}
                  </div>
                )}
              </div>
              <p className="text-xs opacity-95 line-clamp-2 mb-2">{content.description}</p>
              <div className="flex items-center justify-between">
                <Button
                  size="sm"
                  className="text-xs bg-white/20 hover:bg-white/30 text-white border-white/30 h-6 px-2"
                  asChild
                >
                  <a href={content.buttonLink} target="_blank" rel="noopener noreferrer">
                    {content.buttonText}
                    <ExternalLink className="ml-1 h-2.5 w-2.5" />
                  </a>
                </Button>
                <span className="text-xs opacity-70 font-medium">SPONSORED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

"use client"

import { useState, useEffect } from "react"
import { useBanners } from "@/lib/banner-management-data"
import type { Banner } from "@/lib/banner-management-data"
import { ExternalLink } from "lucide-react"

interface SponsorshipBannerDisplayProps {
  position: string
  className?: string
}

export function SponsorshipBannerDisplay({ position, className = "" }: SponsorshipBannerDisplayProps) {
  const { banners, isLoading, error } = useBanners()
  const [filteredBanners, setFilteredBanners] = useState<Banner[]>([])
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0)

  const getPositionStyles = () => {
    switch (position) {
      case "left":
      case "right":
        return "w-64 max-w-full"
      case "top":
      case "bottom":
        return "w-full max-w-4xl mx-auto"
      case "inline":
        return "w-80 max-w-full"
      default:
        return ""
    }
  }

  const currentBanner = filteredBanners[currentBannerIndex]

  const handleBannerClick = (banner: Banner) => {
    // Track click
    console.log("Banner clicked:", banner.id)

    // Open target URL
    if (banner.targetUrl) {
      window.open(banner.targetUrl, "_blank", "noopener,noreferrer")
    }
  }

  const trackImpression = (banner: Banner) => {
    // Track impression
    console.log("Banner impression:", banner.id)
  }

  useEffect(() => {
    const activeBanners = banners.filter(
      (banner) => banner.position === position && banner.isActive
    )
    setFilteredBanners(activeBanners)
  }, [banners, position])

  useEffect(() => {
    if (filteredBanners.length > 1) {
      const interval = setInterval(() => {
        setCurrentBannerIndex((prev) => (prev + 1) % filteredBanners.length)
      }, 10000) // Rotate every 10 seconds

      return () => clearInterval(interval)
    }
  }, [filteredBanners.length])

  // Track impression when banner is displayed
  useEffect(() => {
    if (currentBanner) {
      trackImpression(currentBanner)
    }
  }, [currentBanner])

  if (isLoading) return <div>Loading banners...</div>
  if (error) return <div>Error loading banners: {error.message}</div>

  if (filteredBanners.length === 0) {
    return null
  }

  return (
    <div className={`${getPositionStyles()} ${className}`}>
      <div
        className="relative group cursor-pointer overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow"
        onClick={() => handleBannerClick(currentBanner)}
      >
        <img
          src={currentBanner.imageUrl || "/placeholder.svg"}
          alt={currentBanner.title}
          className="w-full h-auto object-cover"
          loading="lazy"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="bg-white bg-opacity-90 rounded-full p-2">
              <ExternalLink className="h-4 w-4 text-gray-700" />
            </div>
          </div>
        </div>

        {/* Sponsored Label */}
        <div className="absolute bottom-0 right-0 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-tl">
          SPONSORED
        </div>

        {/* Banner Rotation Indicator */}
        {filteredBanners.length > 1 && (
          <div className="absolute bottom-2 left-2 flex gap-1">
            {filteredBanners.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentBannerIndex ? "bg-white" : "bg-white bg-opacity-50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Banner Info (for accessibility) */}
      <div className="sr-only">
        <h3>{currentBanner.title}</h3>
        {currentBanner.description && <p>{currentBanner.description}</p>}
        <p>Sponsored content</p>
      </div>
    </div>
  )
}

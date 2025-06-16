"use client"

import { SponsorshipBannerDisplay } from "./sponsorship-banner-display"

interface InlineBannerDisplayProps {
  className?: string
}

export function InlineBannerDisplay({ className = "" }: InlineBannerDisplayProps) {
  return (
    <div className={`my-8 flex justify-center ${className}`}>
      <SponsorshipBannerDisplay position="inline" />
    </div>
  )
}

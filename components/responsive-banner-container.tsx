"use client"

import { SponsorshipBannerDisplay } from "./sponsorship-banner-display"

export function ResponsiveBannerContainer() {
  return (
    <>
      {/* Desktop: Fixed position banners */}
      <div className="hidden xl:block">
        <div className="fixed top-32 left-4 z-30">
          <SponsorshipBannerDisplay position="left" />
        </div>
        <div className="fixed top-32 right-4 z-30">
          <SponsorshipBannerDisplay position="right" />
        </div>
      </div>

      {/* Top banner for all screen sizes */}
      <div className="w-full bg-gray-100 py-2">
        <SponsorshipBannerDisplay position="top" className="container mx-auto px-4" />
      </div>

      {/* Tablet & Mobile: Inline banners */}
      <div className="xl:hidden">
        <div className="container mx-auto px-4 space-y-4 py-4">
          <SponsorshipBannerDisplay position="left" />
          <SponsorshipBannerDisplay position="right" />
        </div>
      </div>
    </>
  )
}

export interface SponsorshipBanner {
  id: string
  title: string
  description?: string
  imageUrl: string
  targetUrl: string
  isActive: boolean
  position: "left" | "right" | "top" | "bottom" | "inline"
  displayOrder: number
  startDate?: Date
  endDate?: Date
  clickCount: number
  impressionCount: number
  createdBy: string
  createdAt: Date
  updatedAt: Date
  tags: string[]
  dimensions: {
    width: number
    height: number
  }
}

export interface BannerStats {
  id: string
  bannerId: string
  date: Date
  clicks: number
  impressions: number
  ctr: number // Click-through rate
}

export interface BannerUpload {
  file: File
  preview: string
  dimensions: {
    width: number
    height: number
  }
}

export const BANNER_POSITIONS = [
  { value: "left", label: "Left Sidebar" },
  { value: "right", label: "Right Sidebar" },
  { value: "top", label: "Top Banner" },
  { value: "bottom", label: "Bottom Banner" },
  { value: "inline", label: "Inline Content" },
] as const

export const BANNER_DIMENSIONS = {
  left: { width: 250, height: 300 },
  right: { width: 250, height: 300 },
  top: { width: 728, height: 90 },
  bottom: { width: 728, height: 90 },
  inline: { width: 300, height: 250 },
} as const

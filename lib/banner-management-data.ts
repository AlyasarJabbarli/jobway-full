import type { SponsorshipBanner, BannerStats } from "./banner-management-types"

export const sponsorshipBanners: SponsorshipBanner[] = [
  {
    id: "banner-1",
    title: "TechBootcamp Pro",
    description: "Master full-stack development in 12 weeks",
    imageUrl: "/placeholder.svg?height=300&width=250&text=TechBootcamp+Pro",
    targetUrl: "https://techbootcamp.example.com",
    isActive: true,
    position: "left",
    displayOrder: 1,
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-12-31"),
    clickCount: 245,
    impressionCount: 12500,
    createdBy: "admin-1",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-15"),
    tags: ["education", "coding", "bootcamp"],
    dimensions: { width: 250, height: 300 },
  },
  {
    id: "banner-2",
    title: "CareerCoach AI",
    description: "Get personalized career advice from AI",
    imageUrl: "/placeholder.svg?height=300&width=250&text=CareerCoach+AI",
    targetUrl: "https://careercoach.example.com",
    isActive: true,
    position: "right",
    displayOrder: 1,
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-11-30"),
    clickCount: 189,
    impressionCount: 9800,
    createdBy: "mod-1",
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-10"),
    tags: ["ai", "career", "coaching"],
    dimensions: { width: 250, height: 300 },
  },
  {
    id: "banner-3",
    title: "DevTools Pro",
    description: "Professional development tools for teams",
    imageUrl: "/placeholder.svg?height=90&width=728&text=DevTools+Pro",
    targetUrl: "https://devtools.example.com",
    isActive: false,
    position: "top",
    displayOrder: 1,
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-06-30"),
    clickCount: 67,
    impressionCount: 3200,
    createdBy: "mod-2",
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-03-05"),
    tags: ["tools", "development", "productivity"],
    dimensions: { width: 728, height: 90 },
  },
  {
    id: "banner-4",
    title: "Remote Work Hub",
    description: "Find the best remote work opportunities",
    imageUrl: "/placeholder.svg?height=250&width=300&text=Remote+Work+Hub",
    targetUrl: "https://remotework.example.com",
    isActive: true,
    position: "inline",
    displayOrder: 1,
    clickCount: 156,
    impressionCount: 7800,
    createdBy: "admin-1",
    createdAt: new Date("2024-02-15"),
    updatedAt: new Date("2024-02-20"),
    tags: ["remote", "work", "opportunities"],
    dimensions: { width: 300, height: 250 },
  },
]

export const bannerStats: BannerStats[] = [
  {
    id: "stats-1",
    bannerId: "banner-1",
    date: new Date("2024-04-01"),
    clicks: 25,
    impressions: 1250,
    ctr: 2.0,
  },
  {
    id: "stats-2",
    bannerId: "banner-2",
    date: new Date("2024-04-01"),
    clicks: 18,
    impressions: 980,
    ctr: 1.84,
  },
  {
    id: "stats-3",
    bannerId: "banner-4",
    date: new Date("2024-04-01"),
    clicks: 15,
    impressions: 780,
    ctr: 1.92,
  },
]

// Helper functions
export function getBannersByPosition(position: string): SponsorshipBanner[] {
  return sponsorshipBanners
    .filter((banner) => banner.position === position && banner.isActive)
    .sort((a, b) => a.displayOrder - b.displayOrder)
}

export function getBannerById(id: string): SponsorshipBanner | undefined {
  return sponsorshipBanners.find((banner) => banner.id === id)
}

export function getActiveBanners(): SponsorshipBanner[] {
  return sponsorshipBanners.filter((banner) => banner.isActive)
}

export function getBannerStats(bannerId: string): BannerStats[] {
  return bannerStats.filter((stat) => stat.bannerId === bannerId)
}

"use client"

import { apiClient } from "./api-client"
import { useEffect, useState } from "react"
import { BannerFormData } from "./form-types"

export interface Banner {
  id: string
  title: string
  description?: string
  imageUrl: string
  targetUrl: string
  position: string
  isActive: boolean
  displayOrder: number
  clickCount: number
  impressionCount: number
  tags: string[]
  startDate?: string
  endDate?: string
}

// Hook for banners data
export function useBanners() {
  const [banners, setBanners] = useState<Banner[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const data = await apiClient.getBanners()
        setBanners(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch banners"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchBanners()
  }, [])

  const toggleBannerStatus = async (bannerId: string) => {
    try {
      const banner = banners.find((b) => b.id === bannerId)
      if (!banner) return

      const updatedBanner = await apiClient.updateBanner(bannerId, {
        title: banner.title,
        image: banner.imageUrl,
        url: banner.targetUrl,
        position: banner.position as "top" | "sidebar" | "bottom" | "inline",
        active: !banner.isActive,
        order: banner.displayOrder,
        startDate: banner.startDate || "",
        endDate: banner.endDate || "",
      })

      setBanners((prev) =>
        prev.map((b) => (b.id === bannerId ? { ...b, isActive: updatedBanner.active } : b))
      )
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to toggle banner status"))
    }
  }

  const deleteBanner = async (bannerId: string) => {
    try {
      setBanners((prev) => prev.filter((b) => b.id !== bannerId))
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to delete banner"))
    }
  }

  return {
    banners,
    isLoading,
    error,
    toggleBannerStatus,
    deleteBanner,
  }
}

// Export mock data for initial state
export const sponsorshipBanners: Banner[] = []

// Hook for companies data
export function useCompaniesData() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await apiClient.getCompanies();
        setCompanies(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch companies"));
      } finally {
        setIsLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  return { companies, isLoading, error };
}    
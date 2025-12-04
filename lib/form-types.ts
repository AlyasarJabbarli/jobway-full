export interface JobFormData {
  title: string
  company: string
  location: string
  type: "full-time" | "part-time" | "contract" | "internship"
  remote: boolean
  salary: {
    min: number
    max: number
    currency: string
  }
  description: string
  requirements: string[]
  benefits: string[]
  tags: string[]
  applicationEmail: string
  applicationUrl?: string
  expiryDate: string | "",
  category: string
  experience: string
  is_premium: boolean
}

export interface CompanyFormData {
  name: string
  logoUrl?: string
  logo?: File
  location?: string
  description?: string
  website?: string
  email?: string
  phone?: string
}

export interface ModeratorFormData {
  name: string
  email: string
  role: "admin" | "moderator"
  isActive: boolean
  password?: string
}

export interface BannerFormData {
  title: string
  image: string
  url: string
  position: "top" | "sidebar" | "bottom" | "inline"
  active: boolean
  order: number
  startDate: string
  endDate: string
}

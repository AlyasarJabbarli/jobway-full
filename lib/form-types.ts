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
  expiryDate: string
}

export interface CompanyFormData {
  name: string
  logo: string
  description: string
  website: string
  email: string
  phone: string
  address: string
  industry: string
  size: string
  benefits: string[]
  socialLinks: {
    linkedin?: string
    twitter?: string
    facebook?: string
  }
}

export interface ModeratorFormData {
  name: string
  email: string
  avatar: string
  role: "admin" | "moderator"
  permissions: string[]
  active: boolean
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

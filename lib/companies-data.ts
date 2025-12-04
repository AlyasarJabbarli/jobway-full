export interface Company {
  id: string;
  name: string;
  industry: string;
  size: string;
  location: string;
  verified: boolean;
  featured: boolean;
  openPositions: number;
  logoUrl?: string;
  description?: string;
}

export const companiesData: Company[] = [
  {
    id: "1",
    name: "TechCorp Solutions",
    industry: "Technology",
    size: "Medium",
    location: "San Francisco",
    verified: true,
    featured: true,
    openPositions: 12,
    logoUrl: "/placeholder-logo.png",
    description: "Leading technology solutions provider"
  },
  {
    id: "2",
    name: "FinanceHub Inc",
    industry: "Finance",
    size: "Large",
    location: "New York",
    verified: true,
    featured: false,
    openPositions: 8,
    logoUrl: "/placeholder-logo.png",
    description: "Innovative financial services company"
  },
  {
    id: "3",
    name: "HealthTech Startup",
    industry: "Healthcare",
    size: "Startup",
    location: "Boston",
    verified: false,
    featured: true,
    openPositions: 5,
    logoUrl: "/placeholder-logo.png",
    description: "Revolutionary healthcare technology"
  },
  {
    id: "4",
    name: "E-Commerce Pro",
    industry: "E-commerce",
    size: "Small",
    location: "Seattle",
    verified: true,
    featured: false,
    openPositions: 15,
    logoUrl: "/placeholder-logo.png",
    description: "Online retail solutions"
  },
  {
    id: "5",
    name: "Consulting Experts",
    industry: "Consulting",
    size: "Enterprise",
    location: "London",
    verified: true,
    featured: true,
    openPositions: 20,
    logoUrl: "/placeholder-logo.png",
    description: "Global consulting services"
  }
]; 
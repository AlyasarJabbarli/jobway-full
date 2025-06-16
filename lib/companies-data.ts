export interface Company {
  id: string
  name: string
  logo: string
  description: string
  detailedDescription: string
  industry: string
  size: string
  founded: string
  location: string
  website: string
  email: string
  phone: string
  socialMedia: {
    linkedin?: string
    twitter?: string
    facebook?: string
  }
  benefits: string[]
  culture: string[]
  techStack?: string[]
  jobCount: number
}

export const companiesData: Company[] = [
  {
    id: "techcorp-inc",
    name: "TechCorp Inc.",
    logo: "/placeholder.svg?height=80&width=80",
    description: "Leading technology company specializing in web applications and cloud solutions.",
    detailedDescription:
      "TechCorp Inc. is a pioneering technology company founded in 2015, dedicated to creating innovative web applications and cloud-based solutions. We serve clients ranging from startups to Fortune 500 companies, helping them transform their digital presence and streamline their operations. Our team of expert developers, designers, and engineers work collaboratively to deliver cutting-edge solutions that drive business growth and success.",
    industry: "Technology",
    size: "500-1000 employees",
    founded: "2015",
    location: "San Francisco, CA",
    website: "https://techcorp.example.com",
    email: "careers@techcorp.com",
    phone: "+1 (555) 123-4567",
    socialMedia: {
      linkedin: "https://linkedin.com/company/techcorp",
      twitter: "https://twitter.com/techcorp",
    },
    benefits: [
      "Comprehensive health insurance",
      "401(k) with company matching",
      "Flexible work arrangements",
      "Professional development budget",
      "Unlimited PTO",
      "Stock options",
      "Free meals and snacks",
      "Gym membership",
    ],
    culture: [
      "Innovation-driven environment",
      "Collaborative team culture",
      "Work-life balance focus",
      "Continuous learning opportunities",
      "Diversity and inclusion commitment",
    ],
    techStack: ["React", "Next.js", "Node.js", "TypeScript", "AWS", "Docker"],
    jobCount: 3,
  },
  {
    id: "startupxyz",
    name: "StartupXYZ",
    logo: "/placeholder.svg?height=80&width=80",
    description: "Fast-growing startup revolutionizing the B2B SaaS space with innovative solutions.",
    detailedDescription:
      "StartupXYZ is an ambitious and rapidly growing startup that's making waves in the B2B SaaS industry. Founded by experienced entrepreneurs, we're building the next generation of business tools that help companies streamline their operations and boost productivity. Our agile team thrives in a dynamic environment where every team member has the opportunity to make a significant impact on our product and company direction.",
    industry: "Technology",
    size: "50-100 employees",
    founded: "2020",
    location: "Remote",
    website: "https://startupxyz.example.com",
    email: "jobs@startupxyz.com",
    phone: "+1 (555) 234-5678",
    socialMedia: {
      linkedin: "https://linkedin.com/company/startupxyz",
      twitter: "https://twitter.com/startupxyz",
    },
    benefits: [
      "Equity participation",
      "Health and dental insurance",
      "Remote work flexibility",
      "Learning and development stipend",
      "Home office setup budget",
      "Flexible vacation policy",
    ],
    culture: [
      "Startup mentality",
      "Fast-paced environment",
      "High ownership and autonomy",
      "Results-oriented culture",
      "Innovation and experimentation",
    ],
    techStack: ["Vue.js", "Python", "PostgreSQL", "Redis", "GCP"],
    jobCount: 1,
  },
  {
    id: "designstudio",
    name: "DesignStudio",
    logo: "/placeholder.svg?height=80&width=80",
    description: "Creative design agency focused on digital experiences and brand identity.",
    detailedDescription:
      "DesignStudio is a premier creative agency that specializes in crafting exceptional digital experiences and memorable brand identities. Our multidisciplinary team of designers, strategists, and creative technologists work with clients across various industries to create impactful design solutions. We believe in the power of good design to transform businesses and create meaningful connections between brands and their audiences.",
    industry: "Design & Creative",
    size: "25-50 employees",
    founded: "2018",
    location: "New York, NY",
    website: "https://designstudio.example.com",
    email: "hello@designstudio.com",
    phone: "+1 (555) 345-6789",
    socialMedia: {
      linkedin: "https://linkedin.com/company/designstudio",
      twitter: "https://twitter.com/designstudio",
      facebook: "https://facebook.com/designstudio",
    },
    benefits: [
      "Creative freedom",
      "Health insurance",
      "Flexible working hours",
      "Professional development opportunities",
      "Modern office space",
      "Team retreats",
    ],
    culture: [
      "Creative collaboration",
      "Design-thinking approach",
      "Client-focused mindset",
      "Continuous inspiration",
      "Work-life integration",
    ],
    techStack: ["Figma", "Adobe Creative Suite", "Webflow", "Framer"],
    jobCount: 1,
  },
  {
    id: "dataflow-systems",
    name: "DataFlow Systems",
    logo: "/placeholder.svg?height=80&width=80",
    description: "Data engineering company building scalable backend systems and analytics platforms.",
    detailedDescription:
      "DataFlow Systems is a specialized data engineering company that builds robust, scalable backend systems and advanced analytics platforms. We help organizations harness the power of their data through innovative solutions that enable real-time processing, intelligent analytics, and actionable insights. Our team of experienced engineers and data scientists work with cutting-edge technologies to solve complex data challenges.",
    industry: "Technology",
    size: "100-250 employees",
    founded: "2017",
    location: "Berlin, Germany",
    website: "https://dataflow.example.com",
    email: "careers@dataflow.com",
    phone: "+49 30 12345678",
    socialMedia: {
      linkedin: "https://linkedin.com/company/dataflow-systems",
    },
    benefits: [
      "Competitive salary",
      "Health insurance",
      "Relocation assistance",
      "Professional development",
      "Flexible work arrangements",
      "Conference attendance",
    ],
    culture: [
      "Data-driven decisions",
      "Technical excellence",
      "International team",
      "Open communication",
      "Innovation focus",
    ],
    techStack: ["Python", "Apache Kafka", "Kubernetes", "PostgreSQL", "Apache Spark"],
    jobCount: 1,
  },
  {
    id: "salesforce-pro",
    name: "SalesForce Pro",
    logo: "/placeholder.svg?height=80&width=80",
    description: "Sales enablement platform helping businesses optimize their sales processes.",
    detailedDescription:
      "SalesForce Pro is a leading sales enablement platform that empowers businesses to optimize their sales processes and drive revenue growth. Our comprehensive suite of tools includes CRM integration, sales analytics, lead management, and performance tracking. We serve companies of all sizes, from small businesses to enterprise organizations, helping them streamline their sales operations and achieve better results.",
    industry: "Sales & Marketing",
    size: "200-500 employees",
    founded: "2016",
    location: "London, UK",
    website: "https://salesforcepro.example.com",
    email: "careers@salesforcepro.com",
    phone: "+44 20 7123 4567",
    socialMedia: {
      linkedin: "https://linkedin.com/company/salesforce-pro",
      twitter: "https://twitter.com/salesforcepro",
    },
    benefits: [
      "Competitive base salary",
      "Commission structure",
      "Health and wellness programs",
      "Professional development",
      "Flexible working",
      "Team incentives",
    ],
    culture: [
      "Sales-driven culture",
      "Goal-oriented environment",
      "Team collaboration",
      "Customer success focus",
      "Performance recognition",
    ],
    jobCount: 1,
  },
  {
    id: "people-first",
    name: "People First",
    logo: "/placeholder.svg?height=80&width=80",
    description: "HR consulting firm specializing in talent acquisition and employee development.",
    detailedDescription:
      "People First is a premier HR consulting firm that specializes in talent acquisition, employee development, and organizational transformation. We partner with companies to build strong, engaged teams and create positive workplace cultures. Our comprehensive services include recruitment, training, performance management, and HR strategy development, helping organizations attract, develop, and retain top talent.",
    industry: "Human Resources",
    size: "50-100 employees",
    founded: "2019",
    location: "Remote",
    website: "https://peoplefirst.example.com",
    email: "info@peoplefirst.com",
    phone: "+1 (555) 456-7890",
    socialMedia: {
      linkedin: "https://linkedin.com/company/people-first",
    },
    benefits: [
      "Remote work flexibility",
      "Health insurance",
      "Professional certifications",
      "Flexible schedule",
      "Learning opportunities",
      "Wellness programs",
    ],
    culture: [
      "People-centric approach",
      "Empathy and understanding",
      "Professional growth",
      "Work-life balance",
      "Inclusive environment",
    ],
    jobCount: 1,
  },
  {
    id: "cloudtech-solutions",
    name: "CloudTech Solutions",
    logo: "/placeholder.svg?height=80&width=80",
    description: "Cloud infrastructure company providing DevOps and cloud migration services.",
    detailedDescription:
      "CloudTech Solutions is a leading cloud infrastructure company that specializes in DevOps practices, cloud migration, and infrastructure automation. We help organizations transition to the cloud seamlessly while optimizing their operations for scalability, security, and cost-effectiveness. Our team of certified cloud architects and DevOps engineers work with major cloud platforms to deliver robust, reliable solutions.",
    industry: "Technology",
    size: "150-300 employees",
    founded: "2014",
    location: "San Francisco, CA",
    website: "https://cloudtech.example.com",
    email: "careers@cloudtech.com",
    phone: "+1 (555) 567-8901",
    socialMedia: {
      linkedin: "https://linkedin.com/company/cloudtech-solutions",
      twitter: "https://twitter.com/cloudtech",
    },
    benefits: [
      "Competitive salary",
      "Stock options",
      "Health insurance",
      "Cloud certifications",
      "Conference attendance",
      "Flexible work",
    ],
    culture: [
      "Technical innovation",
      "Cloud-first mindset",
      "Continuous learning",
      "Collaboration",
      "Problem-solving focus",
    ],
    techStack: ["AWS", "Kubernetes", "Terraform", "Docker", "Jenkins"],
    jobCount: 1,
  },
  {
    id: "analytics-pro",
    name: "Analytics Pro",
    logo: "/placeholder.svg?height=80&width=80",
    description: "Data analytics company providing insights and predictive modeling solutions.",
    detailedDescription:
      "Analytics Pro is a cutting-edge data analytics company that transforms raw data into actionable business insights. We specialize in predictive modeling, machine learning, and advanced analytics solutions that help organizations make data-driven decisions. Our team of data scientists and analysts work with clients across various industries to unlock the value hidden in their data and drive strategic growth.",
    industry: "Data & Analytics",
    size: "75-150 employees",
    founded: "2018",
    location: "Boston, MA",
    website: "https://analyticspro.example.com",
    email: "careers@analyticspro.com",
    phone: "+1 (555) 678-9012",
    socialMedia: {
      linkedin: "https://linkedin.com/company/analytics-pro",
    },
    benefits: [
      "Competitive compensation",
      "Health benefits",
      "Research time",
      "Conference participation",
      "Learning budget",
      "Flexible schedule",
    ],
    culture: [
      "Data-driven culture",
      "Research and innovation",
      "Analytical thinking",
      "Collaborative problem-solving",
      "Continuous learning",
    ],
    techStack: ["Python", "R", "TensorFlow", "Apache Spark", "Tableau"],
    jobCount: 1,
  },
]

// Helper function to get company by ID
export function getCompanyById(id: string): Company | undefined {
  return companiesData.find((company) => company.id === id)
}

// Helper function to get companies by industry
export function getCompaniesByIndustry(industry: string): Company[] {
  return companiesData.filter((company) => company.industry === industry)
}

// Helper function to get all industries
export function getAllIndustries(): string[] {
  return [...new Set(companiesData.map((company) => company.industry))]
}

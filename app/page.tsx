import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { ResponsiveBannerContainer } from "@/components/responsive-banner-container"
import { ContentAwareLayout } from "@/components/content-aware-layout"
import { Footer } from "@/components/footer"
import { ArrowRight, Star, Users, Zap } from "lucide-react"

const featuredJobs = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco",
    description: "Join our team to build cutting-edge web applications using React and Next.js.",
    type: "Premium" as const,
    category: "Engineering",
  },
  {
    id: "2",
    title: "Product Marketing Manager",
    company: "StartupXYZ",
    location: "Remote",
    description: "Lead our product marketing efforts and drive growth through strategic campaigns.",
    type: "Premium" as const,
    category: "Marketing",
  },
  {
    id: "3",
    title: "UX/UI Designer",
    company: "DesignStudio",
    location: "New York",
    description: "Create beautiful and intuitive user experiences for our digital products.",
    type: "Premium" as const,
    category: "Design",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Banner System */}
      <ResponsiveBannerContainer />

      {/* Hero Section */}

      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Find Your Dream Job Today</h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Connect with top employers and discover opportunities that match your skills and ambitions. Your next career
            move starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-white text-blue-600 hover:bg-gray-100">
              <a href="mailto:jobs@example.com">
                Post a Job
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button size="lg" asChild className="bg-white text-blue-600 hover:bg-gray-100">
              <a href="https://forms.google.com/your-form-id" target="_blank" rel="noopener noreferrer">
                Send Your CV
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <ContentAwareLayout>
        {/* Featured Jobs Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Featured Premium Jobs</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover hand-picked opportunities from top companies looking for exceptional talent.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {featuredJobs.map((job) => (
                <Card key={job.id} className="border-yellow-400 bg-yellow-50/30 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{job.title}</CardTitle>
                        <p className="text-gray-600 text-sm">
                          {job.company} • {job.location}
                        </p>
                      </div>
                      <Badge className="bg-yellow-500 hover:bg-yellow-600">
                        <Star className="h-3 w-3 mr-1" />
                        Premium
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-3">{job.description}</p>
                    <Badge variant="outline" className="text-xs">
                      {job.category}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button asChild size="lg">
                <Link href="/jobs">
                  View All Jobs
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Company Description Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">About JobPortal</h2>
              <p className="text-base md:text-lg text-gray-600 mb-8">
                We're the leading job platform connecting talented professionals with innovative companies. Our mission
                is to make job searching and hiring more efficient, transparent, and successful for everyone involved.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">10,000+ Companies</h3>
                  <p className="text-gray-600">Trusted by leading organizations worldwide</p>
                </div>

                <div className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">Fast Matching</h3>
                  <p className="text-gray-600">AI-powered job matching for better results</p>
                </div>

                <div className="text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">Premium Service</h3>
                  <p className="text-gray-600">Enhanced visibility for premium job listings</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ContentAwareLayout>

      <Footer />
    </div>
  )
}

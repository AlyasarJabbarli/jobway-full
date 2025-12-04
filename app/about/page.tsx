import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"
import { Mail, Phone, MapPin, Users, Target, Award, Heart } from "lucide-react"
import { ResponsiveBannerContainer } from "@/components/responsive-banner-container"
import { ContentAwareLayout } from "@/components/content-aware-layout"

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    description: "Former HR executive with 15+ years in talent acquisition and recruitment strategy.",
  },
  {
    name: "Michael Chen",
    role: "CTO",
    description: "Tech leader with expertise in building scalable platforms and AI-powered matching systems.",
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Operations",
    description: "Operations specialist focused on optimizing user experience and platform efficiency.",
  },
  {
    name: "David Kim",
    role: "Head of Sales",
    description: "Business development expert helping companies find the right talent solutions.",
  },
]

const values = [
  {
    icon: Users,
    title: "People First",
    description:
      "We believe that great companies are built by great people. Our platform puts human connections at the center of everything we do.",
  },
  {
    icon: Target,
    title: "Precision Matching",
    description:
      "Using advanced algorithms and human insight, we ensure the right candidates find the right opportunities.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "We maintain the highest standards in our service delivery and continuously innovate to exceed expectations.",
  },
  {
    icon: Heart,
    title: "Integrity",
    description: "Transparency, honesty, and ethical practices guide every interaction and decision we make.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Banner System */}
      <ResponsiveBannerContainer />

      <ContentAwareLayout>
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">About JobPortal</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're on a mission to transform how people find jobs and how companies discover talent. Since our
              founding, we've connected thousands of professionals with their dream careers.
            </p>
          </div>

          {/* Company Story */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2020, JobPortal emerged from a simple observation: the job search process was broken for
                  both candidates and employers. Traditional job boards were cluttered, impersonal, and inefficient.
                </p>
                <p>
                  We set out to create a platform that would change this narrative. By focusing on quality over
                  quantity, personalized matching, and genuine human connections, we've built a community where careers
                  flourish and businesses thrive.
                </p>
                <p>
                  Today, we're proud to serve over 10,000 companies and have facilitated countless successful job
                  placements across various industries and career levels.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm border">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Impact</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
                  <div className="text-gray-600">Companies</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">50K+</div>
                  <div className="text-gray-600">Job Seekers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">25K+</div>
                  <div className="text-gray-600">Successful Hires</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">95%</div>
                  <div className="text-gray-600">Satisfaction Rate</div>
                </div>
              </div>
            </div>
          </div>

          {/* Mission & Values */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission & Values</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We're guided by core principles that shape how we serve our community and build our platform.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3">{value.title}</h3>
                    <p className="text-gray-600 text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our diverse team brings together expertise from technology, human resources, and business development.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="bg-gray-200 w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="h-10 w-10 text-gray-500" />
                    </div>
                    <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-sm border p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
              <p className="text-gray-600">
                Have questions or want to learn more about our services? We'd love to hear from you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Email Us</h3>
                <p className="text-gray-600">hello@jobportal.com</p>
                <p className="text-gray-600">jobs@jobportal.com</p>
              </div>

              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Call Us</h3>
                <p className="text-gray-600">+1 (555) 123-4567</p>
                <p className="text-gray-600">Mon-Fri, 9AM-6PM EST</p>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
                <p className="text-gray-600">123 Business Ave</p>
                <p className="text-gray-600">San Francisco, CA 94105</p>
              </div>
            </div>

            <div className="text-center">
              <Button size="lg" asChild>
                <a href="mailto:hello@jobportal.com">Contact Us Today</a>
              </Button>
            </div>
          </div>
        </div>
      </ContentAwareLayout>

      <Footer />
    </div>
  )
}

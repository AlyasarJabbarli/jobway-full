import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Footer } from "@/components/footer"
import { Check, Star, Zap, ArrowRight } from "lucide-react"
import { ResponsiveBannerContainer } from "@/components/responsive-banner-container"
import { ContentAwareLayout } from "@/components/content-aware-layout"

const pricingPlans = [
  {
    name: "Simple Job Post",
    price: "$99",
    duration: "30 days",
    description: "Perfect for standard job postings",
    features: [
      "30-day job listing",
      "Standard visibility",
      "Basic job description",
      "Email notifications",
      "Candidate filtering",
      "Mobile-friendly posting",
    ],
    popular: false,
    color: "border-gray-200",
  },
  {
    name: "Premium Job Post",
    price: "$299",
    duration: "60 days",
    description: "Maximum visibility and advanced features",
    features: [
      "60-day job listing",
      "Premium placement",
      "Featured in homepage",
      "Enhanced job description",
      "Priority email notifications",
      "Advanced candidate filtering",
      "Social media promotion",
      "Dedicated account support",
      "Analytics dashboard",
    ],
    popular: true,
    color: "border-yellow-400 bg-yellow-50/30",
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Banner System */}
      <ResponsiveBannerContainer />

      <ContentAwareLayout>
        <div className="container mx-auto px-4 py-12">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Services & Pricing</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the perfect plan to showcase your job opportunities and attract the best talent. All plans include
              our core features with premium options for enhanced visibility.
            </p>
          </div>

          {/* Pricing Plans */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.color} hover:shadow-lg transition-shadow`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-yellow-500 hover:bg-yellow-600 px-4 py-1">
                      <Star className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold mb-2">{plan.name}</CardTitle>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-blue-600">{plan.price}</span>
                    <span className="text-gray-600 ml-2">/ {plan.duration}</span>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    className={`w-full ${plan.popular ? "bg-yellow-500 hover:bg-yellow-600" : ""}`}
                    size="lg"
                  >
                    <a href="mailto:jobs@example.com?subject=Job Posting Inquiry">
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Features Comparison */}
          <div className="bg-white rounded-lg shadow-sm border p-8 mb-16">
            <h2 className="text-2xl font-bold text-center mb-8">Feature Comparison</h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 px-4">Features</th>
                    <th className="text-center py-4 px-4">Simple Post</th>
                    <th className="text-center py-4 px-4">Premium Post</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-4 px-4 font-medium">Listing Duration</td>
                    <td className="py-4 px-4 text-center">30 days</td>
                    <td className="py-4 px-4 text-center">60 days</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-medium">Homepage Featured</td>
                    <td className="py-4 px-4 text-center">❌</td>
                    <td className="py-4 px-4 text-center">✅</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-medium">Priority Placement</td>
                    <td className="py-4 px-4 text-center">❌</td>
                    <td className="py-4 px-4 text-center">✅</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-medium">Social Media Promotion</td>
                    <td className="py-4 px-4 text-center">❌</td>
                    <td className="py-4 px-4 text-center">✅</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-medium">Analytics Dashboard</td>
                    <td className="py-4 px-4 text-center">❌</td>
                    <td className="py-4 px-4 text-center">✅</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-medium">Dedicated Support</td>
                    <td className="py-4 px-4 text-center">❌</td>
                    <td className="py-4 px-4 text-center">✅</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Post Your Job?</h2>
            <p className="text-xl mb-8 opacity-90">
              Get started today and connect with qualified candidates in your industry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-white text-blue-600 hover:bg-gray-100">
                <a href="mailto:jobs@example.com?subject=Job Posting Inquiry">
                  <Zap className="mr-2 h-5 w-5" />
                  Post a Job Now
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                <a href="mailto:jobs@example.com?subject=General Inquiry">Contact Sales</a>
              </Button>
            </div>
          </div>
        </div>
      </ContentAwareLayout>

      <Footer />
    </div>
  )
}

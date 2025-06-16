import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { FileX, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileX className="h-12 w-12 text-gray-400" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h1>
          <p className="text-gray-600 mb-8">The job you're looking for doesn't exist or may have been removed.</p>

          <div className="space-y-4">
            <Button asChild className="w-full">
              <Link href="/jobs">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Browse All Jobs
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/">Go to Homepage</Link>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

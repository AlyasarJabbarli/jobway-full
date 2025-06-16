import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Building2, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CompanyNotFound() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/companies">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Companies
            </Link>
          </Button>
        </div>

        <Card>
          <CardContent className="text-center py-12">
            <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Company Not Found</h2>
            <p className="text-gray-600 mb-6">The company you're looking for doesn't exist or may have been removed.</p>
            <div className="flex gap-4 justify-center">
              <Button asChild>
                <Link href="/admin/companies">View All Companies</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/admin/companies/new">Create New Company</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

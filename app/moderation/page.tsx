import { ModerationLayout } from "@/components/moderation/moderation-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getCurrentModerator, getModerationStats, getModeratorJobs, getModeratorCompanies } from "@/lib/moderation-data";
import { Activity, Plus, ArrowRight, Briefcase, Building2 } from "lucide-react";
import Link from "next/link";
import RecentActivityCard from "./RecentActivityCard";

export default async function ModerationPage() {
  // Fetch all data server-side for a dynamic, up-to-date dashboard
  const moderator = await getCurrentModerator();
  const stats = await getModerationStats();
  const jobs = await getModeratorJobs();
  const companies = await getModeratorCompanies();

  // Fetch recent activity client-side for real CRUD actions
  // (If you want this server-side, you can use fetch in a server component)
  // We'll use a client-side fetch here for demonstration
  // You can move this to server-side if you prefer
  // ---
  // const recentActivity = await fetchRecentActivity();
  // ---

  // Ensure moderator.name is always a string and isActive is present
  const safeModerator = {
    ...moderator,
    name: moderator.name ?? 'Moderator',
    isActive: typeof moderator.isActive === 'boolean' ? moderator.isActive : true,
  };

  // Client-side fetch for recent activity
  // (If you want this server-side, move to getServerSideProps or similar)
  // ---
  // const [recentActivity, setRecentActivity] = useState([])
  // useEffect(() => { ... }, [])
  // ---

  return (
    <ModerationLayout moderator={safeModerator} stats={stats}>
      <div className="space-y-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Moderation Dashboard</h1>
            <p className="text-gray-600">Welcome back, {safeModerator.name}</p>
          </div>
          <div className="flex gap-2">
            <Button asChild className="bg-orange-600 hover:bg-orange-700">
              <Link href="/moderation/jobs/new">
                <Plus className="h-4 w-4 mr-2" />
                New Job
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/moderation/companies/new">
                <Plus className="h-4 w-4 mr-2" />
                New Company
              </Link>
            </Button>
          </div>
        </div>

        {/* Jobs Managed */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-gray-700 font-semibold flex items-center gap-2">
              <Briefcase className="h-5 w-5" /> Jobs Managed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <input type="text" placeholder="Search jobs..." className="w-full border rounded px-3 py-2 mb-2" />
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-2">Title</th>
                    <th className="text-left py-2 px-2">Company</th>
                    <th className="text-left py-2 px-2">Location</th>
                    <th className="text-left py-2 px-2">Type</th>
                    <th className="text-left py-2 px-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job: any) => (
                    <tr key={job.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-2 font-medium">{job.title}</td>
                      <td className="py-2 px-2">{job.company}</td>
                      <td className="py-2 px-2">{job.location}</td>
                      <td className="py-2 px-2">{job.type}</td>
                      <td className="py-2 px-2 flex gap-2">
                        <Button asChild size="sm" variant="outline">
                          <Link href={`/moderation/jobs/${job.id}/edit`}>Edit</Link>
                        </Button>
                        <Button size="sm" variant="destructive">Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Companies Managed */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-gray-700 font-semibold flex items-center gap-2">
              <Building2 className="h-5 w-5" /> Companies Managed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <input type="text" placeholder="Search companies..." className="w-full border rounded px-3 py-2 mb-2" />
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-2">Name</th>
                    <th className="text-left py-2 px-2">Created</th>
                    <th className="text-left py-2 px-2">Location</th>
                    <th className="text-left py-2 px-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {companies.map((company) => (
                    <tr key={company.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-2 font-medium">{company.name}</td>
                      <td className="py-2 px-2">{new Date(company.createdAt).toLocaleDateString()}</td>
                      <td className="py-2 px-2">{company.location}</td>
                      <td className="py-2 px-2 flex gap-2">
                        <Button asChild size="sm" variant="outline">
                          <Link href={`/moderation/companies/${company.id}/edit`}>Edit</Link>
                        </Button>
                        <Button size="sm" variant="destructive">Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity (CRUD actions) */}
        <RecentActivityCard />

        {/* Quick Actions */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-gray-700 font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col bg-white text-gray-800 font-semibold border-gray-300 hover:bg-gray-100" asChild>
                <Link href="/moderation/jobs/new">
                  <Briefcase className="h-6 w-6 mb-2" />
                  Create Job
                </Link>
              </Button>
              <Button variant="outline" className="h-20 flex-col bg-white text-gray-800 font-semibold border-gray-300 hover:bg-gray-100" asChild>
                <Link href="/moderation/companies/new">
                  <Building2 className="h-6 w-6 mb-2" />
                  Add Company
                </Link>
              </Button>
              <Button variant="outline" className="h-20 flex-col bg-white text-gray-800 font-semibold border-gray-300 hover:bg-gray-100" asChild>
                <Link href="/moderation/activity">
                  <Activity className="h-6 w-6 mb-2" />
                  View Activity
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ModerationLayout>
  )
}

// ... RecentActivityCard will be moved to a separate file ...

import JobsTable from "@/components/JobsTable";
import { getModeratorJobs, getCurrentModerator, getModerationStats } from "@/lib/moderation-data";
import { ModerationLayout } from "@/components/moderation/moderation-layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function ModerationJobsPage() {
  const jobs = await getModeratorJobs();
  const moderator = await getCurrentModerator();
  const stats = await getModerationStats();
  const safeModerator = {
    ...moderator,
    name: moderator.name ?? 'Moderator',
    isActive: typeof moderator.isActive === 'boolean' ? moderator.isActive : true,
  };

  return (
    <ModerationLayout moderator={safeModerator} stats={stats}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Job Management</h1>
            <p className="text-gray-600">Create, edit, and moderate job postings</p>
          </div>
          <Button asChild className="bg-orange-600 hover:bg-orange-700">
            <Link href="/moderation/jobs/new">
              <Plus className="h-4 w-4 mr-2" />
              Create Job
            </Link>
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Jobs Managed</CardTitle>
          </CardHeader>
          <CardContent>
            <JobsTable jobs={jobs.map(j => ({ ...j, createdAt: j.createdAt.toString() }))} />
          </CardContent>
        </Card>
      </div>
    </ModerationLayout>
  );
}

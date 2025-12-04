"use client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Activity, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RecentActivityCard() {
  const [activity, setActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchActivity() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/activity");
        if (!res.ok) throw new Error("Failed to fetch activity");
        const data = await res.json();
        setActivity(data);
      } catch (e: any) {
        setError(e.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchActivity();
  }, []);

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-700 font-semibold">
          <Activity className="h-5 w-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading && <div className="py-4 text-center">Loading...</div>}
        {error && <div className="py-4 text-center text-red-600">{error}</div>}
        {!loading && !error && (
          <div className="space-y-4">
            {activity.map((a) => (
              <div key={a.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <Activity className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-800">{a.itemName}</p>
                    <p className="text-sm text-gray-600">{a.action} {a.itemType} by {a.userName}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                    {a.action}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(a.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
        <Button variant="outline" className="w-full mt-4 text-gray-800 font-semibold border-gray-300" asChild>
          <Link href="/moderation/activity">
            View All Activity
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
} 
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  createdAt: string;
}

export default function JobsTable({ jobs: initialJobs }: { jobs: Job[] }) {
  const [jobs, setJobs] = useState(initialJobs);
  const [search, setSearch] = useState("");

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.company.toLowerCase().includes(search.toLowerCase()) ||
    job.location.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
    if (res.ok) {
      setJobs(prev => prev.filter(j => j.id !== id));
    } else {
      alert("Failed to delete job.");
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow bg-white mt-4">
      <div className="p-4">
        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4"
        />
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Title</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Company</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Location</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Type</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {filteredJobs.map(job => (
            <tr key={job.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 font-medium text-gray-900">{job.title}</td>
              <td className="px-4 py-2 text-gray-700">{job.company}</td>
              <td className="px-4 py-2 text-gray-700">{job.location}</td>
              <td className="px-4 py-2 text-gray-700">{job.type}</td>
              <td className="px-4 py-2 flex gap-2">
                <Button asChild size="sm" variant="outline">
                  <Link href={`/moderation/jobs/${job.id}/edit`}>Edit</Link>
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(job.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {filteredJobs.length === 0 && (
        <div className="p-6 text-center text-gray-500">No jobs found.</div>
      )}
    </div>
  );
} 
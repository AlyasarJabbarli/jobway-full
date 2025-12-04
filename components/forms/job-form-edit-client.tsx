"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { JobForm } from "@/components/forms/job-form";

export default function JobFormEditClient({ initialData, jobId }: { initialData: any, jobId: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleJobUpdate = async (data: any) => {
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/jobs/${jobId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update job");
      alert("Job updated successfully!");
      router.push("/moderation/jobs");
    } catch (err) {
      alert("Error updating job: " + (err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return <JobForm initialData={initialData} onSubmit={handleJobUpdate} isSubmitting={isSubmitting} />;
} 
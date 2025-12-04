import { apiClient } from './api-client';

export interface Job {
  id: string
  title: string
  company: string
  location: string
  category: string
  type: "Simple" | "Premium"
  is_premium: boolean
  salary: {
    min: number
    max: number
  }
  experience: string
  industry?: string
  /**
   * Date the job was created (or published). Stored as a Date object so we can easily
   * perform calculations such as "posted in the last 7 days" in the filters.
   */
  datePosted: Date
  description: string
  requirements?: string[]
  benefits?: string[]
  companyLogo?: string
  /**
   * Optional company id (useful when we need to deep-link to the company page).
   */
  companyId?: string
  /**
   * Employment type (e.g., "Full-time", "Part-time", etc.)
   */
  employmentType?: string
  /**
   * Team size (e.g., "10-50 employees")
   */
  teamSize?: string
  /**
   * Key responsibilities for the role
   */
  responsibilities?: string[]
}

// Function to fetch jobs from the API
export async function fetchJobs(): Promise<Job[]> {
  try {
    const rawJobs = await apiClient.getJobs();

    // Convert raw API response into the shape expected by the front-end
    return rawJobs.map((job: any) => {
      // Some API fields are returned in snake_case or with different naming
      // conventions. We normalise them here so the UI can stay consistent.

      const companyName = typeof job.company === "string" ? job.company : job.company?.name ?? "Unknown Company";

      return {
        id: job.id,
        title: job.title,
        company: companyName,
        companyId: typeof job.company === "object" ? job.company.id : undefined,
        location: job.location,
        category: job.category,
        // Older data might already have a "type" field, otherwise derive from is_premium
        type: job.type ?? (job.is_premium ? "Premium" : "Simple"),
        is_premium: job.is_premium || false,
        salary: {
          min: job.salary?.min ?? job.salary_min,
          max: job.salary?.max ?? job.salary_max,
        },
        experience: job.experience,
        industry: job.industry ?? "",
        // Use createdAt when datePosted is missing
        datePosted: new Date(job.datePosted ?? job.createdAt),
        description: job.description,
        requirements: Array.isArray(job.requirements)
          ? job.requirements
          : job.requirements
            ? JSON.parse(job.requirements as string)
            : [],
        benefits: Array.isArray(job.benefits)
          ? job.benefits
          : job.benefits
            ? JSON.parse(job.benefits as string)
            : [],
        companyLogo: job.company?.logoUrl ?? undefined,
        employmentType: job.employmentType,
        teamSize: job.teamSize,
        responsibilities: Array.isArray(job.responsibilities)
          ? job.responsibilities
          : job.responsibilities
            ? JSON.parse(job.responsibilities as string)
            : [],
      } satisfies Job;
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
}

// For backward compatibility and initial state
export const allJobs: Job[] = []; 
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'JobWay – Find Your Next Opportunity',
  description: 'JobWay connects job seekers with top employers. Browse thousands of jobs by category, location, and type. Apply easily and land your dream job.',
  keywords: 'jobs, job search, employment, careers, hiring, job board, work, JobWay, full-time, part-time, remote',
  author: 'Alyasar Jabbarli',
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

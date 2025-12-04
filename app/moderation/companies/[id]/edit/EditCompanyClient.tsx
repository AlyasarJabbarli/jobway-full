"use client"

import React, { useState } from "react"
import { CompanyForm } from "@/components/forms/company-form"
import type { CompanyFormData } from "@/lib/form-types"
import { useRouter } from "next/navigation"

interface Props {
  initialData: any
  id: string
}

export default function EditCompanyClient({ initialData, id }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (data: CompanyFormData) => {
    setIsSubmitting(true)
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'logo' && value) {
          formData.append('logo', value as File);
        } else if (value !== undefined && value !== null) {
          // ensure strings for non-file fields
          formData.append(key, String(value));
        }
      });

      const response = await fetch(`/api/companies/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        let msg = 'Failed to update company'
        try {
          const json = await response.json()
          msg = json?.error || msg
        } catch {}
        throw new Error(msg)
      }

      alert("Company updated successfully!")
      router.push("/moderation/companies")
    } catch (err) {
      console.error(err)
      alert("Failed to update company")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <CompanyForm
      initialData={initialData}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    />
  )
}

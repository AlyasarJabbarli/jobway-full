"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, X, Plus, Building2, Globe, Mail, Phone, MapPin } from "lucide-react"
import type { CompanyFormData as BaseCompanyFormData } from "@/lib/form-types"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { BaseForm } from "./base-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const companyFormSchema = z.object({
  name: z.string().min(1, "Company name is required"),
  location: z.string().optional(),
  description: z.string().optional(),
  website: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  // logo will be handled separately as a File
})

type CompanyFormValues = z.infer<typeof companyFormSchema>

interface CompanyFormProps {
  initialData?: Partial<CompanyFormData>
  onSubmit: (data: CompanyFormData) => void
  isSubmitting?: boolean
}

type CompanyFormData = BaseCompanyFormData & { logo?: File }

export function CompanyForm({ initialData, onSubmit, isSubmitting }: CompanyFormProps) {
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string>(initialData?.logoUrl || "")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      name: initialData?.name || "",
      location: initialData?.location || "",
      description: initialData?.description || "",
      website: initialData?.website || "",
      email: initialData?.email || "",
      phone: initialData?.phone || "",
    },
  })

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setLogoFile(file)
      setLogoPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = (data: CompanyFormValues) => {
    // Pass the logo file along with the form data
    onSubmit({ ...data, logo: logoFile } as any)
  }

  return (
    <BaseForm
      title="Company Details"
      onSubmit={form.handleSubmit(handleSubmit)}
      isSubmitting={isSubmitting}
    >
      <Form {...form}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Logo upload */}
        <div className="mb-4">
          <FormLabel>Company Logo</FormLabel>
          <div className="flex items-center gap-4 mt-2">
            {logoPreview ? (
              <img src={logoPreview} alt="Logo preview" className="w-20 h-20 object-contain border rounded" />
            ) : (
              <div className="w-20 h-20 flex items-center justify-center border rounded bg-gray-50 text-gray-400">
                No logo
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleLogoChange}
            />
            <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
              {logoPreview ? "Change Logo" : "Upload Logo"}
            </Button>
            {(logoFile || logoPreview) && (
              <Button 
                type="button" 
                variant="destructive" 
                onClick={() => { 
                  setLogoFile(null); 
                  setLogoPreview("") 
                }}
              >
                Remove
              </Button>
            )}
          </div>
        </div>

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
    </BaseForm>
  )
}

"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Upload, X, ImageIcon, AlertCircle } from "lucide-react"
import type { BannerUpload } from "@/lib/banner-management-types"
import { BANNER_DIMENSIONS } from "@/lib/banner-management-types"

interface BannerUploadProps {
  onUpload: (upload: BannerUpload) => void
  onRemove: () => void
  currentUpload?: BannerUpload
  position: string
  maxSize?: number // in MB
}

export function BannerUploadComponent({ onUpload, onRemove, currentUpload, position, maxSize = 5 }: BannerUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const recommendedDimensions = BANNER_DIMENSIONS[position as keyof typeof BANNER_DIMENSIONS]

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return

    const file = files[0]
    setError(null)

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file (JPG, PNG, GIF, WebP)")
      return
    }

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`)
      return
    }

    // Create preview and get dimensions
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const upload: BannerUpload = {
          file,
          preview: e.target?.result as string,
          dimensions: {
            width: img.width,
            height: img.height,
          },
        }
        onUpload(upload)
      }
      img.src = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    handleFiles(e.dataTransfer.files)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files)
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium">Banner Image</Label>
        <p className="text-xs text-gray-500 mt-1">
          Recommended size: {recommendedDimensions.width} x {recommendedDimensions.height}px
        </p>
      </div>

      {currentUpload ? (
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <img
                src={currentUpload.preview || "/placeholder.svg"}
                alt="Banner preview"
                className="w-full h-auto rounded-lg border"
                style={{ maxHeight: "200px", objectFit: "contain" }}
              />
              <Button variant="destructive" size="sm" className="absolute top-2 right-2" onClick={onRemove}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {currentUpload.dimensions.width} x {currentUpload.dimensions.height}px
              </div>
              <div className="text-sm text-gray-600">{(currentUpload.file.size / 1024 / 1024).toFixed(2)}MB</div>
            </div>
            {(currentUpload.dimensions.width !== recommendedDimensions.width ||
              currentUpload.dimensions.height !== recommendedDimensions.height) && (
              <div className="mt-2 flex items-center gap-2 text-amber-600 text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>Image dimensions don't match recommended size</span>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card
          className={`border-2 border-dashed transition-colors cursor-pointer ${
            dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={openFileDialog}
        >
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <div className="space-y-2">
                <p className="text-sm font-medium">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">JPG, PNG, GIF, WebP up to {maxSize}MB</p>
              </div>
              <Button variant="outline" className="mt-4" type="button">
                <Upload className="h-4 w-4 mr-2" />
                Choose File
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {error && (
        <div className="flex items-center gap-2 text-red-600 text-sm">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}

      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleChange} className="hidden" />

      <div className="text-xs text-gray-500">
        <p className="font-medium mb-1">Recommended dimensions by position:</p>
        <div className="grid grid-cols-2 gap-2">
          <div>Left/Right Sidebar: 250 x 300px</div>
          <div>Top/Bottom: 728 x 90px</div>
          <div>Inline Content: 300 x 250px</div>
        </div>
      </div>
    </div>
  )
}

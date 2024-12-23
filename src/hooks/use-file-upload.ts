'use client'

import * as React from 'react'
import { useQuery } from '@tanstack/react-query'
import { pruneFile } from '@inverter-network/sdk'

export type UseFileUploadParams = {
  onError?: (error: string) => void
}

export type UseFileUploadReturnType = ReturnType<typeof useFileUpload>

export const useFileUpload = ({ onError }: UseFileUploadParams = {}) => {
  const ref = React.useRef<HTMLInputElement | null>(null)
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null)

  const handleFileChange = (file?: File) => {
    let invalid = false

    if (!file) {
      setPreviewUrl(null)
      invalid = true
    }

    if (file && file.size > 1024 * 1024) {
      onError?.('File size must be less than 1MB')
      invalid = true
    }

    if (invalid) {
      ref.current && (ref.current.value = '')
      return
    }

    // Generate a new preview URL
    const newPreviewUrl = URL.createObjectURL(file!)
    setPreviewUrl(newPreviewUrl)
  }

  const prunedFile = useQuery({
    queryKey: ['prunedFile'],
    queryFn: () => {
      return pruneFile(ref?.current?.files?.[0])
    },
    enabled: !!previewUrl,
  })

  return {
    ref,
    previewUrl,
    handleFileChange,
    prunedFile: prunedFile.data,
  }
}

"use client"

import React from "react"
import { TagInput } from "@/components/ui/tag-input"

interface TagInputWrapperProps {
  initialTags?: string[]
}

export function TagInputWrapper({ initialTags = [] }: TagInputWrapperProps) {
  const [tags, setTags] = React.useState<string[]>(initialTags)

  return (
    <>
      <TagInput value={tags} onChange={setTags} placeholder="Add tags..." />
      <input type="hidden" name="tags" value={JSON.stringify(tags)} />
    </>
  )
}

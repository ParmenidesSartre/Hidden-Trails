"use client"

import type React from "react"

import { X } from "lucide-react"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface TagInputProps {
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

export function TagInput({
  value = [],
  onChange,
  placeholder = "Add tag...",
  className,
  disabled = false,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState("")

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue) {
      e.preventDefault()
      if (!value.includes(inputValue.trim())) {
        const newValue = [...value, inputValue.trim()]
        onChange(newValue)
      }
      setInputValue("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    const newValue = value.filter((t) => t !== tag)
    onChange(newValue)
  }

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {value.map((tag) => (
        <Badge key={tag} variant="secondary" className="text-sm">
          {tag}
          {!disabled && (
            <button
              type="button"
              className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-offset-2"
              onClick={() => handleRemoveTag(tag)}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove {tag}</span>
            </button>
          )}
        </Badge>
      ))}
      {!disabled && (
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleInputKeyDown}
          placeholder={placeholder}
          className="flex-1 min-w-[120px]"
        />
      )}
    </div>
  )
}

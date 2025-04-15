"use client"

import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"

interface DeleteButtonProps {
  onDelete: () => Promise<void>
}

export function DeleteButton({ onDelete }: DeleteButtonProps) {
  return (
    <form action={onDelete}>
      <Button
        variant="ghost"
        size="icon"
        type="submit"
        className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
      >
        <Trash className="h-4 w-4" />
      </Button>
    </form>
  )
}

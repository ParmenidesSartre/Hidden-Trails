"use client"

import { Button } from "@/components/ui/button"
import { Edit, Trash } from "lucide-react"
import Link from "next/link"
import { deletePlace } from "@/app/places/actions"

interface PlaceActionsProps {
  id: number
}

export function PlaceActions({ id }: PlaceActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <Link href={`/places/${id}/edit`}>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Edit className="h-4 w-4" />
        </Button>
      </Link>
      <form
        action={async () => {
          await deletePlace(id)
        }}
      >
        <Button
          variant="ghost"
          size="icon"
          type="submit"
          className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
        >
          <Trash className="h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}

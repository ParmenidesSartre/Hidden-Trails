"use client"

import { Button } from "@/components/ui/button"
import { Edit, Trash, Utensils } from "lucide-react"
import Link from "next/link"
import { deleteFoodPlace } from "@/app/food-places/actions"

interface FoodPlaceActionsProps {
  id: number
}

export function FoodPlaceActions({ id }: FoodPlaceActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <Link href={`/food-places/${id}/menu`}>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-orange-500 hover:text-orange-600 hover:bg-orange-50"
        >
          <Utensils className="h-4 w-4" />
        </Button>
      </Link>
      <Link href={`/food-places/${id}/edit`}>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Edit className="h-4 w-4" />
        </Button>
      </Link>
      <form
        action={async () => {
          await deleteFoodPlace(id)
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

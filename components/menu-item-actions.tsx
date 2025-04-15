"use client"

import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { EditMenuItemDialog } from "./menu-dialogs"
import { deleteMenuItem } from "@/app/food-places/[id]/menu/actions"

interface MenuItemActionsProps {
  foodId: number
  menuItem: {
    id: number
    name: string
    description: string | null
    price: number
    image: string | null
    isSpecial: boolean
  }
}

export function MenuItemActions({ foodId, menuItem }: MenuItemActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <EditMenuItemDialog foodId={foodId} menuItem={menuItem} />
      <form
        action={async () => {
          await deleteMenuItem(foodId, menuItem.id)
        }}
      >
        <Button variant="outline" size="icon" type="submit" className="text-red-500">
          <Trash className="h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { redirect } from "next/navigation"
import foodPlaceService from "@/services/food-place-service"
import { AddMenuItemDialog } from "@/components/menu-dialogs"
import { MenuItemDataTable } from "@/components/data-tables/menu-item-data-table"

interface MenuPageProps {
  params: {
    id: string
  }
}

export default async function MenuPage({ params }: MenuPageProps) {
  const foodId = Number.parseInt(params.id)

  // Fetch the food place data
  const foodPlace = await foodPlaceService.getFoodPlace(foodId)

  if (!foodPlace) {
    redirect("/food-places")
  }

  // Get menu items
  const menuItems = foodPlace.menuItems || []

  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">{foodPlace.name} - Menu</h1>
          <p className="text-muted-foreground">{foodPlace.location}</p>
        </div>
        <div className="flex gap-2">
          <Link href="/food-places">
            <Button variant="outline">Back to Food Places</Button>
          </Link>
          <AddMenuItemDialog foodId={foodId} />
        </div>
      </div>

      <MenuItemDataTable data={menuItems} foodId={foodId} />
    </div>
  )
}

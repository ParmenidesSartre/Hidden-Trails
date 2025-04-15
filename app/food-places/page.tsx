import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import foodPlaceService from "@/services/food-place-service"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FoodPlaceDataTable } from "@/components/data-tables/food-place-data-table"

export default async function FoodPlacesPage() {
  // Fetch food places from the API
  const foodPlaces = await foodPlaceService.getFoodPlaces()

  return (
    <div className="w-full max-w-none space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Food Places</h1>
          <p className="text-muted-foreground">Manage your restaurants and cafes here.</p>
        </div>
        <Link href="/food-places/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Button>
        </Link>
      </div>

      {foodPlaces.length > 0 ? (
        <div className="rounded-md border bg-card w-full max-w-none">
          <FoodPlaceDataTable data={foodPlaces} />
        </div>
      ) : (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>No Food Places Found</CardTitle>
            <CardDescription>
              There are no food places available or there was an error connecting to the API.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">This could be due to:</p>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>The API server is currently unavailable</li>
              <li>There are no food places in the database</li>
              <li>There was an error processing the request</li>
            </ul>
            <div className="mt-6">
              <Link href="/food-places/new">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Food Place
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

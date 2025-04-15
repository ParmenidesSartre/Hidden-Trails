import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import placeService from "@/services/place-service"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlaceDataTable } from "@/components/data-tables/place-data-table"

export default async function PlacesPage() {
  // Fetch places from the API
  const places = await placeService.getPlaces()

  return (
    <div className="w-full max-w-none space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Places</h1>
          <p className="text-muted-foreground">Manage your tourist places here.</p>
        </div>
        <Link href="/places/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Button>
        </Link>
      </div>

      {places.length > 0 ? (
        <div className="rounded-md border bg-card w-full max-w-none">
          <PlaceDataTable data={places} />
        </div>
      ) : (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>No Places Found</CardTitle>
            <CardDescription>
              There are no tourist places available or there was an error connecting to the API.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">This could be due to:</p>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>The API server is currently unavailable</li>
              <li>There are no places in the database</li>
              <li>There was an error processing the request</li>
            </ul>
            <div className="mt-6">
              <Link href="/places/new">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Place
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

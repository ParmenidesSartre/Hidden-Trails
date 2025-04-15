import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import accommodationService from "@/services/accommodation-service"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AccommodationDataTable } from "@/components/data-tables/accommodation-data-table"

export default async function AccommodationsPage() {
  // Fetch accommodations from the API
  const accommodations = await accommodationService.getAccommodations()

  return (
    <div className="w-full max-w-none space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Accommodations</h1>
          <p className="text-muted-foreground">Manage your accommodations here.</p>
        </div>
        <Link href="/accommodations/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Button>
        </Link>
      </div>

      {accommodations.length > 0 ? (
        <div className="rounded-md border bg-card w-full max-w-none">
          <AccommodationDataTable data={accommodations} />
        </div>
      ) : (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>No Accommodations Found</CardTitle>
            <CardDescription>
              There are no accommodations available or there was an error connecting to the API.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">This could be due to:</p>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>The API server is currently unavailable</li>
              <li>There are no accommodations in the database</li>
              <li>There was an error processing the request</li>
            </ul>
            <div className="mt-6">
              <Link href="/accommodations/new">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Accommodation
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

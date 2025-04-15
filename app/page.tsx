import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, MapPin, Utensils, TrendingUp, Users, Star, AlertCircle } from "lucide-react"
import Link from "next/link"
import accommodationService from "@/services/accommodation-service"
import placeService from "@/services/place-service"
import foodPlaceService from "@/services/food-place-service"

export default async function Dashboard() {
  // Get data for dashboard stats with error handling
  const accommodations = await accommodationService.getAccommodations()
  const places = await placeService.getPlaces()
  const foodPlaces = await foodPlaceService.getFoodPlaces()

  // Calculate some stats
  const totalEntities = accommodations.length + places.length + foodPlaces.length
  const superhostCount = accommodations.filter((a) => a.isSuperhost).length
  const mustVisitCount = [...places, ...foodPlaces].filter((p) => p.isMustVisit).length

  // Check if we have any data at all
  const hasData = totalEntities > 0

  return (
    <div className="w-full max-w-none space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your Hidden Trails dashboard.</p>
      </div>

      {!hasData && (
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-amber-800">
              <AlertCircle className="h-5 w-5 mr-2" />
              API Connection Issue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-amber-800">
              Unable to fetch data from the API. The server might be down or there could be a connection issue.
            </p>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-primary/5 pb-2">
            <CardTitle className="text-sm font-medium">Total Entities</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{totalEntities}</div>
            <p className="text-xs text-muted-foreground">
              {accommodations.length} accommodations, {places.length} places, {foodPlaces.length} food places
            </p>
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-primary/5 pb-2">
            <CardTitle className="text-sm font-medium">Superhosts</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{superhostCount}</div>
            <p className="text-xs text-muted-foreground">
              {accommodations.length > 0
                ? `${((superhostCount / accommodations.length) * 100).toFixed(1)}% of accommodations`
                : "No accommodations available"}
            </p>
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-primary/5 pb-2">
            <CardTitle className="text-sm font-medium">Must Visit Places</CardTitle>
            <Star className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{mustVisitCount}</div>
            <p className="text-xs text-muted-foreground">
              {places.length + foodPlaces.length > 0
                ? `${((mustVisitCount / (places.length + foodPlaces.length)) * 100).toFixed(1)}% of all places`
                : "No places available"}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/accommodations" className="group">
          <Card className="h-full overflow-hidden transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-primary/5 pb-2">
              <CardTitle className="text-sm font-medium">Accommodations</CardTitle>
              <Building className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-2xl font-bold">{accommodations.length}</div>
              <CardDescription>Manage all accommodations</CardDescription>
              <div className="mt-4 flex items-center text-xs text-muted-foreground">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
                {superhostCount} superhosts
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/places" className="group">
          <Card className="h-full overflow-hidden transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-primary/5 pb-2">
              <CardTitle className="text-sm font-medium">Places</CardTitle>
              <MapPin className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-2xl font-bold">{places.length}</div>
              <CardDescription>Manage tourist places</CardDescription>
              <div className="mt-4 flex items-center text-xs text-muted-foreground">
                <div className="h-2 w-2 rounded-full bg-amber-500 mr-1"></div>
                {places.filter((p) => p.isMustVisit).length} must visit places
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/food-places" className="group">
          <Card className="h-full overflow-hidden transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-primary/5 pb-2">
              <CardTitle className="text-sm font-medium">Food Places</CardTitle>
              <Utensils className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-2xl font-bold">{foodPlaces.length}</div>
              <CardDescription>Manage restaurants and cafes</CardDescription>
              <div className="mt-4 flex items-center text-xs text-muted-foreground">
                <div className="h-2 w-2 rounded-full bg-amber-500 mr-1"></div>
                {foodPlaces.filter((p) => p.isMustVisit).length} must visit food places
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}

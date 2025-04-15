import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { redirect } from "next/navigation"
import Link from "next/link"
import { revalidatePath } from "next/cache"
import foodPlaceService from "@/services/food-place-service"
import { TagInputWrapper } from "@/components/tag-input-wrapper"

interface EditFoodPlacePageProps {
  params: {
    id: string
  }
}

// Server action to update a food place
async function updateFoodPlace(id: number, formData: FormData) {
  "use server"

  const name = formData.get("name") as string
  const location = formData.get("location") as string
  const latitude = Number.parseFloat(formData.get("latitude") as string)
  const longitude = Number.parseFloat(formData.get("longitude") as string)
  const distance = (formData.get("distance") as string) || null
  const rating = formData.get("rating") ? Number.parseFloat(formData.get("rating") as string) : null
  const reviews = formData.get("reviews") ? Number.parseInt(formData.get("reviews") as string) : null
  const priceRange = formData.get("priceRange") as string
  const cuisine = formData.get("cuisine") as string
  const openingHours = formData.get("openingHours") as string
  const image = (formData.get("image") as string) || null
  const description = (formData.get("description") as string) || null
  const isMustVisit = formData.get("isMustVisit") === "on"
  const tags = JSON.parse(formData.get("tags") as string) as string[]

  await foodPlaceService.updateFoodPlace(id, {
    name,
    location,
    latitude,
    longitude,
    distance,
    rating,
    reviews,
    priceRange,
    cuisine,
    openingHours,
    image,
    description,
    isMustVisit,
    tags,
  })

  revalidatePath("/food-places")
  redirect("/food-places")
}

export default async function EditFoodPlacePage({ params }: EditFoodPlacePageProps) {
  const id = Number.parseInt(params.id)

  // Fetch the food place data
  const foodPlace = await foodPlaceService.getFoodPlace(id)

  if (!foodPlace) {
    redirect("/food-places")
  }

  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Edit Food Place</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Food Place Details</CardTitle>
          <CardDescription>Update the details for this food place</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action={async (formData) => {
              await updateFoodPlace(id, formData)
            }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" defaultValue={foodPlace.name} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" defaultValue={foodPlace.location} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  name="latitude"
                  type="number"
                  step="any"
                  defaultValue={foodPlace.latitude}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  name="longitude"
                  type="number"
                  step="any"
                  defaultValue={foodPlace.longitude}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="distance">Distance</Label>
                <Input id="distance" name="distance" defaultValue={foodPlace.distance || undefined} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rating">Rating</Label>
                <Input
                  id="rating"
                  name="rating"
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  defaultValue={foodPlace.rating || undefined}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reviews">Reviews Count</Label>
                <Input id="reviews" name="reviews" type="number" defaultValue={foodPlace.reviews || undefined} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="priceRange">Price Range</Label>
                <Input id="priceRange" name="priceRange" defaultValue={foodPlace.priceRange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cuisine">Cuisine</Label>
                <Input id="cuisine" name="cuisine" defaultValue={foodPlace.cuisine} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="openingHours">Opening Hours</Label>
                <Input id="openingHours" name="openingHours" defaultValue={foodPlace.openingHours} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input id="image" name="image" defaultValue={foodPlace.image || undefined} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                rows={5}
                defaultValue={foodPlace.description || undefined}
              />
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <TagInputWrapper initialTags={foodPlace.tags} />
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="isMustVisit" name="isMustVisit" defaultChecked={foodPlace.isMustVisit} />
              <Label htmlFor="isMustVisit">Must Visit</Label>
            </div>

            <div className="flex justify-end space-x-2">
              <Link href="/food-places">
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </Link>
              <Button type="submit">Update Food Place</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

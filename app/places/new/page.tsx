import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { redirect } from "next/navigation"
import Link from "next/link"
import { revalidatePath } from "next/cache"
import placeService from "@/services/place-service"
import { TagInputWrapper } from "@/components/tag-input-wrapper"

// Server action to create a new place
async function createPlace(formData: FormData) {
  "use server"

  const name = formData.get("name") as string
  const location = formData.get("location") as string
  const latitude = Number.parseFloat(formData.get("latitude") as string)
  const longitude = Number.parseFloat(formData.get("longitude") as string)
  const distance = (formData.get("distance") as string) || null
  const rating = formData.get("rating") ? Number.parseFloat(formData.get("rating") as string) : null
  const reviews = formData.get("reviews") ? Number.parseInt(formData.get("reviews") as string) : null
  const entryFee = (formData.get("entryFee") as string) || null
  const type = (formData.get("type") as string) || null
  const image = (formData.get("image") as string) || null
  const description = (formData.get("description") as string) || null
  const isMustVisit = formData.get("isMustVisit") === "on"
  const tags = JSON.parse(formData.get("tags") as string) as string[]

  await placeService.createPlace({
    name,
    location,
    latitude,
    longitude,
    distance,
    rating,
    reviews,
    entryFee,
    type,
    image,
    description,
    isMustVisit,
    tags,
  })

  revalidatePath("/places")
  redirect("/places")
}

export default function NewPlacePage() {
  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Add New Place</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Place Details</CardTitle>
          <CardDescription>Enter the details for the new place</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createPlace} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="latitude">Latitude</Label>
                <Input id="latitude" name="latitude" type="number" step="any" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="longitude">Longitude</Label>
                <Input id="longitude" name="longitude" type="number" step="any" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="distance">Distance</Label>
                <Input id="distance" name="distance" placeholder="e.g. 2.5 km from city center" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rating">Rating</Label>
                <Input id="rating" name="rating" type="number" step="0.1" min="0" max="5" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reviews">Reviews Count</Label>
                <Input id="reviews" name="reviews" type="number" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="entryFee">Entry Fee</Label>
                <Input id="entryFee" name="entryFee" placeholder="e.g. $10 per person" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Input id="type" name="type" placeholder="e.g. Museum, Park, Monument" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input id="image" name="image" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" rows={5} />
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <TagInputWrapper />
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="isMustVisit" name="isMustVisit" />
              <Label htmlFor="isMustVisit">Must Visit</Label>
            </div>

            <div className="flex justify-end space-x-2">
              <Link href="/places">
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </Link>
              <Button type="submit">Create Place</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

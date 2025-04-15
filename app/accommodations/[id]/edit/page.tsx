import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { redirect } from "next/navigation"
import Link from "next/link"
import { revalidatePath } from "next/cache"
import accommodationService from "@/services/accommodation-service"
import { TagInputWrapper } from "@/components/tag-input-wrapper"

interface EditAccommodationPageProps {
  params: {
    id: string
  }
}

// Server action to update an accommodation
async function updateAccommodation(id: number, formData: FormData) {
  "use server"

  const title = formData.get("title") as string
  const location = formData.get("location") as string
  const latitude = Number.parseFloat(formData.get("latitude") as string)
  const longitude = Number.parseFloat(formData.get("longitude") as string)
  const price = formData.get("price") ? Number.parseFloat(formData.get("price") as string) : null
  const rating = formData.get("rating") ? Number.parseFloat(formData.get("rating") as string) : null
  const reviews = formData.get("reviews") ? Number.parseInt(formData.get("reviews") as string) : null
  const image = (formData.get("image") as string) || null
  const description = (formData.get("description") as string) || null
  const isSuperhost = formData.get("isSuperhost") === "on"
  const tags = JSON.parse(formData.get("tags") as string) as string[]

  await accommodationService.updateAccommodation(id, {
    title,
    location,
    latitude,
    longitude,
    price,
    rating,
    reviews,
    image,
    description,
    isSuperhost,
    tags,
  })

  revalidatePath("/accommodations")
  redirect("/accommodations")
}

export default async function EditAccommodationPage({ params }: EditAccommodationPageProps) {
  const id = Number.parseInt(params.id)

  // Fetch the accommodation data
  const accommodation = await accommodationService.getAccommodation(id)

  if (!accommodation) {
    redirect("/accommodations")
  }

  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Edit Accommodation</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Accommodation Details</CardTitle>
          <CardDescription>Update the details for this accommodation</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action={async (formData) => {
              await updateAccommodation(id, formData)
            }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" defaultValue={accommodation.title} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" defaultValue={accommodation.location} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  name="latitude"
                  type="number"
                  step="any"
                  defaultValue={accommodation.latitude}
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
                  defaultValue={accommodation.longitude}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  defaultValue={accommodation.price || undefined}
                />
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
                  defaultValue={accommodation.rating || undefined}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reviews">Reviews Count</Label>
                <Input id="reviews" name="reviews" type="number" defaultValue={accommodation.reviews || undefined} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input id="image" name="image" defaultValue={accommodation.image || undefined} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                rows={5}
                defaultValue={accommodation.description || undefined}
              />
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <TagInputWrapper initialTags={accommodation.tags} />
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="isSuperhost" name="isSuperhost" defaultChecked={accommodation.isSuperhost} />
              <Label htmlFor="isSuperhost">Superhost</Label>
            </div>

            <div className="flex justify-end space-x-2">
              <Link href="/accommodations">
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </Link>
              <Button type="submit">Update Accommodation</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

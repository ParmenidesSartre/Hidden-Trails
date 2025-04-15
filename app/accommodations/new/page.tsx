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
import { ArrowLeft } from "lucide-react"
import { TagInputWrapper } from "@/components/tag-input-wrapper"

// Server action to create a new accommodation
async function createAccommodation(formData: FormData) {
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

  await accommodationService.createAccommodation({
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

export default function NewAccommodationPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Link href="/accommodations" className="mr-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add New Accommodation</h1>
          <p className="text-muted-foreground">Create a new accommodation entry.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Accommodation Details</CardTitle>
          <CardDescription>Enter the details for the new accommodation</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createAccommodation} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" required />
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
                <Label htmlFor="price">Price</Label>
                <Input id="price" name="price" type="number" step="0.01" />
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
              <Switch id="isSuperhost" name="isSuperhost" />
              <Label htmlFor="isSuperhost">Superhost</Label>
            </div>

            <div className="flex justify-end space-x-2">
              <Link href="/accommodations">
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </Link>
              <Button type="submit">Create Accommodation</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

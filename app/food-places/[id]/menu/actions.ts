"use server"

import { revalidatePath } from "next/cache"
import foodPlaceService from "@/services/food-place-service"

// Server action to create a menu item
export async function createMenuItem(foodId: number, formData: FormData) {
  const name = formData.get("name") as string
  const description = (formData.get("description") as string) || null
  const price = Number.parseFloat(formData.get("price") as string)
  const image = (formData.get("image") as string) || null
  const isSpecial = formData.get("isSpecial") === "on"

  await foodPlaceService.createMenuItem(foodId, {
    name,
    description,
    price,
    image,
    isSpecial,
  })

  revalidatePath(`/food-places/${foodId}/menu`)
}

// Server action to update a menu item
export async function updateMenuItem(foodId: number, itemId: number, formData: FormData) {
  const name = formData.get("name") as string
  const description = (formData.get("description") as string) || null
  const price = Number.parseFloat(formData.get("price") as string)
  const image = (formData.get("image") as string) || null
  const isSpecial = formData.get("isSpecial") === "on"

  await foodPlaceService.updateMenuItem(foodId, itemId, {
    name,
    description,
    price,
    image,
    isSpecial,
  })

  revalidatePath(`/food-places/${foodId}/menu`)
}

// Server action to delete a menu item
export async function deleteMenuItem(foodId: number, itemId: number) {
  await foodPlaceService.deleteMenuItem(foodId, itemId)
  revalidatePath(`/food-places/${foodId}/menu`)
}

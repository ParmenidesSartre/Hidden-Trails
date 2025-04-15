"use server"

import { revalidatePath } from "next/cache"
import foodPlaceService from "@/services/food-place-service"

// Server action to delete a food place
export async function deleteFoodPlace(id: number) {
  await foodPlaceService.deleteFoodPlace(id)
  revalidatePath("/food-places")
}

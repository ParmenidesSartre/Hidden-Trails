"use server"

import { revalidatePath } from "next/cache"
import placeService from "@/services/place-service"

// Server action to delete a place
export async function deletePlace(id: number) {
  await placeService.deletePlace(id)
  revalidatePath("/places")
}

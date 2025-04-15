"use server"

import { revalidatePath } from "next/cache"
import accommodationService from "@/services/accommodation-service"

// Server action to delete an accommodation
export async function deleteAccommodation(id: number) {
  await accommodationService.deleteAccommodation(id)
  revalidatePath("/accommodations")
}

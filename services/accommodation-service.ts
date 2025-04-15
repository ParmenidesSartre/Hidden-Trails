import api from "@/lib/api"

export type Accommodation = {
  id: number
  title: string
  location: string
  latitude: number
  longitude: number
  rating?: number | null
  reviews?: number | null
  price?: number | null
  tags: string[]
  image?: string | null
  isSuperhost: boolean
  description?: string | null
}

export type AccommodationListResponse = {
  data: Accommodation[]
  total: number
  page: number
  limit: number
}

export const accommodationService = {
  // Get all accommodations with error handling
  getAccommodations: async (): Promise<Accommodation[]> => {
    try {
      const response = await api.get<AccommodationListResponse>("/accommodations")
      return response.data || []
    } catch (error) {
      console.error("Failed to fetch accommodations:", error)
      // Return empty array instead of throwing to prevent page from crashing
      return []
    }
  },

  // Get accommodation by ID
  getAccommodation: async (id: number): Promise<Accommodation | null> => {
    try {
      return await api.get<Accommodation>(`/accommodations/${id}`)
    } catch (error) {
      console.error(`Failed to fetch accommodation ${id}:`, error)
      return null
    }
  },

  // Create new accommodation
  createAccommodation: async (data: Omit<Accommodation, "id">): Promise<Accommodation> => {
    return api.post<Accommodation>("/accommodations", data)
  },

  // Update accommodation
  updateAccommodation: async (id: number, data: Partial<Accommodation>): Promise<Accommodation> => {
    return api.put<Accommodation>(`/accommodations/${id}`, data)
  },

  // Delete accommodation
  deleteAccommodation: async (id: number): Promise<void> => {
    return api.delete<void>(`/accommodations/${id}`)
  },
}

export default accommodationService

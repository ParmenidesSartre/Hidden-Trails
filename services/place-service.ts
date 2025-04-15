import api from "@/lib/api"

export type Place = {
  id: number
  name: string
  location: string
  latitude: number
  longitude: number
  distance?: string | null
  rating?: number | null
  reviews?: number | null
  entryFee?: string | null
  type?: string | null
  tags: string[]
  image?: string | null
  isMustVisit: boolean
  description?: string | null
}

export type PlaceListResponse = {
  data: Place[]
  total: number
  page: number
  limit: number
}

export const placeService = {
  // Get all places with error handling
  getPlaces: async (): Promise<Place[]> => {
    try {
      const response = await api.get<PlaceListResponse>("/places")
      return response.data || []
    } catch (error) {
      console.error("Failed to fetch places:", error)
      // Return empty array instead of throwing to prevent page from crashing
      return []
    }
  },

  // Get place by ID
  getPlace: async (id: number): Promise<Place | null> => {
    try {
      return await api.get<Place>(`/places/${id}`)
    } catch (error) {
      console.error(`Failed to fetch place ${id}:`, error)
      return null
    }
  },

  // Create new place
  createPlace: async (data: Omit<Place, "id">): Promise<Place> => {
    return api.post<Place>("/places", data)
  },

  // Update place
  updatePlace: async (id: number, data: Partial<Place>): Promise<Place> => {
    return api.put<Place>(`/places/${id}`, data)
  },

  // Delete place
  deletePlace: async (id: number): Promise<void> => {
    return api.delete<void>(`/places/${id}`)
  },
}

export default placeService

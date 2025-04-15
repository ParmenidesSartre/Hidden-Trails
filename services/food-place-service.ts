import api from "@/lib/api"

export type MenuItem = {
  id: number
  foodId: number
  name: string
  description?: string | null
  price: number
  image?: string | null
  isSpecial: boolean
}

export type FoodPlace = {
  id: number
  name: string
  location: string
  latitude: number
  longitude: number
  distance?: string | null
  rating?: number | null
  reviews?: number | null
  priceRange: string
  cuisine: string
  openingHours: string
  tags: string[]
  image?: string | null
  isMustVisit: boolean
  description?: string | null
  menuItems?: MenuItem[]
}

export type FoodPlaceListResponse = {
  data: FoodPlace[]
  total: number
  page: number
  limit: number
}

export const foodPlaceService = {
  // Get all food places with error handling
  getFoodPlaces: async (): Promise<FoodPlace[]> => {
    try {
      const response = await api.get<FoodPlaceListResponse>("/foodplaces")
      return response.data || []
    } catch (error) {
      console.error("Failed to fetch food places:", error)
      // Return empty array instead of throwing to prevent page from crashing
      return []
    }
  },

  // Get food place by ID
  getFoodPlace: async (id: number): Promise<FoodPlace | null> => {
    try {
      return await api.get<FoodPlace>(`/foodplaces/${id}`)
    } catch (error) {
      console.error(`Failed to fetch food place ${id}:`, error)
      return null
    }
  },

  // Create new food place
  createFoodPlace: async (data: Omit<FoodPlace, "id">): Promise<FoodPlace> => {
    return api.post<FoodPlace>("/foodplaces", data)
  },

  // Update food place
  updateFoodPlace: async (id: number, data: Partial<FoodPlace>): Promise<FoodPlace> => {
    return api.put<FoodPlace>(`/foodplaces/${id}`, data)
  },

  // Delete food place
  deleteFoodPlace: async (id: number): Promise<void> => {
    return api.delete<void>(`/foodplaces/${id}`)
  },

  // Get menu items for a food place
  getMenuItems: async (foodId: number): Promise<MenuItem[]> => {
    try {
      const items = await api.get<MenuItem[]>(`/foodplaces/${foodId}/menu`)
      return items || []
    } catch (error) {
      console.error(`Failed to fetch menu items for food place ${foodId}:`, error)
      return []
    }
  },

  // Create menu item
  createMenuItem: async (foodId: number, data: Omit<MenuItem, "id" | "foodId">): Promise<MenuItem> => {
    return api.post<MenuItem>(`/foodplaces/${foodId}/menu`, data)
  },

  // Update menu item
  updateMenuItem: async (
    foodId: number,
    itemId: number,
    data: Partial<Omit<MenuItem, "id" | "foodId">>,
  ): Promise<MenuItem> => {
    return api.put<MenuItem>(`/foodplaces/${foodId}/menu/${itemId}`, data)
  },

  // Delete menu item
  deleteMenuItem: async (foodId: number, itemId: number): Promise<void> => {
    return api.delete<void>(`/foodplaces/${foodId}/menu/${itemId}`)
  },
}

export default foodPlaceService

// Base API URL
const API_BASE_URL = "https://trip-vk33.onrender.com/api"

// Generic fetch function with improved error handling
async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      // Add a reasonable timeout
      signal: options.signal || AbortSignal.timeout(30000),
    })

    // Check if the response is ok (status in the range 200-299)
    if (!response.ok) {
      // Try to get error details from the response
      const errorText = await response.text()
      let errorMessage = `API error: ${response.status} ${response.statusText}`

      try {
        // Try to parse as JSON if possible
        const errorJson = JSON.parse(errorText)
        errorMessage = errorJson.message || errorMessage
      } catch {
        // If not JSON, use the text as is if it's not empty
        if (errorText) {
          errorMessage = `API error: ${errorText}`
        }
      }

      throw new Error(errorMessage)
    }

    // For empty responses (like 204 No Content)
    if (response.status === 204) {
      return {} as T
    }

    // Parse JSON response
    const data = await response.json()
    return data
  } catch (error) {
    // Enhance error with more context
    if (error instanceof Error) {
      console.error(`API request failed for ${endpoint}:`, error.message)
      throw new Error(`Failed to fetch data: ${error.message}`)
    }
    throw error
  }
}

// API client with methods for CRUD operations
export const api = {
  // GET request
  get: async <T,>(endpoint: string, cache?: RequestCache): Promise<T> => {
    return fetchAPI<T>(endpoint, {
      method: "GET",
      cache,
      next: { revalidate: 60 }, // Cache for 60 seconds
    })
  },

  // POST request
  post: async <T,>(endpoint: string, data: any): Promise<T> => {
    return fetchAPI<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  // PUT request
  put: async <T,>(endpoint: string, data: any): Promise<T> => {
    return fetchAPI<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  },

  // DELETE request
  delete: async <T,>(endpoint: string): Promise<T> => {
    return fetchAPI<T>(endpoint, {
      method: "DELETE",
    })
  },
}

export default api

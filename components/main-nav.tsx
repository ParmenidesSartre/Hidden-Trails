import type React from "react"
import Link from "next/link"
import { Building, Home, MapPin, Utensils } from "lucide-react"
import { cn } from "@/lib/utils"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link href="/" className="flex items-center text-sm font-medium transition-colors hover:text-primary">
        <Home className="mr-2 h-4 w-4" />
        Dashboard
      </Link>
      <Link
        href="/accommodations"
        className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <Building className="mr-2 h-4 w-4" />
        Accommodations
      </Link>
      <Link
        href="/places"
        className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <MapPin className="mr-2 h-4 w-4" />
        Places
      </Link>
      <Link
        href="/food-places"
        className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <Utensils className="mr-2 h-4 w-4" />
        Food Places
      </Link>
    </nav>
  )
}

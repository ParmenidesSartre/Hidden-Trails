"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Building, Home, MapPin, Utensils } from "lucide-react"
import { cn } from "@/lib/utils"

export function DashboardSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  const navItems = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Accommodations", href: "/accommodations", icon: Building },
    { name: "Places", href: "/places", icon: MapPin },
    { name: "Food Places", href: "/food-places", icon: Utensils },
  ]

  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-black">
            <span className="text-lg font-bold text-white">T</span>
          </div>
          <div className="font-semibold text-gray-900">Hidden Trails</div>
        </div>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isItemActive = isActive(item.href)
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isItemActive ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { AccommodationActions } from "@/components/accommodation-actions"
import type { Accommodation } from "@/services/accommodation-service"

export function getAccommodationColumns(): ColumnDef<Accommodation>[] {
  return [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => {
        const title = row.getValue("title") as string
        return <div className="font-medium">{title}</div>
      },
    },
    {
      accessorKey: "location",
      header: "Location",
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => {
        const price = row.getValue("price")
        return price ? `${price}` : "N/A"
      },
    },
    {
      accessorKey: "rating",
      header: "Rating",
      cell: ({ row }) => {
        const rating = row.getValue("rating")
        return rating ? (
          <div className="flex items-center">
            <span className="mr-1">{rating}</span>
            <svg className="h-4 w-4 fill-amber-400" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </div>
        ) : (
          "N/A"
        )
      },
    },
    {
      accessorKey: "isSuperhost",
      header: "Superhost",
      cell: ({ row }) => {
        return row.getValue("isSuperhost") ? (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Superhost
          </Badge>
        ) : (
          <span className="text-muted-foreground text-sm">No</span>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const accommodation = row.original
        return <AccommodationActions id={accommodation.id} />
      },
    },
  ]
}

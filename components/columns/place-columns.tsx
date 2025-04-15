"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { PlaceActions } from "@/components/place-actions"
import type { Place } from "@/services/place-service"

export function getPlaceColumns(): ColumnDef<Place>[] {
  return [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        const name = row.getValue("name") as string
        return <div className="font-medium">{name}</div>
      },
    },
    {
      accessorKey: "location",
      header: "Location",
    },
    {
      accessorKey: "distance",
      header: "Distance",
      cell: ({ row }) => {
        const distance = row.getValue("distance")
        return distance || "N/A"
      },
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        const type = row.getValue("type") as string | null
        return type ? (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            {type}
          </Badge>
        ) : (
          "N/A"
        )
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
      accessorKey: "isMustVisit",
      header: "Must Visit",
      cell: ({ row }) => {
        return row.getValue("isMustVisit") ? (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            Must Visit
          </Badge>
        ) : (
          <span className="text-muted-foreground text-sm">No</span>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const place = row.original
        return <PlaceActions id={place.id} />
      },
    },
  ]
}

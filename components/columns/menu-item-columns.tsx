"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { MenuItemActions } from "@/components/menu-item-actions"
import type { MenuItem } from "@/services/food-place-service"

export function getMenuItemColumns(foodId: number): ColumnDef<MenuItem>[] {
  return [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => {
        const price = row.getValue("price")
        return `${price}`
      },
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => {
        const description = row.getValue("description")
        return description || "N/A"
      },
    },
    {
      accessorKey: "isSpecial",
      header: "Special",
      cell: ({ row }) => {
        return row.getValue("isSpecial") ? "Yes" : "No"
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const menuItem = row.original
        return <MenuItemActions foodId={foodId} menuItem={menuItem} />
      },
    },
  ]
}

"use client"

import { DataTable } from "@/components/ui/data-table"
import { getMenuItemColumns } from "@/components/columns/menu-item-columns"
import type { MenuItem } from "@/services/food-place-service"

interface MenuItemDataTableProps {
  data: MenuItem[]
  foodId: number
}

export function MenuItemDataTable({ data, foodId }: MenuItemDataTableProps) {
  const columns = getMenuItemColumns(foodId)
  return <DataTable columns={columns} data={data} searchKey="name" />
}

"use client"

import { DataTable } from "@/components/ui/data-table"
import { getFoodPlaceColumns } from "@/components/columns/food-place-columns"
import type { FoodPlace } from "@/services/food-place-service"

interface FoodPlaceDataTableProps {
  data: FoodPlace[]
}

export function FoodPlaceDataTable({ data }: FoodPlaceDataTableProps) {
  const columns = getFoodPlaceColumns()
  return <DataTable columns={columns} data={data} searchKey="name" />
}

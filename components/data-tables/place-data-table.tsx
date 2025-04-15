"use client"

import { DataTable } from "@/components/ui/data-table"
import { getPlaceColumns } from "@/components/columns/place-columns"
import type { Place } from "@/services/place-service"

interface PlaceDataTableProps {
  data: Place[]
}

export function PlaceDataTable({ data }: PlaceDataTableProps) {
  const columns = getPlaceColumns()
  return <DataTable columns={columns} data={data} searchKey="name" />
}

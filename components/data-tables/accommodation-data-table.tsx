"use client"

import { DataTable } from "@/components/ui/data-table"
import { getAccommodationColumns } from "@/components/columns/accommodation-columns"
import type { Accommodation } from "@/services/accommodation-service"

interface AccommodationDataTableProps {
  data: Accommodation[]
}

export function AccommodationDataTable({ data }: AccommodationDataTableProps) {
  const columns = getAccommodationColumns()
  return <DataTable columns={columns} data={data} searchKey="title" />
}

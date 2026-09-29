import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ProductTable() {
  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30">
              <TableHead className="px-4 py-3 font-bold w-[40%] min-w-52">
                PRODUCT NAME
              </TableHead>
              <TableHead className="px-4 py-3 font-bold lg:table-cell">
                DESCRIPTION
              </TableHead>
              <TableHead className="px-4 py-3 font-bold text-center">
                RETAIL PRICE
              </TableHead>
              <TableHead className="px-4 py-3 font-bold lg:table-cell">
                TYPE
              </TableHead>
              <TableHead className="px-4 py-3 font-bold lg:table-cell">
                CATEGORY
              </TableHead>
              <TableHead className="px-4 py-3 font-bold md:table-cell">
                WAREHOUSE STOCK LEVELS
              </TableHead>
              <TableHead className="px-4 py-3 font-bold xl:table-cell">
                STATUS
              </TableHead>
              <TableHead className="px-4 py-3 font-bold text-right">
                Aksi
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody></TableBody>
        </Table>
      </div>
    </div>
  );
}

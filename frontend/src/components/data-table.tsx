"use client";

import * as React from "react";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  columnFilteringFeature,
  columnVisibilityFeature,
  createColumnHelper,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  FlexRender,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  tableFeatures,
  useTable,
  type ColumnFiltersState,
  type ColumnVisibilityState,
  type Row,
  type SortingState,
} from "@tanstack/react-table";
import { toast } from "sonner";

import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  GripVerticalIcon,
  CircleCheckIcon,
  LoaderIcon,
  EllipsisVerticalIcon,
  Columns3Icon,
  ChevronDownIcon,
  PlusIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  XCircleIcon,
} from "lucide-react";
import {type Order } from "@/types/order";

// Fitur TanStack Table v9
const features = tableFeatures({
  columnFilteringFeature,
  columnVisibilityFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortedRowModel: createSortedRowModel(),
});

const columnHelper = createColumnHelper<typeof features, Order>();

// Drag Handle Component
function DragHandle({ id }: { id: string }) {
  const { attributes, listeners } = useSortable({ id });
  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="size-7 text-card-foreground border-transparent hover:bg-transparent"
    >
      <GripVerticalIcon className="size-3" />
      <span className="sr-only text-card-foreground">Drag to reorder</span>
    </Button>
  );
}

// Kolom Tabel Pesanan Coffesy
const columns = columnHelper.columns([
  columnHelper.display({
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  }),
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          indeterminate={
            table.getIsSomePageRowsSelected() &&
            !table.getIsAllPageRowsSelected()
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center ">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelper.accessor("id", {
    header: "Order ID",
    cell: ({ row }) => <TableCellViewer item={row.original}  />,
    enableHiding: false,
  }),
  columnHelper.accessor("customer", {
    header: "Pelanggan",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium text-card-foreground">{row.original.customer}</span>
        <span className="text-xs text-card-foreground">{row.original.email}</span>
      </div>
    ),
  }),
  columnHelper.accessor("product", {
    header: "Produk",
    cell: ({ row }) => (
      <span className="font-medium text-sm text-card-foreground">
        {row.original.product} <span className="text-xs text-card-foreground">x{row.original.quantity}</span>
      </span>
    ),
  }),
  columnHelper.accessor("amount", {
    header: () => <div className="text-right text-card-foreground">Total</div>,
    cell: ({ row }) => (
      <div className="text-right font-bold text-card-foreground">
        {row.original.amount}
      </div>
    ),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge
          variant="outline"
          className={`px-2 py-0.5 border font-medium ${
            status === "Completed"
              ? "bg-card  text-emerald-600"
              : status === "Processing"
              ? "bg-card  text-blue-600"
              : status === "Pending"
              ? "bg-card  text-amber-600"
              : "bg-card  text-rose-600"
          }`}
        >
          {status === "Completed" && <CircleCheckIcon className="mr-1 size-3 text-card-foreground" />}
          {status === "Processing" && <LoaderIcon className="mr-1 size-3 animate-spin text-card-foreground" />}
          {status === "Pending" && <ClockIcon className="mr-1 size-3 text-card-foreground" />}
          {status === "Cancelled" && <XCircleIcon className="mr-1 size-3 text-card-foreground" />}
          {status}
        </Badge>
      );
    },
  }),
  columnHelper.accessor("paymentMethod", {
    header: "Pembayaran",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-xs text-card-foreground">
        {row.original.paymentMethod}
      </Badge>
    ),
  }),
  columnHelper.display({
    id: "actions",
    header: "Action",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              className="flex size-8 border-transparent text-card-foreground data-open:bg-muted"
              size="icon"
            />
          }
        >
          <EllipsisVerticalIcon className="size-4" />
          <span className="sr-only">Open menu</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem onClick={() => toast.info(`Detail pesanan ${row.original.id}`)}>
            Lihat Detail
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => toast.success(`Status ${row.original.id} diperbarui`)}>
            Tandai Selesai
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Batalkan Order</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  }),
]);

function DraggableRow({ row }: { row: Row<typeof features, Order> }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  });
  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0  data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          <FlexRender cell={cell} />
        </TableCell>
      ))}
    </TableRow>
  );
}

export function DataTable({ data: initialData }: { data: Order[] }) {
  const [data, setData] = React.useState(() => initialData);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<ColumnVisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const sortableId = React.useId();
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => data?.map(({ id }) => id) || [],
    [data]
  );

  const table = useTable({
    features,
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
  });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = dataIds.indexOf(active.id);
        const newIndex = dataIds.indexOf(over.id);
        return arrayMove(data, oldIndex, newIndex);
      });
    }
  }

  return (
    <Tabs defaultValue="all" className="w-full flex-col justify-start gap-4">
      <div className="flex items-center justify-between px-2">
        <TabsList className="flex">
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="processing">Being processed</TabsTrigger>
          <TabsTrigger value="completed">Finished</TabsTrigger>
        </TabsList>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button variant="default" size="sm"/>}
            >
              <Columns3Icon className="mr-2 size-4 text-card-foreground" />
              Kolom
              <ChevronDownIcon className="ml-2 size-4 text-card-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36">
              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== "undefined" &&
                    column.getCanHide()
                )
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button size="sm" onClick={() => toast.success("Membuka form pesanan baru")} variant="default">
            <PlusIcon className="mr-1 size-4 text-card-foreground" />
            <span className="hidden lg:inline text-card-foreground">Place an Order</span>
          </Button>
        </div>
      </div>

      <TabsContent value="all" className="relative  flex flex-col gap-4 overflow-auto px-2">
        <div className="overflow-hidden rounded-lg border bg-card">
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
            id={sortableId}
          >
            <Table>
              <TableHeader className="sticky top-0 z-10 bg-card/80">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder ? null : (
                          <FlexRender header={header} />
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  <SortableContext
                    items={dataIds}
                    strategy={verticalListSortingStrategy}
                  >
                    {table.getRowModel().rows.map((row) => (
                      <DraggableRow key={row.id} row={row} />
                    ))}
                  </SortableContext>
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center text-card-foreground"
                    >
                      There is no order data yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </DndContext>
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between px-2 text-xs">
          <div className="text-card-foreground">
            {table.getFilteredSelectedRowModel().rows.length} dari{" "}
            {table.getFilteredRowModel().rows.length} baris dipilih.
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="font-medium">Baris per halaman</span>
              <Select
                value={`${table.state.pagination.pageSize}`}
                onValueChange={(value) => table.setPageSize(Number(value))}
              >
                <SelectTrigger size="sm" className="w-16">
                  <SelectValue placeholder={table.state.pagination.pageSize} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="font-medium">
              Halaman {table.state.pagination.pageIndex + 1} dari{" "}
              {table.getPageCount()}
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="size-7"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeftIcon className="size-4 text-card-foreground" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="size-7"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <ChevronRightIcon className="size-4 text-card-foreground" />
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}

// Sub-komponent Drawer Detail Pesanan
function TableCellViewer({ item }: { item: Order }) {
  const isMobile = useIsMobile();
  return (
    <Drawer swipeDirection={isMobile ? "down" : "right"}>
      <DrawerTrigger
        render={
          <Button
            variant="default"
            className="w-fit px-0 font-bold border-transparent text-card-foreground hover:underline"
          />
        }
      >
        {item.id}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Detail Pesanan {item.id}</DrawerTitle>
          <DrawerDescription>
            Rincian transaksi pelanggan di Coffesy Store.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 px-4 text-sm">
          <div className="grid grid-cols-2 gap-4 rounded-lg border p-4 bg-card">
            <div>
              <span className="text-xs text-card-foreground">Pelanggan</span>
              <p className="font-medium text-card-foreground">{item.customer}</p>
              <p className="text-xs text-card-foreground">{item.email}</p>
            </div>
            <div>
              <span className="text-xs text-card-foreground">Total Pembayaran</span>
              <p className="font-bold text-lg text-card-foreground">{item.amount}</p>
            </div>
          </div>
          <Separator />
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-card-foreground">Produk:</span>
              <span className="font-medium">{item.product} (x{item.quantity})</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-card-foreground">Metode Pembayaran:</span>
              <span className="font-medium">{item.paymentMethod}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-card-foreground">Tanggal:</span>
              <span className="font-medium">{item.date}</span>
            </div>
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose
            render={<Button variant="outline" className="w-full" />}
          >
            Tutup
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
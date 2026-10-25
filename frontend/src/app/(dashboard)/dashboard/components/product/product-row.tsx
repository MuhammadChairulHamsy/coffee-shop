"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import { Coffee, Pencil, Trash2 } from "lucide-react";
import type { Product } from "@/types/product";
import { formatIDR, formatDate } from "@/utils/format";
import { isValidImageUrl } from "@/utils/validate-url";
import Image from "next/image";

type ProductRowProps = {
  product: Product;
  isSelected: boolean;
  onSelectOne: (id: number, checked: boolean) => void;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
};

export function ProductRow({
  product,
  isSelected,
  onSelectOne,
  onEdit,
  onDelete,
}: ProductRowProps) {
  const hasValidImage = isValidImageUrl(product.imageUrl);

  return (
    <TableRow
      className={
        isSelected
          ? "border-neutral-800 bg-neutral-900/50 transition-colors"
          : "border-neutral-800 transition-colors"
      }
    >
      <TableCell className="px-4 py-3">
        <Checkbox
          checked={isSelected}
          onCheckedChange={(checked) => onSelectOne(product.id, Boolean(checked))}
          aria-label={`Pilih ${product.name}`}
        />
      </TableCell>

      <TableCell className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="shrink-0">
            {hasValidImage ? (
              <Image
                src={product.imageUrl!}
                alt={product.name}
                width={48}
                height={48}
                loading="lazy"
                unoptimized
                className="size-12 rounded-md border border-neutral-800 object-cover"
              />
            ) : (
              <div className="flex size-12 items-center justify-center rounded-md bg-neutral-900">
                <Coffee className="size-5 text-neutral-500" />
              </div>
            )}
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="truncate font-medium text-neutral-50">
              {product.name}
            </span>
            <span className="text-xs text-neutral-500">
              {formatDate(product.createdAt)}
            </span>
          </div>
        </div>
      </TableCell>

      <TableCell className="hidden max-w-xs px-4 py-3 lg:table-cell">
        <p className="truncate text-xs text-neutral-400">
          {product.description || "—"}
        </p>
      </TableCell>

      <TableCell className="px-4 py-3 text-center">
        <span className="text-sm font-semibold tabular-nums text-neutral-50">
          {formatIDR(product.price)}
        </span>
      </TableCell>

      <TableCell className="hidden px-4 py-3 lg:table-cell">
        <Badge variant="outline" className="rounded-md border-neutral-800 bg-transparent text-xs font-normal text-neutral-300">
          {product.type}
        </Badge>
      </TableCell>

      <TableCell className="hidden px-4 py-3 lg:table-cell">
        <Badge variant="outline" className="rounded-md border-neutral-800 bg-transparent text-xs font-normal text-neutral-300">
          {product.category?.name || "Uncategorized"}
        </Badge>
      </TableCell>

      <TableCell className="hidden px-4 py-3 xl:table-cell">
        <ProductStatusBadges product={product} />
      </TableCell>

      <TableCell className="px-4 py-3 text-right">
        <div className="flex justify-end gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit?.(product)}
            className="size-8 cursor-pointer text-neutral-400 hover:text-neutral-50"
            aria-label={`Edit ${product.name}`}
          >
            <Pencil className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete?.(product)}
            className="size-8 cursor-pointer text-rose-400 hover:bg-rose-500/10"
            aria-label={`Hapus ${product.name}`}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

function ProductStatusBadges({ product }: { product: Product }) {
  const hasStatus = product.is_special || product.is_liked;
  if (!hasStatus) return <span className="text-xs text-neutral-600">—</span>;

  return (
    <div className="flex flex-wrap gap-1">
      {product.is_special && (
        <Badge className="border-orange-400/20 bg-orange-500/10 text-orange-400">
          Special
        </Badge>
      )}
      {product.is_liked && (
        <Badge className="border-emerald-400/20 bg-emerald-500/10 text-emerald-400">
          Liked
        </Badge>
      )}
    </div>
  );
}
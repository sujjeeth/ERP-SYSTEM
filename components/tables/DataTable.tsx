import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface DataTableColumn<T> {
  id: string;
  header: ReactNode;
  cell: (row: T) => ReactNode;
  align?: "left" | "center" | "right";
  width?: string;
  className?: string;
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  getRowId: (row: T) => string;
  loading?: boolean;
  emptyLabel?: string;
  className?: string;
}

const alignment = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export function DataTable<T>({
  columns,
  data,
  getRowId,
  loading = false,
  emptyLabel = "No records found",
  className,
}: DataTableProps<T>) {
  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-y border-[#E9EDF2] bg-[#FAFBFC]">
            {columns.map((column) => (
              <th
                key={column.id}
                scope="col"
                style={{ width: column.width }}
                className={cn(
                  "px-3 py-2 text-[9px] font-semibold",
                  "uppercase tracking-[0.04em] text-[#8993A4]",
                  "whitespace-nowrap",
                  alignment[column.align ?? "left"],
                  column.className
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-3 py-8 text-center text-[11px] text-[#8993A4]"
              >
                Loading records…
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-3 py-8 text-center text-[11px] text-[#8993A4]"
              >
                {emptyLabel}
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr
                key={getRowId(row)}
                className="border-b border-[#EDF0F4] last:border-b-0"
              >
                {columns.map((column) => (
                  <td
                    key={column.id}
                    className={cn(
                      "px-3 py-2.5 align-middle",
                      alignment[column.align ?? "left"],
                      column.className
                    )}
                  >
                    {column.cell(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
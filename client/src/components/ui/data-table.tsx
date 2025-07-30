import React, { useState, useEffect } from "react";
import { Input } from "./input";

interface DataTableProps<T> {
  columns: {
    accessorKey: string;
    header: string;
    cell?: ({ row }: { row: any }) => React.ReactNode;
  }[];
  data: T[];
  searchKey?: string;
  searchPlaceholder?: string;
  onPaginationChange?: (page: number) => void;
  totalPages?: number;
  currentPage?: number;
}

export function DataTable<T>({
  columns,
  data,
  searchKey,
  searchPlaceholder = "Tìm kiếm...",
  onPaginationChange,
  totalPages = 1,
  currentPage = 1,
}: DataTableProps<T>) {
  const [filteredData, setFilteredData] = useState<T[]>(data);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (Array.isArray(data)) {
      if (searchKey && searchQuery) {
        const filtered = data.filter((item: any) => {
          const value = searchKey.split('.').reduce((obj, key) => obj && obj[key], item);
          if (!value) return false;
          return String(value).toLowerCase().includes(searchQuery.toLowerCase());
        });
        setFilteredData(filtered);
      } else {
        setFilteredData(data);
      }
    } else {
      setFilteredData([]);
    }
  }, [data, searchKey, searchQuery]);

  const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  return (
    <div className="rounded-md border">
      {searchKey && (
        <div className="p-4 border-b">
          <Input
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full caption-bottom text-sm">
          <thead className="bg-slate-100">
            <tr>
              {columns.map((column) => (
                <th key={column.accessorKey} className="px-4 py-3 text-left font-medium text-gray-700">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="p-4 text-center text-muted-foreground">
                  Không có dữ liệu để hiển thị
                </td>
              </tr>
            ) : (
              filteredData.map((row: any, i: number) => (
                <tr key={i} className="border-b hover:bg-slate-50">
                  {columns.map((column) => (
                    <td key={column.accessorKey} className="px-4 py-3">
                      {column.cell 
                        ? column.cell({ row: { getValue: (key: string) => getNestedValue(row, key) } }) 
                        : getNestedValue(row, column.accessorKey)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {onPaginationChange && totalPages > 1 && (
        <div className="flex items-center justify-end space-x-2 py-4 px-4 border-t">
          <button
            onClick={() => onPaginationChange(Math.max(1, currentPage - 1))}
            disabled={currentPage <= 1}
            className="px-3 py-1 rounded border bg-white disabled:opacity-50"
          >
            Trước
          </button>
          <span>
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => onPaginationChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage >= totalPages}
            className="px-3 py-1 rounded border bg-white disabled:opacity-50"
          >
            Sau
          </button>
        </div>
      )}
    </div>
  );
}

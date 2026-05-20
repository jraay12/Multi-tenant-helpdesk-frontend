import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Column<T> = {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
};

type PaginationProps = {
  page: number;
  totalPages: number;
  total: number;
  limit: number;

  onPageChange: (page: number) => void;
};

type TableProps<T> = {
  data: T[];
  columns: Column<T>[];

  loading?: boolean;

  emptyMessage?: string;

  pagination?: PaginationProps;
};

const TableComponents = <T,>({
  data,
  columns,
  loading = false,
  emptyMessage = "No data available",
  pagination,
}: TableProps<T>) => {
  return (
    <div className="w-full border border-gray-200 rounded-lg overflow-hidden bg-white mb-10 ">
      {/* TABLE */}
      <table className="w-full border-collapse min-h-120">
        {/* HEADER */}
        <thead className="bg-[#edeef7] border-b border-gray-300">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="text-left p-3 uppercase text-sm font-medium text-gray-600"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        {/* BODY */}
        <tbody className="bg-white">
          {loading ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center p-6 text-gray-500"
              >
                Loading...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center p-6 text-gray-500"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b border-gray-300 hover:bg-gray-50 transition"
              >
                {columns.map((col) => (
                  <td key={col.key} className="p-3 text-sm text-gray-700">
                    {col.render
                      ? col.render(row)
                      : (row as any)[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* PAGINATION */}
      {pagination && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-[#edeef7]">
          <div className="text-sm text-gray-600">
            Showing page{" "}
            <span className="font-medium">
              {pagination.page}
            </span>{" "}
            of{" "}
            <span className="font-medium">
              {pagination.totalPages}
            </span>{" "}
            ({pagination.total} total records)
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                pagination.onPageChange(
                  pagination.page - 1,
                )
              }
              disabled={pagination.page <= 1}
              className="flex items-center gap-1 px-3 py-2 border rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <ChevronLeft size={16} />
              Previous
            </button>

            <button
              onClick={() =>
                pagination.onPageChange(
                  pagination.page + 1,
                )
              }
              disabled={
                pagination.page >= pagination.totalPages
              }
              className="flex items-center gap-1 px-3 py-2 border rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableComponents;
type Column<T> = {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
};

type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
  emptyMessage?: string;
};

const TableComponents = <T,>({
  data,
  columns,
  emptyMessage = "No data available",
}: TableProps<T>) => {
  return (
    <div className="w-full border border-gray-200 rounded-lg overflow-hidden bg-white">
      
      {/* TABLE */}
      <table className="w-full border-collapse">

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
          {data.length === 0 ? (
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
    </div>
  );
};

export default TableComponents;
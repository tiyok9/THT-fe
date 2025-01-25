import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useCallback, useEffect, useState } from "react";

const TableServer = ({ data, tables, setPage, setSorting }: any) => {
  const [pagination, setPagination] = useState<any>({
    pageIndex: data.meta.current_page,
    pageSize: data.meta.per_page,
    rowCount: data.meta.from,
  });

  const table = useReactTable({
    data: data.data as any,
    columns: tables as any,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    state: {
      pagination,
    },
    pageCount: data.meta.last_page,
  });

  useEffect(() => {
    setPage(pagination.pageIndex);
  }, [pagination]);

  const getSortingCallback = useCallback(() => {
    return table.getState().sorting[0];
  }, [table.getState().sorting]);

  useEffect(() => {
    setSorting(getSortingCallback());
  }, [getSortingCallback]);

  return (
    <div className="header-table">
      <div className="overflow-x-auto ">
        <table className="table">
          <thead className=" ">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="th-table"
                  >
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="tbody-table">
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="td-table">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr className="text-center h-32">
                <td className="text-white" colSpan={12}>
                  No Recoard Found ?
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* pagination */}
        <div className="paginate">
          <button
            onClick={() =>
              setPagination((prevPagination: { pageIndex: number }) => ({
                ...prevPagination,
                pageIndex: prevPagination.pageIndex - 1,
              }))
            }
            disabled={table.getState().pagination.pageIndex <= 1}
            className="paginate-arrow"
          >
            {"<"}
          </button>

          <span className="paginate-text ">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex} of {""}
              {table.getPageCount()}
            </strong>
          </span>
          <button
            onClick={() =>
              setPagination((prevPagination: { pageIndex: number }) => ({
                ...prevPagination,
                pageIndex: prevPagination.pageIndex + 1,
              }))
            }
            disabled={
              table.getState().pagination.pageIndex >= table.getPageCount()
            }
            className="paginate-arrow"
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableServer;

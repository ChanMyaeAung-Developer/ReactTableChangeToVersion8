// ReactTable.js - No changes needed, keeping for context
import React, {
  useMemo,
  Fragment,
  useState,
  useEffect,
  useLayoutEffect,
} from "react";
import ExpandableComponent from "./ExpandableComponent";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
  getExpandedRowModel,
  getFacetedUniqueValues,
} from "@tanstack/react-table";
import { TbChevronsRight } from "react-icons/tb";
import { FiFilter } from "react-icons/fi";

import FilterPanel from "./FilterPanel";

const ReactTable = ({ dataRows, dataColumns }) => {
  const data = useMemo(() => dataRows, [dataRows]);

  const [expanded, setExpanded] = useState({});
  const [columnVisibility, setColumnVisibility] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState([]);
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  const prefixColumns = [
    {
      id: "expander",
      size: 50,
      header: ({ table }) => {
        const isAllExpanded = table.getIsAllRowsExpanded();
        return (
          <button
            onClick={table.getToggleAllRowsExpandedHandler()}
            style={{
              transform: isAllExpanded ? "rotate(90deg)" : "rotate(0deg)",
              transition: "transform 0.2s ease",
            }}
          >
            <TbChevronsRight />
          </button>
        );
      },
      cell: ({ row }) => (
        <button onClick={() => row.toggleExpanded()}>
          <TbChevronsRight
            style={{
              transform: row.getIsExpanded() ? "rotate(90deg)" : "rotate(0deg)",
              transition: "transform 0.2s ease",
            }}
          />
        </button>
      ),
    },
  ];

  const mappedDataColumns = useMemo(
    () =>
      dataColumns.map((col) => ({
        header: col.Header,
        accessorKey: col.accessor,
        cell:
          col.accessor === "order_date"
            ? (info) => new Date(info.getValue()).toLocaleDateString()
            : (info) => info.getValue(),
        enableColumnFilter: true,
      })),
    [dataColumns]
  );

  const columns = useMemo(
    () => [...prefixColumns, ...mappedDataColumns],
    [prefixColumns, mappedDataColumns]
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility,
      globalFilter,
      expanded,
      columnFilters,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    onExpandedChange: setExpanded,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  useEffect(() => {
    const defaultVisibility = {};
    dataColumns?.forEach((col) => {
      defaultVisibility[col.accessor] = true;
    });
    setColumnVisibility(defaultVisibility);
  }, [dataColumns]);

  useLayoutEffect(() => {
    const handleResize = () => {
      const wrapper = document.getElementById("customize-table");
      if (!wrapper) return;

      const wrapperWidth = wrapper.offsetWidth;
      const allColumns = dataColumns.map((col) => ({
        accessor: col.accessor,
        width: col.width || 150,
      }));

      let currentTotalWidth = 50;
      const visibility = {};

      for (let i = 0; i < allColumns.length; i++) {
        const { accessor, width } = allColumns[i];
        if (currentTotalWidth + width <= wrapperWidth) {
          visibility[accessor] = true;
          currentTotalWidth += width;
        } else {
          visibility[accessor] = false;
        }
      }

      setColumnVisibility(visibility);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [dataColumns]);

  return (
    <div>
      <div className="p-4 flex items-center gap-2">
        <input
          type="text"
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Global Search..."
          className="border px-2 py-1 rounded w-1/3"
        />
        <button
          onClick={() => setShowFilterPanel(true)}
          className="ml-auto p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          title="Open Column Filters"
        >
          <FiFilter className="h-5 w-5" />
        </button>
      </div>

      {data?.length > 0 && (
        <div className="p-4" id="customize-table">
          <table className="w-full shadow-md">
            <thead className="h-12 rounded-md text-smallHeader">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="bg-[#F1F5FB] text-[#231F2080] font-bold text-[16px]"
                >
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      style={{ width: header.getSize() || 100 }}
                    >
                      <div className="text-center text-sm font-semibold text-gray-700 px-2 py-1">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody className="px-4 text-content">
              {table.getRowModel().rows.map((row, rowIndex) => (
                <Fragment key={row.id}>
                  <tr className="h-10 bg-[#F1F5FB] text-[12px] text-[#231F20E6] font-semibold w-full">
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        style={{ width: cell.column.getSize() || 100 }}
                        className={
                          rowIndex % 2 ? "bg-[#F1F5FB]" : "bg-white"
                        }
                      >
                        <span className="flex items-center justify-center gap-1.5 px-2 line-clamp-1">
                          <p className="line-clamp-1">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </p>
                        </span>
                      </td>
                    ))}
                  </tr>

                  {row.getIsExpanded() && (
                    <tr>
                      <td colSpan={row.getVisibleCells().length}>
                        <ExpandableComponent
                          rowData={row.original}
                          hiddenColumns={Object.keys(columnVisibility).filter(
                            (key) => columnVisibility[key] === false
                          )}
                          columnMeta={dataColumns}
                        />
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex items-center justify-end p-4 gap-2 text-sm">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {showFilterPanel && (
        <FilterPanel
          table={table}
          dataColumns={dataColumns}
          onClose={() => setShowFilterPanel(false)}
        />
      )}
    </div>
  );
};

export default ReactTable;
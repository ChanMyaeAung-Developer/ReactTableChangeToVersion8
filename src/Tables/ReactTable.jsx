// components/ReactTable.jsx
import React, { useMemo, useState, useEffect } from "react"; // Removed useLayoutEffect from here as it's now in the new component
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

// Import the new components
import TableGlobalSearch from "./TableGlobalSearch";
import TableRowCountDisplay from "./TableRowCountDisplay";
import TableColumnFilter from "./TableColumnFilter";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import TablePagination from "./TablePagination";
import TableResponsiveColumnHider from "./TableResponsiveColumnHider"; // Import the new component

const ReactTable = ({ dataRows, dataColumns }) => {
  const data = useMemo(() => dataRows, [dataRows]);

  const [expanded, setExpanded] = useState({});
  const [columnVisibility, setColumnVisibility] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState([]);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [pageSize, setPageSize] = useState(10);

  const prefixColumns = useMemo(
    () => [
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
    ],
    []
  );

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
    initialState: {
      pagination: {
        pageSize,
      },
    },
  });

  useEffect(() => {
    const defaultVisibility = {};
    dataColumns?.forEach((col) => {
      defaultVisibility[col.accessor] = true;
    });
    setColumnVisibility(defaultVisibility);
  }, [dataColumns]);

  // The responsive column hiding logic is now handled by TableResponsiveColumnHider
  // This component will automatically update `columnVisibility` state
  // based on the wrapper's width.

  const handlePageSizeChange = (e) => {
    const value = e.target.value;
    const newSize = value === "all" ? data.length : Number(value);
    setPageSize(newSize);
    table.setPageSize(newSize);
    table.setPageIndex(0); // reset to first page
  };

  return (
    <div>
      {/* TableResponsiveColumnHider is placed here. It doesn't render UI, just manages state. */}
      <TableResponsiveColumnHider
        dataColumns={dataColumns}
        setColumnVisibility={setColumnVisibility}
        tableId="customize-table" // Pass the ID of your table container
        expanderColumnWidth={50} // Pass the width of your expander column if it's fixed
      />

      <div className="p-4 flex items-center gap-2">
        <TableGlobalSearch
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        <TableRowCountDisplay rowCount={table.getRowCount()} />
        <TableColumnFilter
          showFilterPanel={showFilterPanel}
          setShowFilterPanel={setShowFilterPanel}
          table={table}
          dataColumns={dataColumns}
        />
      </div>

      {data?.length > 0 && (
        <div className="p-4" id="customize-table">
          <table className="w-full shadow-md">
            <TableHeader table={table} />
            <TableBody
              table={table}
              columnVisibility={columnVisibility}
              dataColumns={dataColumns}
            />
          </table>
        </div>
      )}

      <TablePagination
        table={table}
        data={data}
        pageSize={pageSize}
        handlePageSizeChange={handlePageSizeChange}
      />
    </div>
  );
};

export default ReactTable;
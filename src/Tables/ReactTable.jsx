import React from "react";
import { useMemo ,Fragment} from "react";
import ExpandableComponent from './ExpandableComponent'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { TbChevronsRight } from "react-icons/tb";

const openExpand = (index, originalData) => {
  const row = document.getElementById(`expand${index}`);
  const icon = document.getElementById(`expandIcon${index}`);
  if (row && icon) {
    const visible = row.style.display === "table-row";
    row.style.display = visible ? "none" : "table-row";
    icon.style.transform = visible ? "rotate(0deg)" : "rotate(90deg)";
  }
};

const openAllExpand = (rows, isAllExpanded) => {
  rows.forEach((row) => {
    const el = document.getElementById(`expand${row.id}`);
    const icon = document.getElementById(`expandIcon${row.index}`);
    if (el && icon) {
      el.style.display = isAllExpanded ? "none" : "table-row";
      icon.style.transform = isAllExpanded ? "rotate(0deg)" : "rotate(90deg)";
    }
  });
};


const ReactTable = ({ dataRows, dataColumns }) => {

  const data = useMemo(() => {
    return dataRows;
  }, [dataRows]);


  const prefixColumns = [
  {
    id: 'expander',
    size: 50,
    header: ({ table }) => {
      const isAllRowsExpanded = table.getIsAllRowsExpanded();
      const toggleAllRowsExpanded = table.getToggleAllRowsExpandedHandler();
      const rows = table.getRowModel().rows;

      return (
        <button
          onClick={() => {
            toggleAllRowsExpanded(!isAllRowsExpanded);
            openAllExpand(rows, isAllRowsExpanded); // You should define this
          }}
        >
          <TbChevronsRight />
        </button>
      );
    },
    cell: ({ row }) => (
      <button
        onClick={() => openExpand(row.index, row.original)} // You should define this
        id={`expandBtn${row.index}`}
      >
        <TbChevronsRight id={`expandIcon${row.index}`} />
      </button>
    ),
  },
];


 
  // const reactTableColumns = React.useMemo(
  //   () =>
  //     dataColumns.map((col) => ({
  //       header: col.Header,
  //       accessorKey: col.accessor,
  //       cell:
  //         col.accessor === "order_date"
  //           ? (info) => new Date(info.getValue()).toLocaleDateString()
  //           : (info) => info.getValue(),
  //     })),
  //   [dataColumns]
  // );
const columns = React.useMemo(
  () =>
    [
      ...prefixColumns, // Add prefix column first
      ...dataColumns.map((col) => ({
        header: col.Header,
        accessorKey: col.accessor,
        cell:
          col.accessor === "order_date"
            ? (info) => new Date(info.getValue()).toLocaleDateString()
            : (info) => info.getValue(),
      })),
    ],
  [dataColumns]
);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (

<div>
{data?.length > 0 && (
<div className="p-4"  id="customize-table">
      <table className={`w-full shadow-md`}>
        <thead className={`h-12 rounded-md  text-smallHeader`}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}
             className={`bg-[#F1F5FB] text-[#231F2080] w-full font-bold text-[16px]`}
             >
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  
     style={{
          width: header.getSize() || 100,
        }}
                 
                >
                 <div className="text-center text-sm font-semibold text-gray-700 px-2 py-1">
    { flexRender(header.column.columnDef.header, header.getContext())}
  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {/* <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody> */}

        <tbody className="px-4 text-content">
  {table.getRowModel().rows.map((row, rowIndex) => (
    <Fragment key={row.id}>
      <tr
        className="h-10 bg-[#F1F5FB] text-[12px] text-[#231F20E6] font-semibold w-full"
      >
        {row.getVisibleCells().map((cell, index) => (
          <td
            key={cell.id}
            style={{
              width: cell.column.getSize() || 100,
            }}
            className={`${
              rowIndex % 2 ? "bg-[#F1F5FB]" : "bg-white"
            }`}
          >
            <span className="flex items-center justify-center gap-1.5 px-2 line-clamp-1">
              <p className="line-clamp-1">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </p>
            </span>
          </td>
        ))}
      </tr>

      {/* Expandable row */}
      <tr
        id={`expand${row.id}`}
        style={{ display: "none" }}
        className=""
      >
        <td colSpan={row.getVisibleCells().length}>
          <ExpandableComponent
            
          />
        </td>
      </tr>
    </Fragment>
  ))}
        </tbody>

  

      </table>
    </div>
  )}
</div>

      
    
  );
};

export default ReactTable;

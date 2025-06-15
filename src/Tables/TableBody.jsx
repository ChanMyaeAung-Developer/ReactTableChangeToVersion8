
import React, { Fragment } from "react";
import { flexRender } from "@tanstack/react-table";
import ExpandableComponent from "./ExpandableComponent"; 

const TableBody = ({ table, columnVisibility, dataColumns }) => {
  const statusColorMap = {
  "Completed": "bg-green-200 text-green-800",
  "OSS Cancel": "bg-red-200 text-red-800",
  "Order Cancel": "bg-yellow-200 text-red-900",
  "Site Assignment": "bg-blue-200 text-blue-800",
};
  return (
    <tbody className="px-4 text-content">
      {table.getRowModel().rows.map((row, rowIndex) => (
        <Fragment key={row.id}>
          <tr className="h-10 bg-[#F1F5FB] text-[12px] text-[#231F20E6] font-semibold w-full">
          {row.getVisibleCells().map((cell) => (
  <td
    key={cell.id}
    style={{ width: cell.column.getSize() || 100 }}
    className={rowIndex % 2 ? "bg-[#F1F5FB]" : "bg-white"}
  >
    <span className="flex items-center justify-center gap-1.5 px-2 line-clamp-1">
 <div
  className={`
    line-clamp-1 p-1 rounded text-sm font-medium
    ${cell.column.id === "installation_status" 
      ? statusColorMap[row.original.installation_status] || "bg-transparent text-gray-800"
      : "bg-transparent"
    }
  `}
>
  {flexRender(cell.column.columnDef.cell, cell.getContext())}
</div>


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
  );
};

export default TableBody;

import React, { Fragment } from "react";
import { flexRender } from "@tanstack/react-table";
import ExpandableComponent from "./ExpandableComponent"; 

const TableBody = ({ table, columnVisibility, dataColumns }) => {
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
                  <p className="line-clamp-1">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
  );
};

export default TableBody;
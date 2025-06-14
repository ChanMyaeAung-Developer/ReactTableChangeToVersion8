import React from "react";
import { flexRender } from "@tanstack/react-table";

const TableHeader = ({ table }) => {
  return (
    <thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr
          key={headerGroup.id}
        className="h-12 bg-gradient-to-b from-blue-100 to-blue-300 text-green-700 font-semibold text-sm uppercase"

        >
          {headerGroup.headers.map((header) => (
            <th key={header.id} style={{ width: header.getSize() || 100 }}>
              <div className="text-center font-semibold px-3 py-2">
                {flexRender(header.column.columnDef.header, header.getContext())}
              </div>
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};

export default TableHeader;

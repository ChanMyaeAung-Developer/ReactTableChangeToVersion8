
import React from "react";

const TableGlobalSearch = ({ globalFilter, setGlobalFilter }) => {
  return (
<input
  type="text"
  value={globalFilter ?? ""}
  onChange={(e) => setGlobalFilter(e.target.value)}
  placeholder="🔍 Search globally..."
  className="w-full md:w-1/3 px-4 py-2 rounded-2xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 shadow-sm hover:shadow-md transition-all duration-200 ease-in-out outline-none"
/>

  );
};

export default TableGlobalSearch;
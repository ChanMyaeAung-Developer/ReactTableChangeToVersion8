
import React from "react";
import { FiFilter } from "react-icons/fi";
import FilterPanel from "./FilterPanel"; 

const TableColumnFilter = ({
  showFilterPanel,
  setShowFilterPanel,
  table,
  dataColumns,
}) => {
  return (
    <>
      <button
        onClick={() => setShowFilterPanel(true)}
        className="ml-auto p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        title="Open Column Filters"
      >
        <FiFilter className="h-5 w-5" />
      </button>

      {showFilterPanel && (
        <FilterPanel
          table={table}
          dataColumns={dataColumns}
          onClose={() => setShowFilterPanel(false)}
        />
      )}
    </>
  );
};

export default TableColumnFilter;
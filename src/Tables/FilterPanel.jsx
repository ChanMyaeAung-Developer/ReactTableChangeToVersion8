// FilterPanel.js
import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const FilterPanel = ({ table, dataColumns, onClose }) => {
  return (
   <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-lg p-6 overflow-y-auto z-50">

      {/* text and close icon */}
      <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Column Filters</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
           <AiOutlineClose className="h-6 w-6" />
          </button>
      </div>

      {table.getAllColumns().map((column) => {
        // Determine the display header
        const displayHeader = typeof column.columnDef.header === 'string'
          ? column.columnDef.header
          : column.id;

        // Skip expander column
        if (column.id === "expander") {
          return null;
        }

        // Conditional rendering for 'order_date' column
        if (column.id === "order_date" && column.getCanFilter()) {
          return (
            <div key={column.id} className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {displayHeader}
              </label>
              <input
                type="date" // Use type="date" for a calendar picker
                value={(column.getFilterValue() ?? "")}
                onChange={(e) => column.setFilterValue(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          );
        }

        // For other filterable columns, use the dropdown logic
        if (column.getCanFilter() && column.getFacetedUniqueValues().size > 0) {
          const uniqueValues = Array.from(column.getFacetedUniqueValues().keys()).sort();

        // return for filterColumn component
          return (
            <div key={column.id} className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {displayHeader}
              </label>
              <select
                value={(column.getFilterValue() ?? "")}
                onChange={(e) => column.setFilterValue(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All</option>
                {uniqueValues.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};

export default FilterPanel;
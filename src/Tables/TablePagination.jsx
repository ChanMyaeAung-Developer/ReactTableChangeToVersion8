
import React from "react";

const TablePagination = ({ table, data, pageSize, handlePageSizeChange }) => {
  return (
    <div className="flex items-center justify-between p-4 gap-4 text-sm">
      <div className="flex items-center gap-2">
        <label htmlFor="pageSizeSelect">Rows per page:</label>
        <select
          id="pageSizeSelect"
          value={pageSize >= data.length ? "all" : pageSize}
          onChange={handlePageSizeChange}
          className="border px-2 py-1 rounded"
        >
          <option value="all">All</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
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
    </div>
  );
};

export default TablePagination;
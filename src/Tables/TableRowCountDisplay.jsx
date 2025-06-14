const TableRowCountDisplay = ({ rowCount }) => {
  return (
    <div className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 shadow-md ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
      <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">All:</span>
      <span className="text-base font-bold text-indigo-600 dark:text-indigo-400">{rowCount}</span>
    </div>
  );
};

export default TableRowCountDisplay;

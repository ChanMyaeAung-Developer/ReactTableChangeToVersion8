
import { useLayoutEffect } from "react";

const TableResponsiveColumnHider = ({
  dataColumns,
  setColumnVisibility,
  tableId = "customize-table", // Default ID, but can be customized
  expanderColumnWidth = 50, // Width for the expander column
}) => {
  useLayoutEffect(() => {
    const handleResize = () => {
      const wrapper = document.getElementById(tableId);
      if (!wrapper) {
        console.warn(`Element with ID "${tableId}" not found for responsive column hiding.`);
        return;
      }

      const wrapperWidth = wrapper.offsetWidth;
      const allColumns = dataColumns.map((col) => ({
        accessor: col.accessor,
        width: col.width || 150, // Default column width if not specified
      }));

      let currentTotalWidth = expanderColumnWidth;
      const visibility = {};

      for (let i = 0; i < allColumns.length; i++) {
        const { accessor, width } = allColumns[i];
        if (currentTotalWidth + width <= wrapperWidth) {
          visibility[accessor] = true;
          currentTotalWidth += width;
        } else {
          visibility[accessor] = false;
        }
      }

      setColumnVisibility(visibility);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call on initial render

    return () => window.removeEventListener("resize", handleResize);
  }, [dataColumns, setColumnVisibility, tableId, expanderColumnWidth]); 

  // This component doesn't render anything visually
  return null;
};

export default TableResponsiveColumnHider;
function ExpandableComponent({ rowData, hiddenColumns, columnMeta }) {
  return (
    <div className="w-full rounded-md overflow-hidden font-semibold">
      {hiddenColumns.length > 0 &&
        hiddenColumns.map((accessor, index) => {
          const colMeta = columnMeta.find((col) => col.accessor === accessor);
          if (!colMeta) return null;

          return (
            <div
              key={index}
              className="bg-white h-16 flex flex-1 gap-2 py-1"
            >
              <div className="ml-2 border customized-rounded w-full basis-1/3 flex items-center justify-center">
                <h3 className="text-center font-bold text-[#231F2080]">
                  {colMeta.Header}
                </h3>
              </div>
              <div className="mr-2 border customized-rounded w-full basis-2/3 flex items-center justify-center text-smallHeader">
                <div className="w-full pl-2 text-left break-all">
                  <div className="flex items-center gap-2 font-semibold text-[#231F20E6]">
                    {rowData[accessor]}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
export default ExpandableComponent;

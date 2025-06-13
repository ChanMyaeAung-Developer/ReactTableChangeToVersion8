import ReactTable from "./ReactTable";


const DataTable = ({
	dataRows = [],
	dataColumns = [],

	
}) => {
	return (
		<div>
			<ReactTable dataRows={dataRows} dataColumns={dataColumns} />
		
		</div>
	);
};

export default DataTable;


import DataTable from './DataTable';

import data from '../../api/data.json';



const Index = () => {


  return (
    <div>
      <DataTable
        dataColumns={data?.data?.columns || []}
        dataRows={data?.data?.datas || []}
      
      />
    </div>
  );
};

export default Index;
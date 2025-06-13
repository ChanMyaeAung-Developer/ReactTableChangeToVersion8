
import DataTable from './Tables/DataTable';

import data from '../api/data.json'



const App = () => {


  return (
    <div>
      <DataTable
        dataColumns={data?.data?.columns || []}
        dataRows={data?.data?.datas || []}
      
      />
    </div>
  );
};

export default App;
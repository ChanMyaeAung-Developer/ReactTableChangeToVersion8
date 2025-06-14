
import ReactTable from './Tables/ReactTable';

import data from '../api/data.json'



const App = () => {


  return (
    <div>
      <ReactTable
        dataColumns={data?.data?.columns || []}
        dataRows={data?.data?.datas || []}
      
      />
    </div>
  );
};

export default App;
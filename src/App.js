import React, { useState, useEffect } from 'react';
import Basket from './containers/basket';
import axios from 'axios';
import { DashboardContext } from "./context/Context";


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState({});

  // API address
  const API = 'https://my-json-server.typicode.com/benirvingplt/products/products';

  // Pull Data with Axios and set it to State. 
  // Data will be passed down to children via context 

  const pullData = () => {
    axios.get(API)
      .then(result => {
        setData(result)
        setIsLoading(false)
      })
      .catch(error => {
        setError(error)
        setIsLoading(false)
      });
  }

  useEffect(() => {
    setIsLoading(true);
    pullData();
  }, [])

  return (
    <DashboardContext.Provider value={data}>
      <div className="App">
        {error && <p>{error}</p>}
        <Basket loading={isLoading} />
      </div>
    </DashboardContext.Provider>
  );
}

export default App;

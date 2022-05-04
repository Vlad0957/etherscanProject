import React, { useEffect, useState } from 'react';
import BlockInfo from './components/BlockInfo';
import './App.css';

const API_KEY = process.env.REACT_APP_API_KEY

function App() {
  const [blockNumber, setBlockNumber] = useState(null);
  useEffect(() => {
    // if (!blockNumber) {
      return () => {
        // console.log(API_KEY, 'API_KEY')
        const timer = window.setInterval(() => {
          fetch(`https://api.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=${API_KEY}`)
            .then((data) => data.json())
            .then((data) => {
              console.log(data.result.slice(2), parseInt(data.result.slice(2), 16));

              setBlockNumber(() => data.result.slice(2));
            });
        }, 2000);
      };
    // }
  }, []);
  return (
    <div className="App">
      <h>ETHERSCAN.IO</h>
      <BlockInfo blockNumber={blockNumber} API_KEY={API_KEY} />
    </div>
  );
}

export default App;

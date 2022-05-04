import React, { useState, useEffect } from 'react';


export default function BlockInfo({ blockNumber, API_KEY }) {
  const [lastBlock, setLastBlock] = useState(parseInt("e04fea", 16));
  useEffect(() => {
    if (blockNumber) {
      return () => {

      const number = parseInt(blockNumber, 16);
      
      // console.log(lastBlock, number);
        let count = 0
      for (let i = lastBlock; i <= number; i++) {
        count++
        setTimeout(() => {
          fetch(`https://api.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&tag=0x${i.toString(16)}&boolean=true&apikey=${API_KEY}`)
          .then((res) => res.json())
          .then((data) => {
            console.log(data, 'data');
            if (data.result.transactions) {
              data.result.transactions.forEach((el) => {
                fetch('http://localhost:4000/api/addBlockTransaction', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                  },
                  body: JSON.stringify({

                    blockNumber: el.blockNumber,
                    to: el.to,
                    from: el.from,
                    value: el.value,

                  }),

                }).then((res) => {
                  console.log(res.json());
                });
              });
            }
          })
        }, 250*count);
        ;
      }
      setLastBlock(() => number + 1);
      }

    }
  }, [blockNumber]);
}

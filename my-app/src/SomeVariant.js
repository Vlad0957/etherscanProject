export default function BlockInfo({ blockNumber }) {
  const [lastBlock, setLastBlock] = useState(0xe00176);
  useEffect(() => {
    if (blockNumber) {
      // return () => {
      // const arrayOfPromises = [];

      const number = parseInt(blockNumber, 16);
      console.log(lastBlock, number);

      for (let i = lastBlock; i <= number; i++) {
        console.log(i.toString(16), 'i.toString(16)');
        // const blockResponse =
        fetch(`https://api.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&tag=0x${i.toString(16)}&boolean=true&apikey=QMAH3KK9576CGG3WGEMQDPP9RMVDQ52GIG`)
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
          });

        // arrayOfPromises.push(blockResponse);
      }

      // Promise.all(arrayOfPromises)
      // .then((res) => {
      //   const arrayOfResponses = [];
      //   res.map((el) => arrayOfResponses.push(el.json()));

      //   arrayOfResponses.forEach((elem) => {
      //     elem.then((data) => {
      //       if (data.result.transactions) {
      //         data.result.transactions.forEach((el) => {
      //           fetch('http://localhost:4000/api/addBlockTransaction', {
      //             method: 'POST',
      //             headers: {
      //               'Content-Type': 'application/json',
      //               // 'Content-Type': 'application/x-www-form-urlencoded',
      //             },
      //             body: JSON.stringify({

      //               blockNumber: el.blockNumber,
      //               to: el.to,
      //               from: el.from,
      //               value: el.value,

      //             }),

      //           }).then((res) => {
      //             console.log(res.json());
      //           });
      //         });
      //       }
      //     });
      //   });
      // });

      setLastBlock(() => number + 1);
    }
    // }
  }, [blockNumber]);
}

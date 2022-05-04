const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const { sequelize, Transaction, Block } = require('./models');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false,
}));
app.use(cookieParser());
app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

const PORT = 4000;

app.post('/api/addBlockTransaction', async (req, res) => {
  
  try {
    const response = await Block.findAll();
    const repeatBlock = response.find((el) => el.number === req.body.blockNumber);
    if (!repeatBlock) {
      const block = await Block.create({ number: req.body.blockNumber });
    }

    const transactions = await Transaction.create({
      from: req.body.from, to: req.body.to, value: req.body.value, blockNumber: req.body.blockNumber,
    });

    res.json(transactions);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});


app.get('/api/getUserAdress', async (req, res) => {
  try {
    const response = await Block.findAll();

    const lastBlok = parseInt(response[response.length - 1].number.slice(2), 16);
    const arrayOfNumbers = [];
    const arrayOfTransactions = [];
    const arrayOfAdresses = [];

    for (let i = lastBlok; i >= lastBlok - 100; i--) {
      arrayOfNumbers.push(i.toString(16));

      const listTransactions = await Transaction.findAll({
        where: {
          blockNumber: `0x${i.toString(16)}`,
        },
      });
      listTransactions.forEach((el) => arrayOfTransactions.push(el));
    }

    arrayOfTransactions.forEach((el) => {
      if (arrayOfAdresses.length) {
        if (arrayOfAdresses.find((data) => data.adress == el.from) || arrayOfAdresses.find((data) => data.adress == el.to)) {
          arrayOfAdresses.forEach((data) => {
            if (data.adress === el.from) {
            
              data.change -= parseInt(el.value.slice(2), 16);
            } else if (data.adress === el.to) {
              
              data.change += parseInt(el.value.slice(2), 16);
            }
          });
        } else {
        
          arrayOfAdresses.push(
            {
              adress: el.from,
              change: -parseInt(el.value.slice(2), 16),
            },
            {
              adress: el.to,
              change: parseInt(el.value.slice(2), 16),
            },
          );
        }
      } else {
        arrayOfAdresses.push(
          {
            adress: el.from,
            change: -parseInt(el.value.slice(2), 16),
          },
          {
            adress: el.to,
            change: parseInt(el.value.slice(2), 16),
          },
        );
      }
    });

    const arrayOfAdressesAbs = arrayOfAdresses.map((el) => {
      el.change = Math.abs(el.change);
      return el;
    });
    res.json({

      userAdress: arrayOfAdressesAbs.sort((a, b) => b.change - a.change)[0].adress,

    });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});



app.listen(PORT, async () => {
  console.log(`listen PORT ${PORT}`);
  await sequelize.authenticate();
  console.log('dataBase connected');
});

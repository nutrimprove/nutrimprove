// Load app server using express
const express = require('express');
const morgan = require('morgan');
const app = express();
const mysql = require('mysql');

const port = 3000;
const foodDataTable = 'eatwell_fooddata';

const connection =
    mysql.createConnection(
        {
            host: 'eat-well.ctzfamvseqqp.eu-west-2.rds.amazonaws.com',
            user: 'WhiT3Kr0w',
            database: 'sdf34^GFDdcxx45',
            password: 'eatwell',
        });

app.use(morgan('combined'));

app.get('/', (req, res) => {
    console.log(`Responding to root route`);
    res.send(`${process.env.HOST}`);
});

app.get('/food/:id', (req, res) => {
    console.log(`Fetching food with id: ${req.params.id}...`);
    connection.query(`SELECT * FROM ${foodDataTable} WHERE id = ${req.params.id};`, (err, rows, fields) => {
        if (!err) {
            console.log('Fetched data!!');
            res.json(rows);
        }   else {
            console.log(err);
        }
    });

    //res.end();
});

app.get('/food', (req, res) => {
    console.log('Fetching foods...');
    connection.query(`SELECT * FROM ${foodDataTable};`, (err, rows, fields) => {
        if (!err) {
            console.log('Fetched data!!');
            res.json(rows);
        } else {
            console.log(err);
        }
    });
    //res.end();
});

app.listen(port, () => {
  console.log(`Server is up and listening on ${port}`);
});

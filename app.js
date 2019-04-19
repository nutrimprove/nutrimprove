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
            host: process.env.HOST,
            user: process.env.USER,
            database: process.env.DATABASE,
            password: process.env.PASSWORD,
        });

app.use(morgan('combined'));

app.get('/', (req, res) => {
    console.log(`Responding to root route`);
    res.send('Hello!!');
});

app.get('/food/:id', (req, res) => {
    console.log(`Fetching food with id: ${req.params.id}...`);
    connection.connect();
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

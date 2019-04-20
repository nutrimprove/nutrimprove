require('dotenv').config();

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
            host: `${process.env.MARIA_HOST}`,
            user: `${process.env.MARIA_USER}`,
            database: `${process.env.MARIA_DB}`,
            password: `${process.env.MARIA_PWD}`,
        });

app.use(morgan('combined'));

app.get('/', (req, res) => {
    console.log(`Responding to root route`);
    res.send(`${JSON.stringify(process.env)}`);
    res.end();
});

app.get('/food/:id', (req, res) => {
    console.log(`Fetching food with id: ${req.params.id}...`);
    connection.query(`SELECT * FROM ${foodDataTable} WHERE id = ${req.params.id};`, (err, rows, fields) => {
        if (!err) {
            console.log('Fetched data!!');
            res.json(rows);
            res.end();
        }   else {
            console.log(err);
            res.end();
        }
    });
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

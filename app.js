// Load app server using express
const express = require('express');
const morgan = require('morgan');
const app = express();
const mysql = require('mysql');

const port = 3010;
const foodDataTable = 'eatwell_fooddata';

const connection =
    mysql.createConnection(
        {
            host: 'geekie.net.mysql',
            user: 'geekie_net',
            database: 'geekie_net',
            password: '307TuyM494f4',
        });

app.use(morgan('combined'));

app.get('/', (request, response) => {
    console.log(`Responding to root route`);
    response.send('Hello!!');
});

app.get('/food/:id', (request, response) => {
    console.log(`Fetching food with id: ${request.params.id}...`);
    connection.connect();
    connection.query(`SELECT * FROM ${foodDataTable} WHERE id = ${request.params.id};`, (err, rows, fields) => {
        if (!err) {
            console.log('Fetched data!!');
            response.json(rows);
        }   else {
            console.log(err);
        }
    });

  // response.end();
});

app.get('/food', (request, response) => {
    console.log('Fetching foods...');
    connection.query(`SELECT * FROM ${foodDataTable};`, (err, rows, fields) => {
        if (!err) {
            console.log('Fetched data!!');
            response.json(rows);
        } else {
            console.log(err);
        }
    });
});

app.listen(3010, () => {
  console.log(`Server is up and listening on ${port}`);
});

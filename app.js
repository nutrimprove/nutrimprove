require('dotenv').config();

const morgan = require('morgan');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const { connection, statusCheck } = require('./database/db');
const queries = require('./database/queries');

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('static_files'));


app.get('/api/status', (req, res) => {
    console.log('API CALL: /api/status');
    statusCheck(req, res);
});

app.get('/api/food/id/:id', (req, res) => {
    console.log('API CALL: /api/food/id');
    connection(req, res, queries.foodById(req.params.id));
});

app.get('/api/food/name/:name', (req, res) => {
    console.log('API CALL: /api/food/name ', queries.foodByName(req.params.name));
    connection(req, res, queries.foodByName(req.params.name));
});

app.get('/api/food', (req, res) => {
    console.log('API CALL: /api/food');
    if(req.query.id) {
        connection(req, res, queries.foodById(req.query.id));
    } else if(req.query.name) {
        connection(req, res, queries.foodByName(req.query.name));
    } else {
        res.send('/api/food endpoint requires one query string parameter (id, name)');
    }
});

app.get('/api/foods', (req, res) => {
    console.log('API CALL: /api/foods');
    connection(req, res, queries.foods);
});

app.get('/', (req, res) => {
    res.send('Welcome to Eat Well POC :)');
});

app.get('/*', (req, res) => {
    res.send('Eat Well POC\n\nEndpoint not available');
});


app.listen(port, () => {
  console.log(`Server is up and listening on ${port}`);
});


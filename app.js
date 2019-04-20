require('dotenv').config();

const morgan = require('morgan');
const app = require('express')();
const bodyParser = require('body-parser');
const port = 3000;
const { connection, statusCheck } = require('./database/db');
const queries = require('./database/queries');

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/api/status', (req, res) => {
    console.log('API CALL: /api/status');
    statusCheck(req, res);
});

app.get('/', (req, res) => {
    console.log(`Responding to root route`);
    res.send(`Welcome to Eatwell POC :)`);
    res.end();
});

app.get('/api/food/:id', (req, res) => {
    console.log(`Fetching food with id: ${req.params.id}...`);
    connection(req, res, queries.foodById(req.params.id));
});

app.get('/api/foods', (req, res) => {
    console.log('Fetching foods...');
    connection(req, res, queries.foods);
});

app.listen(port, () => {
  console.log(`Server is up and listening on ${port}`);
});


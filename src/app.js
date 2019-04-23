import morgan from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';
import { connection, statusCheck } from './database/db';
import queries from './database/queries';
import { response } from './database/response';

const port = 3000;
const app = express();

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
    console.log('API CALL: /api/food/name ');
    connection(req, res, queries.foodByName(req.params.name));
});

app.get('/api/food', (req, res) => {
    console.log('API CALL: /api/food');
    if(req.query.id) {
        connection(req, res, queries.foodById(req.query.id));
    } else if(req.query.name) {
        connection(req, res, queries.foodByName(req.query.name));
    } else {
        response(res, 400, '/api/food endpoint requires one query string parameter (id, name)');
    }
});

app.get('/api/foods', (req, res) => {
    console.log('API CALL: /api/foods');
    connection(req, res, queries.foods);
});

app.get('/', (req, res) => {
    response(res, 200, 'Welcome to Eat Well API!!');
});

app.get('/*', (req, res) => {
    response(res, 400, 'Endpoint not found');
});

app.listen(port, () => {
  console.log(`Server is up and listening on ${port}`);
});


require('isomorphic-unfetch');

const morgan = require('morgan');
const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const { connection, statusCheck } = require('../database/db');
const queries = require('../database/queries');
const favicon = require('serve-favicon');
require("path");
const { response } = require('../database/response');

const port = 3000;
const apiPath = '/api/v1';
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
    .prepare()
    .then(() => {
        const server = express();
        server.use(express.static('public'));
        server.use(favicon('public/images/favicon.ico'));
        //server.use(morgan('combined'));
        server.use(bodyParser.urlencoded({ extended: false }));
        server.use(bodyParser.json());

        server.get(apiPath + '/status', (req, res) => {
            statusCheck(req, res);
        });

        server.get(apiPath + '/food/id/:id', (req, res) => {
            connection(req, res, queries.foodById(req.params.id));
        });

        server.get(apiPath + '/food/name/:name', (req, res) => {
            connection(req, res, queries.foodByName(req.params.name));
        });

        server.get(apiPath + '/food', (req, res) => {
            if(req.query.id) {
                connection(req, res, queries.foodById(req.query.id));
            } else if(req.query.name) {
                connection(req, res, queries.foodByName(req.query.name));
            } else {
                response(res, 400, apiPath + '/food endpoint requires one query string parameter (id, name)');
            }
        });

        server.get(apiPath + '/foods', (req, res) => {
            connection(req, res, queries.foods);
        });

        server.get('*', (req, res) => {
            return handle(req, res);
        });

        server.listen(port, err => {
            if (err) {
                throw err;
            }
            console.log(`> Ready on http://localhost:${port}`)
        });
    })
    .catch(ex => {
        console.error(ex.stack);
        process.exit(1);
    });

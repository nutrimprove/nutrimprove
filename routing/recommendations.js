const router = require('express').Router();
const {connection} = require('../database/db');
const {queries} = require('../database/queries');

const apiPath = '/api/v1';

router.get(`${apiPath}/recommendations`, (req, res) => {
   connection(req, res, queries.recommendations);
});

module.exports = router;
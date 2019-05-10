const router = require('express').Router();
const {connection} = require('../connect/db');
const {queries} = require('../connect/queries');

const apiPath = '/api/v1';

router.get(`${apiPath}/recommendations`, (req, res) => {
   connection(req, res, queries.recommendations);
});

module.exports = router;
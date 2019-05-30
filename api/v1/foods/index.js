const db = require('../../../lib/db');
const escape = require('sql-template-strings');
const url = require('url');
const { baseURL } = require('../../../lib/helpers');

const foodsQuery = escape`SELECT * FROM eatwell_fooddata;`;
const foodsByNameQuery = name =>
  escape`SELECT * FROM eatwell_fooddata WHERE foodname LIKE "%${name}%";`;

module.exports = async (req, res) => {
  const reqUrl = new url.URL(`${baseURL}${req.url}`);
  const name = reqUrl.searchParams.get('name');
  console.log('name', name);
  const foods = name
    ? await db.query(foodsByNameQuery(name))
    : await db.query(foodsQuery);
  res.end(JSON.stringify({ foods }));
};

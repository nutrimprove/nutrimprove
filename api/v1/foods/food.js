const db = require('../../../lib/db');
const escape = require('sql-template-strings');
const url = require('url');
const { baseURL } = require('../../../lib/helpers');

const foodByIdQuery = id =>
  escape`SELECT * FROM eatwell_fooddata WHERE id = ${id};`;

module.exports = async (req, res) => {
  const reqUrl = new url.URL(`${baseURL}${req.url}`);
  const id = reqUrl.searchParams.get('id');
  if (!id) {
    throw new Error(
      'You must pass a food id to access the `/food` endpoint'
    );
  }
  const [food] = await db.query(foodByIdQuery(id));
  res.end(JSON.stringify({ value: food }));
};

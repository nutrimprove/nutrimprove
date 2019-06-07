const db = require('../../../lib/db');
const escape = require('sql-template-strings');

const statusCheckQuery = escape`SELECT val FROM eatwell.status WHERE status.key = "status";`;

module.exports = async (req, res) => {
  const [status] = await db.query(statusCheckQuery);
  res.end(JSON.stringify(status));
};

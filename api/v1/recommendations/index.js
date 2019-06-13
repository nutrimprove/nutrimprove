const db = require('../../../lib/db');
const escape = require('sql-template-strings');

const recommendationsQuery = escape`SELECT rec.id, fd.foodname, fd2.foodname as "recommendation", cont.name FROM eatwell_recommendations rec, eatwell_fooddata fd, eatwell_fooddata fd2, eatwell_contributors cont WHERE rec.food_id = fd.id AND rec.foodrec_id=fd2.id AND rec.contributor_id=cont.id;`;

module.exports = async (req, res) => {
  const recommendations = await db.query(recommendationsQuery);
  res.end(JSON.stringify({ value: recommendations }));
};

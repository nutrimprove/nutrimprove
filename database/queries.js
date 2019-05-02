const queries = {
   foods: 'SELECT * FROM eatwell_fooddata;',
   statusCheck: 'SELECT val FROM eatwell.status WHERE status.key = "status";',
   foodById: (id) => `SELECT * FROM eatwell_fooddata WHERE id = "${id}";`,
   foodByName: (name) => `SELECT * FROM eatwell_fooddata WHERE foodname LIKE "%${name}%";`,
   recommendations: `SELECT rec.id, fd.foodname, fd2.foodname as "recommendation", cont.name FROM eatwell_recommendations rec, eatwell_fooddata fd, eatwell_fooddata fd2, eatwell_contributors cont WHERE rec.food_id = fd.id AND rec.foodrec_id=fd2.id AND rec.contributor_id=cont.id;`,
};

module.exports = queries;
const queries = {
    foods: 'SELECT * FROM eatwell_fooddata;',
    statusCheck: 'SELECT val FROM eatwell.status WHERE status.key = "status";',
    foodById: (id) => `SELECT * FROM eatwell_fooddata WHERE id = "${id}";`,
    foodByName: (name) => `SELECT * FROM eatwell_fooddata WHERE foodname LIKE "%${name}%";`,
};

module.exports = queries;
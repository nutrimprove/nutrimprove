module.exports = {
    foods: 'SELECT * FROM eatwell_fooddata;',
    statusCheck: 'SELECT val FROM eatwell.status WHERE status.key = "DatabaseStatus";',
    foodById: (id) => `SELECT * FROM eatwell_fooddata WHERE id = ${id};`,
    foodByName: (name) => `SELECT * FROM eatwell_fooddata WHERE foodname LIKE "%${name}%";`,
};
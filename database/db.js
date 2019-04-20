const queries = require('./queries');
const mysql = require('mysql');

const db_config = {
    connectionLimit: 100,
    host: `${process.env.HOST}`,
    user: `${process.env.USER}`,
    database: `${process.env.DATABASE}`,
    password: `${process.env.PASSWORD}`,
};
const mysql_pool  = mysql.createPool(db_config);
const timestamp = () => (new Date()).getTime();

module.exports.statusCheck = (req, res) => this.connection(req, res);

module.exports.connection = (req, res, query) => mysql_pool.getConnection((err, conn) => {
    if (err) {
        res.json(db_config);
        // res.json({ "time": timestamp(), "status": "Error connecting to database" });
        return;
    }

    const runQuery = () => conn.query(query, (err2, rows) => {
        const data = { "timestamp": timestamp(), "status": "" };
        if (err2) {
            data["status"] = "Connection failed";
            res.json(data);
        } else {
            res.json(rows);
        }
        conn.release();
    });

    conn.query(queries.statusCheck, (err2, rows) => {
        const data = { "time": timestamp(), "status": "OK" };
        if (err2) {
            data["status"] = "Connection failed";
        } else {
            const dbretval = rows[0]['val'];
            if (dbretval === 1 ) {
                query ? runQuery() : res.json(data);
            } else {
                data["status"] = "Not ready";
                res.json(data);
                conn.release();
            }
        }
    });
});

const mysql = require('serverless-mysql');

/*
 * This file is shareable with all lambda functions to save
 * having to write DB connection boilerplate each time
 */

const db = mysql({
  config: {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
});

/**
 * Make a query to an initialised database connection
 */
const query = async query => {
  try {
    const results = await db.query(query);
    await db.end();
    return results;
  } catch (error) {
    return { error };
  }
};

module.exports = {
  query,
};

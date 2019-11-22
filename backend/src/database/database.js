const Config = require('../utils/config');

const Pool = require('pg').Pool;
const pool = new Pool({
    user: Config.DATABASE.USER,
    host: Config.DATABASE.HOST,
    database: Config.DATABASE.NAME,
    password: Config.DATABASE.PASSWORD,
    port: Config.DATABASE.PORT,
});

const executeQuery = (query, cb) => {
    console.info('[QUERY]: ', JSON.stringify(query));
    pool.query(query, (error, results) => {
        if (error) {
            console.log(error);
            throw error
        }
        cb(results.rows);
    })
};

module.exports = {
    executeQuery
};
const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "123",
    host: "localhost",
    port: 5432,
    database: "testDb"
});


module.exports = pool;
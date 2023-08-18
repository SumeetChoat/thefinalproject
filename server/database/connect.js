const { Pool } = require("pg");
require("dotenv").config();

let db;
if (process.env.NODE_ENV == "test") {
    db = new Pool({
        connectionString: process.env.TEST_DB_URL
    })

    console.log("Test DB connection established.")
} else {
    db = new Pool({
        connectionString: process.env.DB_URL
    })

    console.log("DB connection established.")
}

module.exports = db;

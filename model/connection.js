require('dotenv').config()
const mysql = require('mysql2')
const port =process.env.APP_PORT



const connection = mysql.createConnection({
    localhost: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

module.exports = {connection};
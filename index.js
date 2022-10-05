const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql2')
const {uuid} = require('uuidv4')
const app = express()
const port =1002


app.use(bodyParser.json())


const connection = mysql.createConnection({
    localhost: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_Name
});








app.listen(port, () => {
    console.log(`This is listening on port ${port} `)
})
require('dotenv').config();

const express = require('express');
const mysql = require('mysql');
const port = process.env.PORT || 3000;
const {v4} = require('uuid');
const app = express();

var conn = mysql.createConnection({
   host: process.env.APP_HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_NAME
});

app.use(express.json());

conn.connect();

const router = require('./router');
router(app, conn);


app.listen(port, () => console.log(`Server has been started on port ${port}`));
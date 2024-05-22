const mysql = require("mysql2");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const connection = mysql.createConnection({
  host: process.env.DATABASE_CONNECTION,
  user: "root",
  password: process.env.DATABASE_PASSWORD,
  database: "simple_blog",
});

module.exports = connection;

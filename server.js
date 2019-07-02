const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync("./database.json");
const conf = JSON.parse(data);
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});

connection.connect();

app.get("/api/user", (req, res) => {
  connection.query("SELECT * FROM USER", (err, rows, fields) => {
    res.send(rows);
  });
});

app.post("/api/login", (req, res) => {
  let sql = "SELECT * FROM USER WHERE email = ? and password = ?";

  let email = req.body.email;
  let password = req.body.password;
  let params = [email, password];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

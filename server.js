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

const multer = require("multer");
// multer는 multipart/form-data를 다루기 위한 node.js의 미들웨어
const uploadProfileImg = multer({ dest: "./upload/profileImg" });

app.get("/api/allContents", (req, res) => {
  connection.query(
    "SELECT contentID, CONTENTS.email, contentImg, content, contentDate, nickname, profileImg FROM CONTENTS, USER WHERE CONTENTS.email = USER.email",
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

app.use("/profileImg", express.static("./upload/profileImg"));

app.post(
  "/api/editProfileImg",
  uploadProfileImg.single("image"),
  (req, res) => {
    let sql = "UPDATE USER SET profileImg=? WHERE email=?";

    let image = "/profileImg/" + req.file.filename;
    let email = req.body.email;
    let params = [image, email];
    connection.query(sql, params, (err, rows, fields) => {
      res.send(err);
    });
  }
);

app.post("/api/deleteContent", (req, res) => {
  let sql = "DELETE FROM CONTENTS WHERE email = ? and contentID = ?";

  let email = req.body.email;
  let contentID = req.body.contentID;
  let params = [email, contentID];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(err);
  });
});

app.post("/api/deleteUser", (req, res) => {
  let sql = "DELETE FROM USER WHERE email = ? and password = ?";

  let email = req.body.email;
  let password = req.body.password;
  let params = [email, password];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(err);
  });
});

app.post("/api/search", (req, res) => {
  let sql =
    "SELECT contentID, CONTENTS.email, contentImg, content, contentDate, nickname, profileImg FROM CONTENTS, USER WHERE CONTENTS.email = USER.email AND (nickname LIKE ? OR content LIKE ?)";

  let value = req.body.value;
  let params = [value, value];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

app.post("/api/contents", (req, res) => {
  let sql = "SELECT * FROM CONTENTS WHERE email = ?";

  let email = req.body.email;
  let params = [email];
  connection.query(sql, params, (err, rows, fields) => {
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

app.post("/api/join", (req, res) => {
  let sql = "INSERT INTO USER VALUES (?, ?, ?, ?, null, null)";

  let email = req.body.email;
  let name = req.body.name;
  let nickname = req.body.nickname;
  let password = req.body.password;
  let params = [email, name, nickname, password];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(err);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

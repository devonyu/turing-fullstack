const express = require("express");
const os = require("os");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

dotenv.config();

const mysql = require("mysql");

// Connect to DEV SQL DBMS
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.MYSQL_PASS,
  database: "tshirtshop",
  multipleStatements: true
});

connection.connect();

connection.query("SELECT 1 + 1 AS solution", (err, rows) => {
  if (err) throw err;
  // eslint-disable-next-line no-console
  console.log("Test Query for DB => The solution is: ", rows[0].solution);
});

const app = express();
app.use(bodyParser.json());

app.use(express.static("dist"));

// Example API
app.get("/api/getUsername", (req, res) =>
  res.send({ username: os.userInfo().username })
);

// Get All products
app.get("/api/products", (req, res) => {
  connection.query("SELECT * from product;", (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});

// Get Categories
app.get("/api/categories", (req, res) => {
  connection.query("SELECT * from category;", (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});

// Get Departments
app.get("/api/departments", (req, res) => {
  connection.query("SELECT * from department;", (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});

// Get Shipping information - region information and shipping
app.get("/api/shipping", (req, res) => {
  const query = "SELECT * from shipping;SELECT * from shipping_region;";
  connection.query(query, [2, 1], (error, results) => {
    if (error) {
      throw error;
    }
    res.json(results);
  });
});

// Get Tax information
app.get("/api/tax", (req, res) => {
  connection.query("SELECT * from tax;", (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});

// Get Product Category information
app.get("/api/productCategory", (req, res) => {
  connection.query("SELECT * from product_category;", (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});

// Get Discount Code verification
app.get("/api/discount", (req, res) => {
  // examplecodes
  const validCodes = [
    { code: "friendsandfamily", discount: 10 },
    { code: "admin", discount: 75 },
    { code: "test", discount: 25 },
    { code: "holiday", discount: 30 }
  ];
  const { body } = req;
  let valid = false;
  if (
    validCodes.some(code => {
      return code.code === body.code;
    })
  ) {
    valid = true;
  }
  res.send({ discountCodeValid: valid });
});

// Post data to stripe endpoint
app.post("/api/stripe", (req, res) => {
  const { body } = req;
  body.test = "Data Recieved";
  body.orderTime = Date.now();
  res.json(body);
});

app.listen(process.env.PORT || 8080, () =>
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${process.env.PORT || 8080}!`)
);

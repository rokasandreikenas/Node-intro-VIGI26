const express = require("express");
const mysql = require("mysql2/promise");
const PORT = 8080;

const app = express();
app.use(express.json());

// missing .env file

app.get("/", async (req, res) => {
  try {
    const con = await mysql.createConnection(mysqlConfig);
    res.send("Success");
    await con.end();
  } catch (e) {
    console.log(e);
  }
});

app.get("/shirts", async (req, res) => {
  try {
    const con = await mysql.createConnection(mysqlConfig);

    const response = await con.execute(
      "SELECT * FROM defaultdb.shirts ORDER BY price ASC LIMIT 3;"
    );

    res.send(response[0]);
    await con.end();
  } catch (e) {
    console.log(e);
  }
});

app.post("/shirts", async (req, res) => {
  try {
    const con = await mysql.createConnection(mysqlConfig);

    const response = await con.execute(
      `INSERT INTO shirts (brand, model, size, price) values ('${req.body.brand}', '${req.body.model}', '${req.body.size}', ${req.body.price});`
    );

    res.send(response[0]);
    await con.end();
  } catch (e) {
    console.log(e);
  }
});

app.get("*", (req, res) => {
  res.status(404).send("Page not found:(");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

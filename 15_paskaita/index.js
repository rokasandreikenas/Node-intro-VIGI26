const express = require("express");
const mysql = require("mysql2/promise");
const PORT = 3000;

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

app.get("/items", async (req, res) => {
  try {
    const con = await mysql.createConnection(mysqlConfig);

    const limit = req.query.limit;
    console.log(mysql.escape(""));
    console.log("");

    const response = await con.execute(`SELECT * FROM items LIMIT ${limit};`);

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

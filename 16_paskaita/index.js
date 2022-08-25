const express = require("express");
const mysql = require("mysql2/promise");
require("dotenv").config();

const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.json());

const mysqlConfig = {
  host: process.env.MY_SQL_HOST,
  user: process.env.MY_SQL_USER,
  password: process.env.MY_SQL_PASSWORD,
  database: process.env.MY_SQL_DATABASE,
  port: process.env.MY_SQL_PORT,
};

app.get("/", async (req, res) => {
  try {
    const con = await mysql.createConnection(mysqlConfig);
    res.send("Success");
    await con.end();
  } catch (e) {
    console.log(e);
  }
});

app.get("/cars/:id?", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isInteger(id) || !req.params.id) {
      const con = await mysql.createConnection(mysqlConfig);
      const selectAll = "SELECT * FROM cars";
      const selectOne = `${selectAll} WHERE id=${id}`;
      const response = await con.execute(id ? selectOne : selectAll);
      res.send(response[0]);
      await con.end();
    } else {
      res.status(400).send([]);
    }
  } catch (e) {
    if (e.code === "ER_ACCESS_DENIED_ERROR") {
      res.status(401).send("Unauthorized");
    }
    console.log(e);
  }
});

app.post("/cars", async (req, res) => {
  try {
    const car = req.body;
    if (car.title && car.image && car.price && car.numberplates) {
      const con = await mysql.createConnection(mysqlConfig);

      const response = await con.execute(
        `INSERT INTO cars (title, image, price, numberplates) values (${con.escape(
          car.title
        )}, ${con.escape(car.image)}, ${con.escape(car.price)}, ${con.escape(
          car.numberplates
        )})`
      );
      console.log(response);
      res.send(response);
      await con.end();
    } else {
      res.status(400).send("Bad syntax");
    }
  } catch (e) {
    console.log(e);
  }
});

app.delete("/cars/:id", async (req, res) => {
  try {
    const con = await mysql.createConnection(mysqlConfig);
    const response = await con.execute(
      `DELETE FROM cars WHERE id=${req.params.id};`
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

const express = require("express");
const mysql = require("mysql2/promise");
const router = express.Router();

const { dbconfig } = require("../config/config");

router.get("/", async (req, res, next) => {
  try {
    const con = await mysql.createConnection(dbconfig);
    const [response] = await con.execute("SELECT * FROM articles;");
    await con.end();
    res.render("index", { header: "Blog by Rokas", articles: response });
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;

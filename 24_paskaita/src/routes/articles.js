const express = require('express');
const mysql = require('mysql2/promise');

const { dbconfig } = require('../config');
const { isLoggedIn } = require('../middleware');

const router = express.Router();

router.get('/', isLoggedIn, async (req, res) => {
  try {
    const con = await mysql.createConnection(dbconfig);
    const [response] = await con.execute('SELECT * FROM articles;');
    await con.end();
    res.send(response);
  } catch (e) {
    res.status(400).send({ error: 'Error' });
  }
});

module.exports = router;

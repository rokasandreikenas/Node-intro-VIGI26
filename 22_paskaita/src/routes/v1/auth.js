/* eslint-disable newline-per-chained-call */
const express = require('express');
const mysql = require('mysql2/promise');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { dbconfig, jwtSecret } = require('../../config');

const router = express.Router();

const userSchema = Joi.object({
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string().required(),
});

router.post('/register', async (req, res) => {
  let userData = req.body;
  // schemos validacija
  try {
    userData = await userSchema.validateAsync(userData);
  } catch (e) {
    // jeigu schema neatitinka
    res.status(400).send({ error: 'Incorrect data send' });
  }

  try {
    // jeigu schema atitiko
    const hashedPassword = bcrypt.hashSync(userData.password);
    const con = await mysql.createConnection(dbconfig);

    const response = await con.execute(
      `INSERT INTO users (email, password) values (${mysql.escape(
        userData.email,
      )}, '${hashedPassword}')`,
    );

    res.send(response[0]);
    await con.end();
  } catch (e) {
    res.status(500).send({ error: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  let userData = req.body;

  try {
    userData = await userSchema.validateAsync(userData);
  } catch (e) {
    res.status(400).send({ error: 'Incorect data ' });
  }

  try {
    const con = await mysql.createConnection(dbconfig);

    const [response] = await con.execute(
      `SELECT * FROM users WHERE email = ${mysql.escape(userData.email)}`,
    );

    await con.end();

    if (response.length === 0) {
      res.status(400).send({ error: 'Incorrect email' });
    }

    const isAuthed = bcrypt.compareSync(
      userData.password,
      response[0].password,
    );

    if (isAuthed) {
      const token = jwt.sign(
        { id: response[0].id, email: response[0].email },
        jwtSecret,
      );

      res.send({ token });
    } else {
      res.status(400).send({ error: 'Incorrect password' });
    }
  } catch (e) {
    res.status(500).send({ error: 'Server error' });
  }
});

module.exports = router;

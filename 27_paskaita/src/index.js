const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const fetch = require('node-fetch');

const { port, dbconfig } = require('./config');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
  try {
    const randomUsers = await fetch('https://randomuser.me/api/');
    const randomUsersResponse = await randomUsers.json();
    const firstName = randomUsersResponse.results[0].name.first;

    const con = await mysql.createConnection(dbconfig);
    await con.execute(
      `INSERT INTO names (name) values (${mysql.escape(firstName)})`,
    );
    const [response] = await con.execute('SELECT * FROM names;');
    await con.end();
    res.send(response);
  } catch (e) {
    console.log(e);
    res.status(400).send({ error: 'Error' });
  }
});

app.all('*', (req, res) => {
  res.status(404).send({ error: 'Page not found' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

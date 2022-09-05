const express = require('express');
const cors = require('cors');

const { port } = require('./config');
const { auth, articles } = require('./routes');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth/', auth);
app.use('/articles/', articles);

app.get('/', (req, res) => {
  res.send({ msg: 'Server is running' });
});

app.all('*', (req, res) => {
  res.status(404).send({ error: 'Page not found' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

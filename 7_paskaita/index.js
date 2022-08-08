const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8080;
const uri = `mongodb+srv://admin:${process.env.PASSWORD}@vigi26intro.b1gybws.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri);

app.get("/", async (req, res) => {
  try {
    const con = await client.connect(); // atidarom prisijungima
    const data = await con.db("demo1").collection("cars").find().toArray(); // pasiimam duomenis
    await con.close(); // uzdarom prisijungima
    return res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.listen(port, () => console.log(`Server is running on port ${port}`));

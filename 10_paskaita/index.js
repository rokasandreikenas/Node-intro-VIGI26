const express = require("express"); // importas
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express(); // sukuriama aplikacija
app.use(cors());
app.use(express.json()); // musu informacija gristu json formatu

const PORT = process.env.PORT || 8080;
const uri = process.env.CONNECTION;

const client = new MongoClient(uri);

app.delete("/users/:id", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("10paskaita")
      .collection("users")
      .deleteOne({ _id: ObjectId(req.params.id) });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

// app.delete("/users/:email", async (req, res) => {
//   try {
//     const con = await client.connect();
//     const data = await con
//       .db("10paskaita")
//       .collection("users")
//       .deleteOne({ email: req.params.email });
//     await con.close();
//     res.send(data);
//   } catch (error) {
//     res.status(500).send({ error });
//   }
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

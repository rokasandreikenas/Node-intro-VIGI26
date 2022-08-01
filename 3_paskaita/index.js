const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

// "/" - base path (pagrindinis) pvz.: localhost:3000/
// req - sutrumpinimas request žodžio. Kvietimas iš vartotojo pusės.
// res - sutrumpinimas response žodžio. Grąžinimas iš serverinės dalies.

app.get("/", (req, res) => {
  res.send(["BMW", "Audi", "VW"]);
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("OK");
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

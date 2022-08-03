const express = require("express");
const cors = require("cors");

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(cors());

const names = [{ name: "Rokas", surname: "Andreikenas" }];

app.get("/names", (req, res) => {
  res.send(names);
});

app.post("/names", (req, res) => {
  names.push(req.body);
  res.send(req.body);
});

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);

// prisideti importus reikalingus express serveriui +
// susikurti express serveri +
// susikurti API su "/users" path kuris grazins users masyva +
// susikurti API su "/links" path kuris grazins links masyva +
// paleisti serveri +

// sukurti POST API vartotojams, kuris pridės naują vartotoją į masyvą
// sukurti POST API vartotojams, kuris pridės naują linką į masyvą

const express = require("express");
const cors = require("cors");

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(cors());

const users = ["admin"];

app.get("/users", (req, res) => {
  res.send(users);
});

const links = ["https://www.google.lt/"];

app.get("/links", (req, res) => {
  res.send(links);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

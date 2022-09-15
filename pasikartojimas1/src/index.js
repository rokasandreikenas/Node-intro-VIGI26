// 1. Susikurti package.json ir užsipildyti jį {"title": "title", "scripts": {"start": "nodemon ./src/index.js"}}
// 1.2 Susikurti atitinkama failų stuktūrą: /src folderis, /src/routes folderis, /src/config.js failas
// 2. Susikurti index.js src folderyje
// 3. Suintstaliuoti packagus (node modulius) - npm express mysql2 dotenv cors
// 4. Instaliuoti nodemon kaip dev moduli. npm install nodemon --save-dev
// 5. Importuoti reikiamus modulius require("module")
// 6. Susikonfiguruoti index.js failą ir pasileisti serverį.
// 7. Susikonfiguruoti /src/config.js failą ir .env failą
// 8. Susitikrinti Duomenų bazės pavadinimą .env faile
// 9. Susikurti atitinkamus routes pagal projekto poreikius pvz.: routes/users.js
// 9.2 Importuoti express ir susikurti kintamąjį. const router = express.Router();
// 9.3 Pasirašyti routus ir išeksportuoti router. module.exports = router;
// 10. Pasirašyti route kuris grąžins, jog serveris veikia app.get('/', ...) index.js faile
// 11. Pasirašyti route kuris grąžins 404 ir Error not found, jeigu path neranda app.all('*', ...) index.js faile

// !!! Nepamiršti susikurti duomenų bazės MySQL arba MongoDB su atitinkamomis struktūromis, lentelėmis ir tipais.

const express = require("express");
const cors = require("cors");

const app = express(); // Express inicializavimas
app.use(express.json()); // Kai daromas POST, pareitu JSON formatu
app.use(cors()); // Apsauga

const { port } = require("./config"); // ./ tam paciam folderyje, ../ atgal vienu folderiu

const products = require("./routes/products");

// localhost:3000/products
app.use("/products/", products);

// localhost:3000/
app.get("/", (req, res) => {
  res.send({ message: "Server is running" });
});

app.all("*", (req, res) => {
  res.status(404).send({ error: "Page not found" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// 1. Susikurti package.json ir užsipildyti jį {"title": "title", "scripts": {"start": "nodemon index.js"}}
// 1.2 Susikurti atitinkama failų stuktūrą: /src folderis, /src/routes folderis, /src/config.js failas
// 2. Susikurti index.js src folderyje
// 3. Suintstaliuoti packagus (node modulius) - npm
// 4. Instaliuoti nodemon kaip dev moduli. npm install nodemon --save-dev
// 5. Importuoti reikiamus modulius require("module")
// 6. Susikonfiguruoti index.js failą ir pasileisti serverį.
// 7. Susikonfiguruoti /src/config.js failą ir .env failą
// 8. Susitikrinti Duomenų bazės pavadinimą .env faile

const express = require("express");
const cors = require("cors");

const app = express(); // Express inicializavimas
app.use(express.json()); // Kai daromas POST, pareitu JSON formatu
app.use(cors()); // Apsauga

const { port } = require("./config"); // ./ tam paciam folderyje, ../ atgal vienu folderiu

app.get("/", async (req, res) => {
  try {
    const con = await mysql.createConnection(mysqlConfig); // prisijungiam

    const [response] = await con.execute("SELECT * FROM shirts;"); // padarom query - kvieciam is duomenu bazes

    res.send(response); // grazinam atsakyma
    await con.end(); // uzdarom prisijungina
  } catch (e) {
    console.log(e); // jeigu erroras
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

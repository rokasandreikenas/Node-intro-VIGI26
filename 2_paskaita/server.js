const http = require("http");

const hostname = "127.0.0.1";
const port = 3001;

const users = [
  { name: "Rokas", password: "rokas123" },
  { name: "Tomas", password: "tomas123" },
];

const movies = [
  { name: "Nemo", hours: 2 },
  { name: "Avatar", hours: 3 },
];

const server = http.createServer((req, res) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  res.writeHead(200, headers);

  switch (req.url) {
    case "/users":
      res.write(JSON.stringify(users));
      res.end();
      break;
    case "/movies":
      res.write(JSON.stringify(movies));
      res.end();
      break;
    default:
      res.write(JSON.stringify([]));
      res.end();
  }
});

server.listen(port, hostname, () => {
  console.log(`Serveris paleistas http://${hostname}:${port}/`);
});

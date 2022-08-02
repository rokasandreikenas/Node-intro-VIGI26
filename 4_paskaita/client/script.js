fetch("http://localhost:8080/users")
  .then((resp) => resp.json())
  .then((response) => {
    console.log(response);
  })
  .catch((error) => console.log(error));

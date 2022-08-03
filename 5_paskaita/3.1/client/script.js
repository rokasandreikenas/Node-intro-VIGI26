fetch("http://localhost:8080/names")
  .then((resp) => resp.json())
  .then((response) => {
    console.log(response);
    const ul = document.createElement("ul");

    response.forEach((name) => {
      const li = document.createElement("li"); // <li> </li>
      li.textContent = name; // <li>Rokas</li>
      ul.append(li); // <ul><li>Rokas</li></ul>
    });

    document.body.append(ul);
  })
  .catch((error) => console.error(error));

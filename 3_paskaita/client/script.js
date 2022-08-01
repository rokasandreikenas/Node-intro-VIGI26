fetch("http://localhost:8080/")
  .then((resp) => resp.json())
  .then((response) => {
    const ul = document.createElement("ul");

    response.forEach((car) => {
      const li = document.createElement("li");
      li.textContent = car;
      ul.append(li);
    });

    document.body.append(ul);
  })
  .catch((error) => console.error(error));

fetch("http://localhost:8080/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(["Rokas"]),
});

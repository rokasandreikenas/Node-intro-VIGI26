const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const nameInput = document.querySelector("input[name=name]");
  console.log(nameInput.value);

  const nameObject = { name: nameInput.value };
  console.log(nameObject);
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nameObject),
  };

  fetch("http://localhost:8080/names", options)
    .then((resp) => resp.json())
    .then((response) => {
      console.log(response);
    })
    .catch((error) => console.error(error));
});

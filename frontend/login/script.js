function signin() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const data = {
    email: email,
    password: password,
  };
  console.log(data)
  fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((json) => {
      if (json.success) {
        console.log("hii");
        alert(json.message);
        window.location.href = "/contactMe/index.html";
      }
    })
    .catch((error) => {
      alert("An error occurred.");
    });
}

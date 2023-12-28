function signup() {
    const username = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const data = {
        name: username,
        email: email,
        password: password
    };
    fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(json => {
            if (json.success) {
                alert(json.message);
                window.location.href = "/login/index.html";
            } else {
                alert("Incorrect data");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Something went wrong');
        });
    
}

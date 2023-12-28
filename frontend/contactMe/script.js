function submitForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    const data = {
        name:name,
        email: email,
        phone: phone,
        message:message
    };
    console.log(data);
    fetch('http://localhost:3000/contact', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(json => {
        if (json.success) {
           alert("Thank You")
           window.location.href = "/index.html";
        }else{
            throw new Error("Error in subbmitting you request")
        }
    })
    .catch(error => {
        alert('An error occurred');
    });
}

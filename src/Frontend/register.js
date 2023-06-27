window.onload = function () {
    document.getElementById("register_button").addEventListener("submit", function (event) {
        event.preventDefault()
        const username = document.getElementById("register_username_input")
        const password = document.getElementById("register_password_input")
        const myOptions = {method: "POST", body: JSON.stringify({"username": username, "password": password})}
        fetch("/register", myOptions).then(response => {
            //response.send(username)
        })
    })
}

/*
const Cookies = require('js-cookie')
async function performRegister() {
    let data = {}
    let newUsername = document.getElementById("register_username_input").value
    let newPassword = document.getElementById("register_password_input").value
    let newEmail = "test@test.com"
    data = {name: newUsername, email: newEmail, password: newPassword}

    /!*fetch('http://localhost:3000/register', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    }).then(resolve => {

            if (resolve.status === 200) {
                Cookies.set("token", data.token);
                alert("login Succesfull");

            } else if (resolve.status === 401 || resolve.status === 400) {
                alert("Wrong username or Password!");
            }
        window.location.href = window.location.origin
    })*!/

    const response = await fetch("/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
    });

    const responseData = await response.json();

    if (response.status === 201) {
        Cookies.set("token", responseData.token);
        alert("login Succesfull");
    } else if (response.status === 401 || response.status === 400) {
        alert("Wrong username or Password!");
    }
}

*/

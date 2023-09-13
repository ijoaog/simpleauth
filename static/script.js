function fetchLoginData() {
    return fetch('loginData.json')
        .then(response => response.json())
        .catch(error => {
            console.error('Erro ao carregar o arquivo:', error);
            return [];
        });
}

async function login() {
    const enteredUsername = document.getElementById("username").value;
    const enteredPassword = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");
    const sucessMessage = document.getElementById("sucess-message");

    const loginData = await fetchLoginData();

    const foundUser = loginData.find(user => user.login === enteredUsername && user.senha === enteredPassword);

    if (foundUser) {
        sucessMessage.textContent = "Bem-vindo, usuário!";
        errorMessage.textContent = "";
    } else {
        sucessMessage.textContent = "";
        errorMessage.textContent = "Login ou senha incorretos.";
    }
}

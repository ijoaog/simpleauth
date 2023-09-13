function fetchLoginData() {
    return fetch('loginData.json')
        .then(response => response.json())
        .catch(error => {
            console.error('Erro ao carregar o arquivo:', error);
            return [];
        });
}

const maxFailedAttempts = 4;
const blockDuration = 10000; // 1 minuto em milissegundos

async function login() {
    const enteredUsername = document.getElementById("username").value;
    const enteredPassword = document.getElementById("password").value;
    const loginButton = document.getElementById("login-button"); // O botão de login
    const errorMessage = document.getElementById("error-message");
    const successMessage = document.getElementById("success-message");

    const loginData = await fetchLoginData();

    let failedAttempts = parseInt(localStorage.getItem('failedLoginAttempts')) || 0;

    const foundUser = loginData.find(user => user.login === enteredUsername && user.senha === enteredPassword);

    if (failedAttempts >= maxFailedAttempts) {
        errorMessage.textContent = "Conta bloqueada. Tente novamente mais tarde.";
        localStorage.setItem('failedLoginAttempts',0);
        loginButton.disabled = true; // Desativa o botão de login

        let remainingTime = blockDuration / 1000; // Converte para segundos

        const countdownInterval = setInterval(() => {
            errorMessage.textContent = `Conta bloqueada. Aguarde ${remainingTime} segundos.`;
            remainingTime--;
            if (foundUser){
                successMessage.textContent = "Bem-vindo, usuário!";
                errorMessage.textContent = "";
                resetFailedLoginAttempts(); // Reseta as tentativas após um login bem-sucedido.
            }

            if (remainingTime < 0) {
                clearInterval(countdownInterval);
                errorMessage.textContent = "";
                loginButton.disabled = false; // Reativa o botão após o período de bloqueio
            }
        }, 1000);

        return;
    }

    

    if (foundUser) {
        successMessage.textContent = "Bem-vindo, usuário!";
        errorMessage.textContent = "";
        resetFailedLoginAttempts(); // Reseta as tentativas após um login bem-sucedido.
    } else {
        incrementFailedLoginAttempts();
        successMessage.textContent = "";
        errorMessage.textContent = "Login ou senha incorretos.";
    }
}

function incrementFailedLoginAttempts() {
    const failedAttempts = parseInt(localStorage.getItem('failedLoginAttempts')) || 0;
    localStorage.setItem('failedLoginAttempts', failedAttempts + 1);
}

function resetFailedLoginAttempts() {
    localStorage.setItem('failedLoginAttempts',0);
    //localStorage.removeItem('failedLoginAttempts');
}

// Limpa o contador de tentativas ao carregar a página (caso seja uma nova sessão).
resetFailedLoginAttempts();

// Definir o nome de usuário e senha fixos para fins de demonstração
const validUsername = "admin";
const validPassword = "1234";

document.getElementById('form-login').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === validUsername && password === validPassword) {
        // Exibe as questões e remove o blur
        const questaoContainer = document.getElementById('questao-container');
        questaoContainer.style.display = 'block';
        questaoContainer.classList.remove('blur'); // Remove a classe blur

        document.getElementById('login-form').style.display = 'none';
        document.getElementById('login-message').textContent = 'Login bem-sucedido! Agora você pode acessar as questões.';
        document.getElementById('login-message').style.color = 'green';
    } else {
        // Exibe mensagem de erro
        document.getElementById('login-message').textContent = 'Usuário ou senha incorretos. Tente novamente.';
        document.getElementById('login-message').style.color = 'red';
    }
});

// Avaliar respostas e salvar no localStorage
let quizCompleted = false; // Variável para controlar se a avaliação foi completada

document.getElementById('questao-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Se a avaliação já foi completada, não faz nada
    if (quizCompleted) {
        return;
    }

    // Respostas corretas
    const respostasCorretas = {
        questao1: "falso",
        questao2: "verdadeiro",
        questao3: "falso"
    };

    let pontuacao = 0;
    const respostasUsuario = new FormData(this);

    for (let [questao, resposta] of respostasUsuario.entries()) {
        if (resposta === respostasCorretas[questao]) {
            pontuacao++;
        }
    }

    const resultado = document.getElementById('resultado');
    const totalQuestões = Object.keys(respostasCorretas).length;
    const percentual = (pontuacao / totalQuestões) * 100;

    resultado.innerHTML = `<h3>Você acertou ${pontuacao} de ${totalQuestões} questões (${percentual.toFixed(2)}%)</h3>`;

    // Verifica se o percentual é igual ou maior que 66%
    if (percentual >= 66) {
        resultado.innerHTML += `<p>Você acertou 66% ou mais. As questões estão travadas agora.</p>`;
        quizCompleted = true; // Marca a avaliação como completada
        document.getElementById('questao-form').style.display = 'none';
    } else if (percentual >= 80) {
        resultado.innerHTML += `<p>Parabéns! Você obteve a pontuação necessária para o certificado.</p>`;
        setTimeout(() => {
            window.location.href = 'pag4.html'; // Mude para a página desejada
        }, 2000); // Aguardar 2 segundos antes do redirecionamento
    } else {
        resultado.innerHTML += `<p>Você precisa de pelo menos 66% de acerto. Tente novamente!</p>`;
    }
});

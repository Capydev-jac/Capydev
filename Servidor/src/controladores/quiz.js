// Função para redirecionar para o login
function redirecionarParaLogin() {
    window.location.href = "/login"; // Altere para a rota correta
}

// Função para verificar login
function verificarLogin() {
    const token = localStorage.getItem('token');

    if (token) {
        // Se o usuário estiver logado, exibe o botão para questões
        document.getElementById('tbquestionario').style.display = 'block';
    } else {
        // Se não estiver logado, exibe o botão de login
        document.getElementById('login-button').style.display = 'block';
    }
}

// Função para exibir questões
function exibirQuestoes() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert("Faça login para acessar as questões.");
        return;
    }

    // Exibir questões ao chamar a API
    fetch('http://localhost:3000/api/questoes', {
        headers: {
            'Authorization': `Bearer ${token}` // Token enviado para autenticação
        }
    })
    .then(response => response.json())
    .then(data => {
        const questoesContainer = document.getElementById("questoes-container");
        questoesContainer.innerHTML = ""; // Limpa o conteúdo anterior

        if (data && data.questoesPorPagina) {
            Object.keys(data.questoesPorPagina).forEach(pagina => {
                const questoes = data.questoesPorPagina[pagina];
                questoes.forEach(questao => {
                    const questaoDiv = document.createElement("div");
                    questaoDiv.innerHTML = `
                        <p><strong>Página ${pagina}:</strong> ${questao.questoes}</p>
                        <p>Resposta: ${questao.respostas}</p>
                    `;
                    questoesContainer.appendChild(questaoDiv);
                });
            });
        } else {
            questoesContainer.innerHTML = "<p>Nenhuma questão disponível.</p>";
        }
    })
    .catch(error => console.error("Erro ao carregar questões:", error));
}

// Chamar a função ao carregar a página
document.addEventListener('DOMContentLoaded', verificarLogin);

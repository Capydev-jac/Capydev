const urlbase = "http://localhost:3000";
let paginaAtual = 1; // Página inicial
const totalPaginas = 8; // Total de páginas disponíveis no banco

// Função para buscar questões de uma página específica
async function buscarQuestoes(pagina) {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Você precisa estar logado para acessar esta página.");
    window.location.href = "index.html";
    return;
  }

  try {
    const response = await fetch(`${urlbase}/questoes?pagina=${pagina}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      if (response.status === 404) {
        alert("Nenhuma questão encontrada para esta página.");
      } else {
        alert("Erro ao carregar questões. Faça login novamente.");
        localStorage.removeItem("token");
        window.location.href = "index.html";
      }
      return;
    }

    const data = await response.json();
    renderizarQuestoes(data.questoes);
    atualizarPaginacao();
  } catch (error) {
    console.error("Erro ao buscar questões:", error);
  }
}

// Função para renderizar questões na página
function renderizarQuestoes(questoes) {
  const container = document.getElementById("questoes-container");
  container.innerHTML = ""; // Limpa questões anteriores

  questoes.forEach((questao) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p>${questao.enunciado}</p>
      <div>
        <input type="radio" name="questao-opcao-${questao.idquestao}" value="true" id="verdadeiro-${questao.idquestao}">
        <label for="verdadeiro-${questao.idquestao}">Verdadeiro</label>
        <input type="radio" name="questao-opcao-${questao.idquestao}" value="false" id="falso-${questao.idquestao}">
        <label for="falso-${questao.idquestao}">Falso</label>
      </div>
    `;
    container.appendChild(div);
  });
}

// Função para atualizar o estado dos botões de paginação
function atualizarPaginacao() {
  document.getElementById("pagina-atual").textContent = `Página: ${paginaAtual}`;
  document.getElementById("anterior").disabled = paginaAtual === 1;
  document.getElementById("proximo").disabled = paginaAtual === totalPaginas;
}

// Eventos dos botões de paginação
document.getElementById("anterior").addEventListener("click", () => {
  if (paginaAtual > 1) {
    paginaAtual--;
    buscarQuestoes(paginaAtual);
  }
});

document.getElementById("proximo").addEventListener("click", () => {
  if (paginaAtual < totalPaginas) {
    paginaAtual++;
    buscarQuestoes(paginaAtual);
  }
});

// Logout
document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("token");
  alert("Logout realizado com sucesso!");
  window.location.href = "index.html";
});

// Carregar questões da página inicial ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  buscarQuestoes(paginaAtual);
});

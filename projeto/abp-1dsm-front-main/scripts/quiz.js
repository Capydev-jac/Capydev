document.getElementById("btn-fetch-quiz").addEventListener("click", async () => {
  const pageNumber = 1;
  const token = localStorage.getItem('authToken');

  try {
      const response = await fetch(`/questao/${pageNumber}`, {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
          }
      });

      console.log("Status da resposta:", response.status);

      if (response.ok) {
          const questoes = await response.json();
          console.log("Questões recebidas:", questoes);

          if (Array.isArray(questoes)) {
              exibirQuestoes(questoes);
          } else {
              console.error("A resposta não é um array:", questoes);
              alert("Erro: A resposta da API não está no formato esperado.");
          }
      } else {
          const erro = await response.json();
          console.error("Erro ao buscar questões:", erro);
          alert(erro.erro || "Erro ao buscar questões");
      }
  } catch (error) {
      console.error('Erro ao fazer requisição:', error);
      alert("Erro ao buscar questões.");
  }
});

function exibirQuestoes(questoes) {
  const quizContainer = document.getElementById('quiz-container');
  quizContainer.innerHTML = ''; // Limpa as questões anteriores, se houver

  if (Array.isArray(questoes)) {
      questoes.forEach((questao, index) => {
          const questionHtml = `
              <div class="quiz__question">
                  <p><span class="quiz__question__number">${index + 1}.</span> ${questao.questoes}</p>
                  <div class="quiz__question__option">
                      <input type="radio" id="question_${index + 1}--v" name="question_${index + 1}" value="v">
                      <label for="question_${index + 1}--v">Verdadeiro</label>
                  </div>
                  <div class="quiz__question__option">
                      <input type="radio" id="question_${index + 1}--f" name="question_${index + 1}" value="f">
                      <label for="question_${index + 1}--f">Falso</label>
                  </div>
              </div>
          `;
          quizContainer.insertAdjacentHTML('beforeend', questionHtml);
      });
  } else {
      console.error("A variável 'questoes' não é um array válido.");
  }
}

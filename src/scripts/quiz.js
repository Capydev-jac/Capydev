"use strict";

/* ---------------- VARIÁVEIS ------------------ */

let DOM_checkedRadioInputs;
let score = 0; /* vai ser um numero de 0 a 3 */
let userAnswers = [];


/* --------------------------- FUNÇÕES --------------------------- */
function getUserAnswers() {
  DOM_checkedRadioInputs.forEach((radioInput) => userAnswers.push(radioInput.value)); /* itera sobre os círculos checados e extrai o valor */ 
}

function blockQuiz() {
   DOM_quizSubmitButton.style.backgroundColor = "slategray";
   DOM_quizSubmitButton.disabled = "true";
   DOM_quiz.style.pointerEvents = "none";
   DOM_quiz.style.opacity = "0.6";

   DOM_quiz.insertAdjacentHTML("beforeend", `<div class="quiz__result quiz__result--passed">Aprovado!</div>`); 
}

function checkUserAnswers() {
  userAnswers.forEach((answer, index) => {
    const label = Array.from(document.querySelectorAll(".quiz__question label")).find((label) => label.getAttribute("for") === DOM_checkedRadioInputs[index].getAttribute("id"));

    if (answer === correctAnswers[`pag0${pageNumber}`][index]) {
      score++;
      label.insertAdjacentHTML("afterend", `<span class="quiz__answer-marker"> ✅ </span>`);
    } else {
      label.insertAdjacentHTML("afterend", `<span class="quiz__answer-marker"> ❌ </span>`);
    }
  });

  checkIfUserPassed();


  /* func aux */
  function checkIfUserPassed() {
   if (score >= 2) {
    blockQuiz();
    saveQuizState();
   } else {
    /* bloqueia o botão */
    DOM_quizSubmitButton.style.backgroundColor = "slategray"; 
    DOM_quizSubmitButton.style.pointerEvents = "none";

    /* depois de 2 segundos, reseta o quiz para a próxima tentativa */
    setTimeout(() => {
      resetQuiz();
    }, 2000)
   }

    /* salvar "estado" de aprovação no localStorage */
    function saveQuizState() {
      const userObj = JSON.parse(localStorage.getItem("currentUser"));
      userObj.passedQuizzes[`page${pageNumber}`] = {
        pageTitle: document.title,
        userAnswers: userAnswers,
        checkedRadioIds: DOM_checkedRadioInputs.map((radioInput) => radioInput.getAttribute("id")),
        score,
      }
      localStorage.setItem("currentUser", JSON.stringify(userObj));
    }
  }
}

function restoreQuizState() {
  if (!localStorage.getItem("currentUser")) return;
  /* caso o usuário já tenha sido aprovado, essa função restaura o estado do quiz (bloqueado, com mensagem de aprovado, opções assinaladas, etc.) */
  const userObj = JSON.parse(localStorage.getItem("currentUser"));
  const quizObj = userObj.passedQuizzes[`page${pageNumber}`];
  if (!quizObj) return;

  /* assinala as opções por meio da comparação do array de Ids restaurados e os Ids das opções da página */
  /* além disso, atualiza a variável DOM_checkedRadioInputs, o que é necessário para colocar os markers corretamente */
  DOM_checkedRadioInputs = Array.from(document.querySelectorAll('input[type="radio"]')).filter((radioInput) => quizObj.checkedRadioIds.includes(radioInput.getAttribute("id")));
  DOM_checkedRadioInputs.forEach((radioInput) => radioInput.checked = true);

  /* restaura as respostas do usuário */
  userAnswers = quizObj.userAnswers;
  
  /* chama a função de checagem que bloqueia o quiz e etc.*/
  checkUserAnswers();
}

function resetQuiz() {
  /* reativa o botão */
  DOM_quizSubmitButton.style = "";

  /* remove os markers */
  Array.from(document.querySelectorAll(".quiz__answer-marker")).forEach((marker) => marker.remove());
  Array.from(document.querySelectorAll('input[type="radio"]')).forEach((radio) => radio.checked = false);
  /* zera a pontuação */
  score = 0;

  /* limpa o array de respostas do usuário */
  userAnswers = [];
}
/* ----------------- FIM DO BLOCO DE FUNÇÕES ---------------------- */


/* EVENT LISTENERS!!! */
DOM_quizSubmitButton.addEventListener("click", (e) => {
  e.preventDefault();
  
  DOM_checkedRadioInputs = Array.from(document.querySelectorAll('input[type="radio"]')).filter((input) => input.checked); /* querySelectorAll pega tudo de cima pra baixo, ordem já vai estar correta */

  if (DOM_checkedRadioInputs.length !== 3) return; /* só faz a checagem se o usuário tiver respondido todas as questões*/
  getUserAnswers();
  checkUserAnswers();
})



/* INIT */

restoreQuizState(); /* chamada automaticamente quando a página carrega */
/* se o usuário não foi aprovado no tópico antes, a função não faz nada */

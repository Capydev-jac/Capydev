"use strict";

const DOM_quizSubmitButton = document.querySelector(".quiz > form > button"); 

let DOM_checkedRadioInputs;

const pageNumber = document.getElementById("question_1--v").getAttribute("name").split("_")[1].slice(0, 2);

const correctAnswers = {
  "pag02": ["f", "v", "v"],
  "pag03": ["v", "v", "v"],
  "pag04": ["f", "v", "f"],
  "pag05": ["f", "v", "v"],
  "pag06": ["v", "f", "v"],
  "pag07": ["v", "f", "v"],
  "pag08": ["f", "f", "v"],
}

let score = 0; /* vai ser um numero de 0 a 3 */
let userAnswers = [];

/* funções */
function getUserAnswers() {
  console.log(DOM_checkedRadioInputs);
  DOM_checkedRadioInputs.forEach((radioInput) => userAnswers.push(radioInput.value)); /* itera sobre os círculos checados e extrai o valor */ 
  console.log(userAnswers);
}

function checkUserAnswers() {
  userAnswers.forEach((answer, index) => {
    const label = Array.from(document.querySelectorAll(".quiz__question label")).find((label) => label.getAttribute("for") === DOM_checkedRadioInputs[index].getAttribute("id"));

    if (answer === correctAnswers[`pag${pageNumber}`][index]) {
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
     DOM_quizSubmitButton.style.backgroundColor = "slategray";
     DOM_quizSubmitButton.disabled = "true";
     DOM_quiz.style.pointerEvents = "none";
     DOM_quiz.style.opacity = "0.6";

     DOM_quiz.insertAdjacentHTML("beforeend", `<div class="quiz__result quiz__result--passed">Aprovado!</div>`); 
    } 
  }
}

function clear() {
  /* remove os markers */
  Array.from(document.querySelectorAll(".quiz__answer-marker")).forEach((marker) => marker.remove());

  /* zera a pontuação */
  score = 0;

  /* limpa o array de respostas do usuário */
  userAnswers = [];
}


DOM_quizSubmitButton.addEventListener("click", (e) => {
  e.preventDefault();
  clear(); /* caso o usuário esteja refazendo o quiz na mesma sessão */
  
  DOM_checkedRadioInputs = Array.from(document.querySelectorAll('input[type="radio"]')).filter((input) => input.checked); /* querySelectorAll pega tudo de cima pra baixo, ordem já vai estar correta */

  getUserAnswers();
  checkUserAnswers();
})

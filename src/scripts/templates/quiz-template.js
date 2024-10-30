"use strict";

/* pageNumber definido em nav-bar-articles.js */

function genQuiz(pageNumber, pageTitle) {
    const quizQuestions = questions[`pag0${pageNumber}`];

    let html = `
    <section class="quiz">
        <div class="quiz__overlay">Entre com a sua conta para ter acesso ao questionário!</div>
        <h2>Avaliação: ${pageTitle}</h2>
        <p>Em conformidade com o que foi exposto até aqui, analise a veracidade das seguintes afirmativas:</p>
        <form>
      <div class="quiz__question">
        <p><span class="quiz__question__number">1.</span> ${quizQuestions[0]}</p>
        <div class="quiz__question__option">
          <input type="radio" id="question_1--v" name="question_02.1" value="v">
          <label for="question_1--v">Verdadeiro</label>
        </div>
        <div class="quiz__question__option">
          <input type="radio" id="question_1--f" name="question_02.1" value="f">
          <label for="question_1--f">Falso</label>
        </div>
      </div>

      <div class="quiz__question">
        <p><span class="quiz__question__number">2.</span> ${quizQuestions[1]}</p>
        <div class="quiz__question__option">
          <input type="radio" id="question_2--v" name="question_02.2" value="v">
          <label for="question_2--v">Verdadeiro</label>
        </div>
        <div class="quiz__question__option">
          <input type="radio" id="question_2--f" name="question_02.2" value="f">
          <label for="question_2--f">Falso</label>
        </div>
      </div>

      <div class="quiz__question">
        <p><span class="quiz__question__number">3.</span> ${quizQuestions[2]}</p>
        <div class="quiz__question__option">
          <input type="radio" id="question_3--v" name="question_02.3" value="v">
          <label for="question_3--v">Verdadeiro</label>
        </div>
        <div class="quiz__question__option">
          <input type="radio" id="question_3--f" name="question_02.3" value="f">
          <label for="question_3--f">Falso</label>
        </div>
      </div>
      <button>Submeter</button>
        </form>
    </section>
    `

    document.querySelector(".nav-alt").insertAdjacentHTML("beforebegin", html);
}


/* INIT */
genQuiz(pageNumber, document.title);


/* VARIÁVEIS */
const DOM_quiz = document.querySelector(".quiz");
const DOM_quizOverlay = document.querySelector(".quiz__overlay");
const DOM_quizSubmitButton = document.querySelector(".quiz > form > button");


function unlockQuiz() {
  DOM_quizOverlay.remove();
  DOM_quiz.style.pointerEvents = "initial";
}

if (currentUser) unlockQuiz();
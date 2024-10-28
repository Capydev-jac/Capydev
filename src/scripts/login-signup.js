"use strict"

let currentUser = localStorage.getItem("currentUser");

/* contas de teste */
const accounts = [
  {name: "João", surname: "Silva", email: "joao@fatec.sp.gov.br", password: "capydev"},
  {name: "Lucas", surname: "Soares", email: "lucas@fatec.sp.gov.br", password: "fatec"},
]

/* DOM elements */
const DOM_overlay = document.querySelector(".overlay");
const DOM_loginModal = document.querySelector(".login-component");
const DOM_logoffButton = document.querySelector(".profile__logoff");
const DOM_signupModal = document.querySelector(".signup-component");
const DOM_profileModal = document.querySelector(".profile-component");
const DOM_closeButtons = document.querySelectorAll(".close-button");
const DOM_registerRedirectButton = document.querySelector(".register-redirect__button");
const DOM_loginRedirectButton = document.querySelector(".login-redirect__button");
const DOM_navLogin = document.querySelector(".nav__login");
const DOM_loginButton = document.querySelector(".login-component button");
const DOM_loginEmailField = document.getElementById("login__email");
const DOM_loginPasswordField = document.getElementById("login__password");
const DOM_headerUser = document.querySelector(".nav__login > span");
const DOM_quiz = document.querySelector(".quiz");
const DOM_quizOverlay = document.querySelector(".quiz__overlay");
const DOM_headerPictureContainer = document.querySelector(".nav__login > div");
const DOM_headerPicture = document.querySelector(".nav__login > div > img");
const DOM_profileName = document.querySelector(".profile__name");


/* loga o usuário após submissão de user e password na modal de login */
/* só é executada quando o loginButton é clicado */
function login() {
  const userObj = accounts.find((obj) => DOM_loginEmailField.value === obj.email);
  if (!userObj) return;
  if (userObj.password !== DOM_loginPasswordField.value) return;
  localStorage.clear();
  localStorage.setItem("currentUser", JSON.stringify(userObj)); // adiciona o user logado no cachê do browser
  location.reload(); // recarrega a página
}

function logoff() {
  localStorage.clear();
  location.reload();
}

/* caso haja usuário logado, faz todas as modificações necessárias na página */
function getCurrentUser() {
  if (!currentUser) return; /* caso ninguém esteja logado, não faça nada */
  const currentUserObj = JSON.parse(currentUser); /* converte a string JSON do localStorage pra objeto javascript utilizável */
  
  updateUserInfo();

  if (!DOM_quiz) return; /* caso a página não tenha questionário, não faça nada */
  unlockQuiz();


  
  /* funções auxiliares, uso exclusivo interno da getCurrentUser */
  /* pode declarar depois do uso, declarações de função são hoisted */
  function updateUserInfo() {
    /* header */
    DOM_headerUser.textContent = currentUserObj.name; // atualiza o header com o nome do user logado
    DOM_headerUser.style.color = window.getComputedStyle(document.documentElement).getPropertyValue('--marrom-claro-claro-cor');
    (async function() {
      if (DOM_headerPictureContainer.dataset.context === "article") DOM_headerPicture.src = await "../../images/capy-pfp.webp";
      if (DOM_headerPictureContainer.dataset.context === "home") DOM_headerPicture.src = await "./src/images/capy-pfp.webp";
      DOM_headerPictureContainer.style.borderRadius = "19px";
    })(); 

    /* profile card */
    DOM_profileName.textContent = `${currentUserObj.name} ${currentUserObj.surname}`;
  }

  function unlockQuiz() {
    DOM_quiz.style.pointerEvents = "initial";
    DOM_quizOverlay.style.display = "none";
  }
}

getCurrentUser(); /* atualiza tudo de acordo com o usuário logado assim que o script é carregado */



/* EVENT LISTENERS!! */
/* abre a modal de login quando clica no ENTRAR do header caso usuario não esteja logado */
/* abre a janela de perfil quando clicano ENTRAR do header caso usuario já esteja logado */
DOM_navLogin.addEventListener("click", (e) => {
  e.preventDefault();
  DOM_overlay.classList.remove("hidden");
  (currentUser) ? DOM_profileModal.classList.remove("hidden") : DOM_loginModal.classList.remove("hidden");
});

DOM_logoffButton.addEventListener("click", logoff);

/* fecha as modais de login, sign up e profile ao clicar no X */
/* são dois elementos, então precisa converter a node list pra array, iterar e anexar o event listener pra cada botão */
Array.from(DOM_closeButtons).forEach((button) => {
  button.addEventListener("click", (e) => {
    DOM_overlay.classList.add("hidden");
    DOM_loginModal.classList.add("hidden");
    DOM_signupModal.classList.add("hidden");
    DOM_profileModal.classList.add("hidden");
  });
});

/* fecha o login e abre o sign up ao clicar no "cadastre-se" na modal de login */
DOM_registerRedirectButton.addEventListener("click", (e) => {
  DOM_loginModal.classList.add("hidden");
  DOM_signupModal.classList.remove("hidden");
});

/* fecha o sign up e abre o login ao clicar no "entre" na modal de sign up*/
DOM_loginRedirectButton.addEventListener("click", (e) => {
  DOM_signupModal.classList.add("hidden");
  DOM_loginModal.classList.remove("hidden");
});

/* loga + faz com que o botão não submeta o formulário */
DOM_loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  login();
})



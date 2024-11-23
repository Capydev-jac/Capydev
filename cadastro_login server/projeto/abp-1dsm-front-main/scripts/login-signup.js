"use strict";

/* --------------------------- FUNÇÕES --------------------------- */

/* limpa as mensagens de erro e afins */
function clearLoginErrorMessages() {
  const errorFields = Array.from(document.querySelectorAll(".input-error"));
  if (errorFields.length > 0) {
    errorFields.forEach((input) => input.classList.remove("input-error")); /* remove estilo de erro dos input fields */
  }

  const errorMsgs = Array.from(document.querySelectorAll(".input-error-msg"));
  if (errorMsgs.length > 0) {
    errorMsgs.forEach((msg) => msg.remove()); /* remove error msgs */
  }
}

/* loga o usuário após submissão de user e password na modal de login */
/* só é executada quando o loginButton é clicado */
function login() {
  // Garantindo que os campos do login estejam presentes antes de tentar acessá-los
  const DOM_loginEmailField = document.querySelector("#login-email");
  const DOM_loginPasswordField = document.querySelector("#login-password");

  if (!DOM_loginEmailField || !DOM_loginPasswordField) {
    console.error("Os elementos de login não foram encontrados!");
    return;
  }

  clearLoginErrorMessages();

  // Verifica se o e-mail fornecido existe em algum usuário registrado (simula a busca no banco de dados com "accounts")
  const userObj = accounts.find((obj) => DOM_loginEmailField.value === obj.email);

  /* mensagens de erro de login */
  if (!userObj) {
    DOM_loginEmailField.classList.add("input-error");
    DOM_loginPasswordField.value = ''; // Limpa a senha no campo
    DOM_loginEmailField.insertAdjacentHTML('afterend', `<div class="input-error-msg">O e-mail fornecido não foi registrado.</div>`);
    return;
  }
  if (userObj.password !== DOM_loginPasswordField.value) {
    DOM_loginPasswordField.classList.add("input-error");
    DOM_loginPasswordField.value = ''; // Limpa a senha no campo
    DOM_loginPasswordField.insertAdjacentHTML('afterend', `<div class="input-error-msg">Senha incorreta.</div>`);
    return;
  }

  localStorage.clear(); /* Limpa o localStorage antes de logar o usuário, por precaução */
  localStorage.setItem("currentUser", JSON.stringify(userObj)); // Adiciona o usuário logado no cachê do browser
  location.reload(); // Recarrega a página
}

/* -------------------- FIM DO BLOCO DE FUNÇÕES ---------------------- */


/* EVENT LISTENERS!! */
document.addEventListener("DOMContentLoaded", function () {

  /* abre a modal de login quando clica no ENTRAR do header caso o usuário não esteja logado */
  /* abre a janela de perfil quando clica no ENTRAR do header caso o usuário já esteja logado */
  DOM_navLogin.addEventListener("click", (e) => {
    e.preventDefault();
    DOM_overlay.classList.remove("hidden");
    if (!currentUser) DOM_loginModal.classList.remove("hidden");
    if (currentUser) DOM_profileModal.classList.remove("hidden");
  });

  /* fecha as modais de login, sign up e profile ao clicar no X */
  Array.from(DOM_closeButtons).forEach((button) => {
    button.addEventListener("click", (e) => {
      DOM_overlay.classList.add("hidden");
      if (!currentUser) DOM_loginModal.classList.add("hidden");
      if (!currentUser) DOM_signupModal.classList.add("hidden");
      if (currentUser) DOM_profileModal.classList.add("hidden");
      clearLoginErrorMessages();
    });
  });

  /* fecha o login e abre o sign up ao clicar no "cadastre-se" na modal de login */
  if (!currentUser) DOM_registerRedirectButton.addEventListener("click", (e) => {
    DOM_loginModal.classList.add("hidden");
    DOM_signupModal.classList.remove("hidden");
  });

  /* fecha o sign up e abre o login ao clicar no "entre" na modal de sign up */
  if (!currentUser) DOM_loginRedirectButton.addEventListener("click", (e) => {
    DOM_signupModal.classList.add("hidden");
    DOM_loginModal.classList.remove("hidden");
    clearLoginErrorMessages();
  });

  /* loga + faz com que o botão não submeta o formulário */
  if (!currentUser) DOM_loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    login();
  });

});

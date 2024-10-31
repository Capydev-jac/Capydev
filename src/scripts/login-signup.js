"use strict"

/* --------------------------- FUNÇÕES --------------------------- */

/* limpa as mensagens de erro e afins */
function clearLoginErrorMessages() {
  const errorFields = Array.from(document.querySelectorAll(".input-error"));
  if (errorFields.length > 0) errorFields.forEach((input) => input.classList.remove("input-error")); /* remove estilo de erro dos input fields */

  const errorMsgs = Array.from(document.querySelectorAll(".input-error-msg"));
  if (errorMsgs.length > 0) errorMsgs.forEach((msg) => msg.remove()); /* remove error msgs */
}

/* loga o usuário após submissão de user e password na modal de login */
/* só é executada quando o loginButton é clicado */
function login() {
  clearLoginErrorMessages();

  const userObj = accounts.find((obj) => DOM_loginEmailField.value === obj.email);

  /* mensagens de erro de login */
  if (!userObj) {
    DOM_loginEmailField.classList.add("input-error");
    DOM_loginPasswordField.value = '';
    DOM_loginEmailField.insertAdjacentHTML('afterend', `<div class="input-error-msg">O e-mail fornecido não foi registrado.</div>`)
    return;
  }
  if (userObj.password !== DOM_loginPasswordField.value) {
    DOM_loginPasswordField.classList.add("input-error");
    DOM_loginPasswordField.value = '';
    DOM_loginPasswordField.insertAdjacentHTML('afterend', `<div class="input-error-msg">Senha incorreta.</div>`)
    return;
  };


  localStorage.clear(); /* limpa o localStorage antes de logar o user, só de precaução */
  localStorage.setItem("currentUser", JSON.stringify(userObj)); // adiciona o user logado no cachê do browser
  location.reload(); // recarrega a página
}
/* -------------------- FIM DO BLOCO DE FUNÇÕES ---------------------- */



/* EVENT LISTENERS!! */
/* abre a modal de login quando clica no ENTRAR do header caso usuario não esteja logado */
/* abre a janela de perfil quando clicano ENTRAR do header caso usuario já esteja logado */
DOM_navLogin.addEventListener("click", (e) => {
  e.preventDefault();
  DOM_overlay.classList.remove("hidden");
  if (!currentUser) DOM_loginModal.classList.remove("hidden");
  if (currentUser) DOM_profileModal.classList.remove("hidden");
});

/* fecha as modais de login, sign up e profile ao clicar no X */
/* são dois elementos, então precisa converter a node list pra array, iterar e anexar o event listener pra cada botão */
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

/* fecha o sign up e abre o login ao clicar no "entre" na modal de sign up*/
if (!currentUser) DOM_loginRedirectButton.addEventListener("click", (e) => {
  DOM_signupModal.classList.add("hidden");
  DOM_loginModal.classList.remove("hidden");
  clearLoginErrorMessages();
});

/* loga + faz com que o botão não submeta o formulário */
if (!currentUser) DOM_loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  login();
})

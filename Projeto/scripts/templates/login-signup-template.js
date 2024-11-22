"use strict";

function genLoginSignup() {
    if (currentUser) return; /* não tem modal de login/cadastro pra user já logado!! */
    let html = `
    <div class="login-component hidden">
      <div class="close-button">×</div>
      <form action="\cadastro.html">
        <h2>Login</h2>
        <button>Entrar</button>
      </form>
      <div class="register-redirect"><span class="register-redirect__button"></div>
    </div>
    <div class="signup-component hidden">
      <div class="close-button">×</div>
      <form action="\cadastro.html">
        <h2>Cadastro</h2>
        <div class="signup__name-field input-field">
          <label for="signup__firstname">Nome Completo</label>
          <div class="signup__name-field__inputs">
            <input id="signup__firstname" type="text" name="first-name" placeholder="Nome" />
           
          </div>
        </div>
       
    `
    document.querySelector(".overlay").insertAdjacentHTML("afterend", html);
}


/* INIT */
genLoginSignup();


/* VARIÁVEIS */
const DOM_loginModal = document.querySelector(".login-component");
const DOM_signupModal = document.querySelector(".signup-component");
const DOM_closeButtons = document.getElementsByClassName("close-button"); /* live list */
const DOM_registerRedirectButton = document.querySelector(".register-redirect__button");
const DOM_loginRedirectButton = document.querySelector(".login-redirect__button");
const DOM_loginButton = document.querySelector(".login-component button");





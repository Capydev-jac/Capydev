"use strict";

function genLoginSignup() {
    if (currentUser) return; /* não tem modal de login/cadastro pra user já logado!! */
    let html = `
    <div class="login-component hidden">
      <div class="close-button">×</div>
      <form action="POST">
        <h2>Login</h2>
        <div class="login__email-field input-field">
          <label for="login__email">Email</label>
          <input id="login__email" type="email" name="email" placeholder="Insira seu email"/>
        </div>
        <div class="login__password-field input-field">
          <label for="login__password">Senha</label>
          <input id="login__password" type="password" name="password" placeholder="Insira sua senha"/>
        </div>
        <button>Entrar</button>
      </form>
      <div class="register-redirect">Ainda não tem uma conta? <span class="register-redirect__button">Cadastre-se</span> agora!</div>
    </div>

    <div class="signup-component hidden">
      <div class="close-button">×</div>
      <form action="POST">
        <h2>Cadastro</h2>
        <div class="signup__name-field input-field">
          <label for="signup__firstname">Nome Completo</label>
          <div class="signup__name-field__inputs">
            <input id="signup__firstname" type="text" name="first-name" placeholder="Nome" />
            <input id="signup__lastname" type="text" name="surname" placeholder="Sobrenome">
          </div>
        </div>
        <div class="signup__email-field input-field">
          <label for="signup__email">Email</label>
          <input id="signup__email" type="email" name="email" placeholder="Insira seu email"/>
        </div>
        <div class="signup__password-field input-field">
          <label for="signup__password">Senha</label>
          <input id="signup__password" type="password" name="password" placeholder="Insira sua senha"/>
          <input id="signup__password-confirm" type="password" placeholder="Confirme sua senha"/>
        </div>
        <button>Cadastrar-se</button>
      </form>
      <div class="login-redirect">Já possui registro? <span class="login-redirect__button">Entre</span> com a sua conta!</div>
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
const DOM_loginEmailField = document.getElementById("login__email");
const DOM_loginPasswordField = document.getElementById("login__password");

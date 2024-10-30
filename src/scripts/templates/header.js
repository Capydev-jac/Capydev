"use strict";

let currentUser = localStorage.getItem("currentUser"); // usado em TUDO

function genHeader(context) { /* home ou article */
  /* context é um "atributo fake" no body de cada html, indicando o contexto da página (se é home, ou article, ou outra coisa) */
  /* o caminho da pasta de imagens muda dependendo do contexto, por isso a preocupação */
  const imagePath = (context === "home") ? "./src/images/" : (context === "article") ? "../../images/" : "";

  const userObj = (currentUser) ? JSON.parse(currentUser) : null;

  const html = ` 
    <header>
      <nav>
         <a class="nav__logo" ${(context === "home") ? "" : "href="}${(context === "home") ? "" : (context === "article") ? "../../../index.html" : ""}>
          <img src="${imagePath}logo.png" alt="Logo da equipe CapyDev.">
        </a>
        <div class="nav__login">
          <span>${(!userObj) ? "Entrar" : userObj.name}</span>
          <div><img src="${(!userObj) ? imagePath + "login-icon.png" : imagePath + "capy-pfp.webp"}" alt="Icone generico de login." /></div>
        </div>
      </nav>
    </header>

    <div class="overlay hidden"></div>
  `;

  document.body.insertAdjacentHTML("afterbegin", html);
};



/* INIT */
genHeader(document.body.dataset.context);


/* VARIÁVEIS (depois que o componente é criado) */
const DOM_overlay = document.querySelector(".overlay");
const DOM_navLogin = document.querySelector(".nav__login");
const DOM_headerUser = document.querySelector(".nav__login > span");
const DOM_headerPictureContainer = document.querySelector(".nav__login > div");
const DOM_headerPicture = document.querySelector(".nav__login > div > img");

/* pequenos detalhes */
if (currentUser) {
  DOM_headerUser.style.color = window.getComputedStyle(document.documentElement).getPropertyValue('--marrom-claro-claro-cor');
  DOM_headerPictureContainer.style.borderRadius = "19px";
}

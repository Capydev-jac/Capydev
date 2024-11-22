"use strict";

/* ----------------- VARIÁVEIS GLOBAIS IMPORTANTES ------------------- */
/* o header é sempre o primeiro componente a ser importado, por as variáveis globais genéricas ficam aqui */

let currentUser = localStorage.getItem("currentUser"); // usado em TUDO
/* context é um "atributo fake" no body de cada html, indicando o contexto da página (se é home, ou article, ou outra coisa) */
const currentUserObj = (currentUser) ? JSON.parse(currentUser) : null;
const context = document.body.dataset.context;
const imagesPath = "images/"; // Caminho para a pasta 'images'
const scriptsPath = (context === "home") ? "./scripts/" : (context === "article") ? "../../scripts/" : "";

/* função que promissifica o loading */
/* evitar callback hell no loading de script externo para geração do certificado */
function loadResourcePromisified(element, source) {
  return new Promise((resolve, reject) => {
    element.addEventListener("load", () => {
      resolve(element);
    })
    element.src = source;
  })
}

const pageNumber = (context === "article") ? +window.location.href.split("/").at(-1).slice(1, 2) : null; // é usado em varios outros scripts!!!
/* pageNumber só faz sentido no contexto de artigo, por isso a condicional */

const numberOfPassedQuizzes = (currentUser) ? Object.entries(currentUserObj.passedQuizzes).length : null; // global, mas não precisaria, acho
const email =localStorage.getItem("Mail")

/* --------------------------------------------------------------------- */


function genHeader() { /* home ou article */

  const html = ` 
    <header>
      <nav>
         <a class="nav__logo" ${(context === "home") ? "" : "href="}${(context === "home") ? "" : (context === "article") ? "index.html" : ""}>
        <img src="${imagesPath}logo.png" alt="Logo da equipe CapyDev." />

        </a>
        <div class="nav__login">
          <span>
            <a href="/cadastro.html">${(!email) ? "Entrar" : email}</a>
           </span>
        <div>
        <img src="${(!currentUserObj) ? imagesPath + 'login-icon.png' : imagesPath + 'capy-pfp.webp'}" alt="Icone generico de login." /></
</div>
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

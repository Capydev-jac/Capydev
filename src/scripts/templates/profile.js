"use strict";

if (!currentUser) throw new Error(); /* termina o script se não tiver ninguém logado (users não logados não tem perfil) */

const numberOfPassedQuizzes = Object.entries(JSON.parse(currentUser).passedQuizzes).length; // global, mas não precisaria, acho

function genProfile(context) {
    if (!currentUser) return;
    const currentUserObj = JSON.parse(currentUser);
    const imagePath = (context === "home") ? "./src/images/" : (context === "article") ? "../../images/" : "";

    const html = `
    <div class="profile-component hidden">
        <div class="close-button">×</div>
        <picture>
            <img src="${imagePath}capy-pfp.webp" alt="Avatar genérico de capivara." />
        </picture>
        <div class="profile__name"></div>
        <p class="profile__message">Você precisa obter, no mínimo, 80% de acertos em mais <span class="profile__message__number-of-quizzes">${7 - numberOfPassedQuizzes}</span> de 7 questionários para emitir o seu certificado!</p>
        <button class="profile__certificate profile__certificate--disabled">Certificado</button>
        <div class="profile__account-actions">
            <button class="profile__logoff">Sair</button>
            <button class="profile__delete">Deletar Conta</button>
        </div>
    </div>
    `

    document.querySelector(".signup-component").insertAdjacentHTML("afterend", html);
}


/* INIT */
genProfile(document.body.dataset.context);

/* VARIÁVEIS */
const DOM_logoffButton = document.querySelector(".profile__logoff");
const DOM_profileModal = document.querySelector(".profile-component");
const DOM_profileName = document.querySelector(".profile__name");
const DOM_profileMessage = document.querySelector(".profile__message");
const DOM_profileNumberOfQuizzes = document.querySelector(".profile__message__number-of-quizzes");
const DOM_profileCertificateButton = document.querySelector(".profile__certificate");


/* detalhes */
function initProfile() {
    const currentUserObj = JSON.parse(currentUser);
    DOM_logoffButton.addEventListener("click", logoff);

    if (numberOfPassedQuizzes !== 0) genReport();
    if (numberOfPassedQuizzes === 7) unlockCertificate();


    /* funções auxiliares */
    function logoff() {
        localStorage.clear();
        location.reload();
    }

    function genReport() {
        let html = `
        <ul class="profile__quizReport">
        </ul>
        `;
    
        DOM_profileMessage.insertAdjacentHTML("afterend", html); 
        const DOM_profileQuizReport = document.querySelector(".profile__quizReport");
        Object.entries(currentUserObj.passedQuizzes).forEach((arr) => {
            const quizObj = arr[1];
            console.log(quizObj)
            html = `<li><b>${quizObj.pageTitle}</b> (<span>✅</span>)</li>` 
            DOM_profileQuizReport.insertAdjacentHTML("beforeend", html);
        });
    }

    function unlockCertificate() {
        DOM_profileMessage.textContent = "Parabéns! Você foi aprovado em todas as avaliações do curso e seu certificado já está liberado!";
        DOM_profileMessage.style.textAlign = "center";
        DOM_profileCertificateButton.classList.remove("profile__certificate--disabled"); 
    }
}

initProfile();

"use strict";

if (!currentUser) throw new Error(); /* termina o script se não tiver ninguém logado (users não logados não tem perfil) */

/* função que gera o componente de perfil */
function genProfile() {
    const html = `
    <div class="profile-component hidden">
        <div class="close-button">×</div>
        <picture>
            <img src="${imagesPath}capy-pfp.webp" alt="Avatar genérico de capivara." />
        </picture>
        <div class="profile__name">${currentUserObj.name} ${currentUserObj.surname}</div>
        <p class="profile__message">Você precisa obter, no mínimo, 80% de acertos em mais <span class="profile__message__number-of-quizzes">${7 - numberOfPassedQuizzes}</span> de 7 questionários para emitir o seu certificado!</p>
        <button class="profile__certificate profile__certificate--disabled">Certificado</button>
        <div class="profile__account-actions">
            <button class="profile__logoff">Sair</button>
            <button class="profile__delete">Deletar Conta</button>
        </div>
    </div>
    `

    document.querySelector(".overlay").insertAdjacentHTML("afterend", html);
}


/* INIT */
genProfile();

/* VARIÁVEIS */
const DOM_logoffButton = document.querySelector(".profile__logoff");
const DOM_profileModal = document.querySelector(".profile-component");
const DOM_profileName = document.querySelector(".profile__name");
const DOM_profileMessage = document.querySelector(".profile__message");
const DOM_profileNumberOfQuizzes = document.querySelector(".profile__message__number-of-quizzes");
const DOM_profileCertificateButton = document.querySelector(".profile__certificate");

/* pequenos detalhes */
initProfile(); /* definida abaixo */

/* EVENT LISTENERS */
DOM_profileCertificateButton.addEventListener("click", (e) => {
  if (DOM_profileCertificateButton.classList.contains("profile__certificate--disabled")) return;
  getCertificate();
});


/* funções */
function initProfile() {
    DOM_logoffButton.addEventListener("click", logoff);
    if (numberOfPassedQuizzes !== 0) genReport();
    if (numberOfPassedQuizzes === 7) unlockCertificateButton();



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
            html = `<li><b>${quizObj.pageTitle}</b> (<span>✅</span>)</li>` 
            DOM_profileQuizReport.insertAdjacentHTML("beforeend", html);
        });
    }

    function unlockCertificateButton() {
        DOM_profileMessage.textContent = "Parabéns! Você foi aprovado em todas as avaliações do curso e seu certificado já está liberado!";
        DOM_profileMessage.style.textAlign = "center";
        DOM_profileCertificateButton.classList.remove("profile__certificate--disabled"); 

    }
}

function getCertificate() {
  /* carrega o jspdf, cria o certificado e armazena no localStorage */  
  let certificate;
  const certificateName = `${currentUserObj.name} ${currentUserObj.surname}`;

  const jspdfScript = document.createElement("script");
  const templateImage = document.createElement("img");

  loadResourcePromisified(jspdfScript, `${scriptsPath}/external/jspdf.js`)
  .then(() => {
    certificate = new jspdf.jsPDF("landscape");
    return loadResourcePromisified(templateImage, `${imagesPath}certificate-template.jpeg`);
  })
  .then(() => {
    const pageWidth = certificate.internal.pageSize.getWidth();
    const pageHeight = certificate.internal.pageSize.getHeight();
    certificate.addImage(templateImage, "JPEG", 0, 0, pageWidth, pageHeight);
    const textWidth = certificate.getTextWidth(certificateName);
    const xPos = (pageWidth - textWidth) / 2.54;
    certificate.setFont("Times", "bolditalic");
    certificate.setFontSize(40);
    certificate.setTextColor(136, 189, 188);
    certificate.text(certificateName, xPos, pageHeight / 2.1);
    certificate.save("certificado-scrum.pdf");
  })
        
  document.head.appendChild(jspdfScript);
  document.head.appendChild(templateImage); // adicionando no <head> pra não ficar visível hihi
}




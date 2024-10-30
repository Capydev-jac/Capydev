"use strict";

const pageNumber = +window.location.href.split("/").at(-1).slice(1, 2); // é usado em varios outros scripts!!!

function genNavBar(pageNumber) {
    let html = `
    <nav class="nav-bar">
        <a href="./01.html" class="nav-bar__circle" title="Introdução ao Curso Scrum"></a>
        <a href="./02.html" class="nav-bar__circle" title="O que é Scrum"></a>
        <a href="./03.html" class="nav-bar__circle" title="Pilares do Scrum"></a>
        <a href="./04.html" class="nav-bar__circle" title="Papeis do Scrum"></a>
        <a href="./05.html" class="nav-bar__circle" title="Artefatos do Scrum"></a>
        <a href="./06.html" class="nav-bar__circle" title="Eventos do Scrum"></a>
        <a href="./07.html" class="nav-bar__circle" title="Definição de Pronto"></a>
        <a href="./08.html" class="nav-bar__circle" title=" Vantagens do Scrum"></a>
    </nav>
    `

    document.querySelector(`${(currentUser) ? ".profile-component" : ".signup-component"}`).insertAdjacentHTML("afterend", html);
    
    Array.from(document.querySelectorAll(".nav-bar > a")).find((circleLink) => circleLink.getAttribute("href").indexOf(`0${pageNumber}`) !== -1).classList.add("nav-bar__circle--selected");
}


/* INIT */
genNavBar(pageNumber);
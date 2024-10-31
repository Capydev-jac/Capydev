"use strict";

function genNavAlt(pageNumber) {
    let html = `
    <nav class="nav-alt">
      <a href="./0${pageNumber - 1}.html"><button class="nav-alt__previous">Anterior</button></a>
      <a href="./0${pageNumber + 1}.html"><button class="nav-alt__next">Próximo</button></a>
    </nav>
    `

    if (pageNumber === 1) {
        html = `
        <nav class="nav-alt">
            <a href="./0${pageNumber + 1}.html" style="margin-inline-start: auto"><button class="nav-alt__next">Próximo</button></a>
        </nav>
        `
    }

    if (pageNumber === 8) {
        html = `
        <nav class="nav-alt">
            <a href="./0${pageNumber - 1}.html" style="margin-inline-end: auto"><button class="nav-alt__previous">Anterior</button></a>
        </nav>
        `
    }

    document.querySelector("footer").insertAdjacentHTML("beforebegin", html);
}


/* INIT */
genNavAlt(pageNumber);

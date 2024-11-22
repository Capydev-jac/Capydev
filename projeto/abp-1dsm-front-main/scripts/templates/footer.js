"use strict";

function genFooter() {
    const html = `
    <footer>
        <address>
        <img src="images/github-icon.png" alt="Ícone do Github." />
            <a rel="author" href="https://github.com/Capydev-jac">CapyDev</a>
        </address>
    </footer>
    `

    document.body.insertAdjacentHTML("beforeend", html);
}


/* INIT */
genFooter();  

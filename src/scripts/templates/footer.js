"use strict";

function genFooter(context) {
    const imagePath = (context === "home") ? "./src/images/" : (context === "article") ? "../../images/" : "";
    const html = `
    <footer>
        <address>
            <img src="${imagePath}github-icon.png" alt="Ícone do Github." />
            <a rel="author" href="https://github.com/Capydev-jac">CapyDev</a>
        </address>
    </footer>
    `

    document.body.insertAdjacentHTML("beforeend", html);
}


/* INIT */
genFooter(document.body.dataset.context);  

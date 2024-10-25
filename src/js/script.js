"use strict"

const DOM_overlay = document.querySelector(".overlay");
const DOM_loginModal = document.querySelector(".login-modal");
const DOM_navLogin = document.querySelector(".nav__login");

DOM_navLogin.addEventListener("click", (e) => {
  e.preventDefault();
  DOM_overlay.classList.remove("hidden");
  DOM_loginModal.classList.remove("hidden");
});

document.addEventListener("click", (e) => {
  if (DOM_overlay.classList.contains("hidden")) return;
  if (e.target.closest(".nav__login")) return;
  if (!e.target.closest(".login-modal")) {
    DOM_overlay.classList.add("hidden");
    DOM_loginModal.classList.add("hidden");
  }
});

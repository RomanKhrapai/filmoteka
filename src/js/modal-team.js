import { modalTeam } from "../js/refs.js";

export function toggleModalTeam() {
    setTimeout(() => { modalTeam.classList.toggle('is-hidden') }, 250);
    modalTeam.classList.contains('is-hidden') ? document.body.style.overflow = "hidden" : document.body.style.overflow = "";
}
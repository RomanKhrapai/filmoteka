import { team } from "../js/refs.js";

export function toggleModalTeam() {
    setTimeout(() => { team.modalTeam.classList.toggle('is-hidden') }, 250);
    team.modalTeam.classList.contains('is-hidden') ? document.body.style.overflow = "hidden" : document.body.style.overflow = "";
}
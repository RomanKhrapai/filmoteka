import { modalTeam } from "../js/refs.js";

export function toggleModalTeam() {
    setTimeout(()=> {modalTeam.classList.toggle('is-hidden')}, 250);
}
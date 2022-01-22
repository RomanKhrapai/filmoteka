import { team } from "../js/refs.js";

export function toggleModalTeam() {
    window.addEventListener('keydown', onEscKeydown);
    
    setTimeout(() => { team.modalTeam.classList.toggle('is-hidden') }, 250);
    team.modalTeam.classList.contains('is-hidden') ?
      document.body.style.overflow = "hidden" :
      document.body.style.overflow = "";
}

team.backdrop.addEventListener('click', onClickBackdrop);

function onClickBackdrop(e) {
   if (e.currentTarget === e.target) {      
    toggleModalTeam();
  } 
}

function onEscKeydown(e) {
    if (e.code === 'Escape') {    
    toggleModalTeam();
    window.removeEventListener('keydown', onEscKeydown);    
  }
}
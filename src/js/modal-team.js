import { team } from "../js/refs.js";

export function openModalTeam() {
    window.addEventListener('keydown', onEscKeydown);
    
    setTimeout(() => { team.modalTeam.classList.remove('is-hidden') }, 250);
    
    document.body.style.overflow = "hidden";
}

export function closeModalTeam() {
    window.removeEventListener('keydown', onEscKeydown);
    
    setTimeout(() => { team.modalTeam.classList.add('is-hidden') }, 250);
  
    document.body.style.overflow = "";
  
}


team.backdrop.addEventListener('click', onClickBackdrop);

function onClickBackdrop(e) {
   if (e.currentTarget === e.target) {      
     closeModalTeam();
     window.removeEventListener('keydown', onEscKeydown);
  } 
}

function onEscKeydown(e) {
  if (e.code === 'Escape') {    
      closeModalTeam();
      window.removeEventListener('keydown', onEscKeydown);
  }
}
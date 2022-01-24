import { modalFilmRefs } from "./refs";

 
function onToggleModal() {  
  modalFilmRefs.modal.classList.toggle('modal-area--is-hidden');
  modalFilmRefs.modal.classList.contains('modal-area--is-hidden') ? document.body.style.overflow = "" : document.body.style.overflow = "hidden";    
};  

function onCrossClose() {   
  onToggleModal();
  window.removeEventListener('keydown', onEscClose);  
}

function onBackdropClose(event) { 
  if (event.currentTarget == event.target) {      
    onToggleModal();
    window.removeEventListener('keydown', onEscClose);
  }  
};

function onHiddenModal(event) { 
  if (event.target.parentElement.parentElement.id === 'data-modal-open')
  {    
    window.addEventListener('keydown', onEscClose)
    onToggleModal()     
  }
};

function onEscClose(event) {  
  if (event.code === 'Escape') {    
    onToggleModal();
    window.removeEventListener('keydown', onEscClose);    
  } 
 };


export { onCrossClose, onBackdropClose, onHiddenModal }
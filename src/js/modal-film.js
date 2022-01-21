import { modalFilmRefs } from "./refs";

 
function onToggleModal() {
  window.addEventListener('keydown', onEscClose)
  modalFilmRefs.modal.classList.toggle('modal-area--is-hidden');
  modalFilmRefs.modal.classList.contains('modal-area--is-hidden') ? document.body.style.overflow = "" : document.body.style.overflow = "hidden";   
};  

function onBackdropClose(event) { 
  if (event.currentTarget == event.target) {      
    onToggleModal();
  }  
};

function onHiddenModal(event) {   
  if (event.path[2].id === 'data-modal-open') {
    // console.log(event)
     onToggleModal()      
  }
};

function onEscClose(event) {
  if (event.code === 'Escape') {    
    onToggleModal();
    window.removeEventListener('keydown', onEscClose);
  } 
 };


export { onToggleModal, onBackdropClose, onHiddenModal }
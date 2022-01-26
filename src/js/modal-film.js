import { modalFilmRefs } from "./refs";

import { addWatchedQueueBtnListeners } from './firebase.js';
import modalFilm from '../markup-template/modalFilm.hbs';
import { trailer} from "./open-trailer";
import {apiService,changeDateandImageInObgect} from "./markup"
import { getWatchedData, getQueueData } from "./auth";
import { checkSection, checkActivityWatchedBtn } from "./header";

export { onCrossClose, onBackdropClose, onHiddenModal, onToggleModal}

 function renderModalFilm(movie_id) {
          apiService.getMovieDetails(movie_id)
          .then((targetFilm) => {            
              goResponseModalMovie(targetFilm);
              appendMarkupModal(modalFilm(targetFilm));
              addWatchedQueueBtnListeners(targetFilm);
              trailer(movie_id);
          })
          .catch(error => console.log(error));    
}

function goResponseModalMovie(film) {
  film.genres = film.genres.flatMap(genre => genre.name);
  changeDateandImageInObgect(film)
}


function appendMarkupModal(element) {    
  modalFilmRefs.modalClear.innerHTML= element;
}


function clearModal() {
  modalFilmRefs.modalClear.innerHTML = '';
}

function onToggleModal() {  
   if (checkSection()) {
    checkActivityWatchedBtn() ? getWatchedData() : getQueueData();
  }
  
 if( modalFilmRefs.modal.classList.contains('modal-area--is-hidden')){
document.body.style.overflow = "hidden";
} 
  else {  document.body.style.overflow = "" ;
  clearModal();
  window.removeEventListener('keydown', onEscClose);
};    
 modalFilmRefs.modal.classList.toggle('modal-area--is-hidden');
};  

function onCrossClose() {   
  onToggleModal(); 

}

function onBackdropClose(event) { 
  if (event.currentTarget == event.target) {      
    onToggleModal();
  }  

};

function onHiddenModal(event) { 
  event.preventDefault();
  const elem = event.target.parentElement.parentElement.parentElement;
  if (elem.className == 'film-card')
  {    
    onToggleModal() 
    window.addEventListener('keydown', onEscClose)
       renderModalFilm(elem.id); 
  }

};

function onEscClose(event) {  
  if (event.code === 'Escape') {    
    onToggleModal();
  } 

 };


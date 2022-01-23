import './sass/main.scss';
import UeScroll from 'ue-scroll-js';

UeScroll.init();

import { renderMarkup,onFormSubmit} from '../src/js/markup';
import { onToggleModal, onBackdropClose, onHiddenModal } from './js/modal-film';
import { openModalTeam, closeModalTeam } from '../src/js/modal-team';
import { renderModalFilm } from '../src/js/markup';
import { startNavigation } from './js/navigation';
// локальні імпорти


import { header, mainContainer, team , modalFilmRefs} from "../src/js/refs.js";

import { checkAuth } from '../src/js/auth.js';
import { onBtnHomeClick, onBtnLibraryClick, onBtnWatchedClick, onBtnQueueClick, onHeaderButtonClick, homePageRender, fetchMovies, onInputInput } from '../src/js/header.js';
import { ApiService } from "./js/API-service";

checkAuth();
startNavigation();
// renderMarkup(); 
renderModalFilm();


header.btnHome.addEventListener('click', onBtnHomeClick);
header.form.addEventListener('submit', onFormSubmit);
header.btnLibrary.addEventListener('click', onBtnLibraryClick);
header.btnWatched.addEventListener('click', onBtnWatchedClick);
header.btnQueue.addEventListener('click', onBtnQueueClick);
header.headerButton.addEventListener('click', onHeaderButtonClick);
header.input.addEventListener('input', onInputInput);

//modal-film
modalFilmRefs.backdrop.addEventListener('click', onBackdropClose);
modalFilmRefs.closeModal.addEventListener('click', onToggleModal);
mainContainer.galleryContainer.addEventListener('click', onHiddenModal);

// modal-team
team.openModalTeam.addEventListener('click', openModalTeam);
team.closeModalTeam.addEventListener('click', closeModalTeam);

//localStorage
// modal.btnWatched.addEventListener('click', addMovieToLocalStorage);
// mainContainer.modal.btnQueue.addEventListener('click', removeMovieFromLocalStorage);
// refAuth.addEventListener('click', onCheckedAuth);


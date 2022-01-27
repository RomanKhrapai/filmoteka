import './sass/main.scss';
import UeScroll from 'ue-scroll-js';

UeScroll.init();

// локальні імпорти
import { onFormSubmit} from '../src/js/markup';
import { onCrossClose, onBackdropClose, onHiddenModal, renderModalFilm } from './js/modal-film';
import { openModalTeam, closeModalTeam,  } from '../src/js/modal-team';

import { header, mainContainer, team , modalFilmRefs} from "../src/js/refs.js";

import { checkAuth } from '../src/js/auth.js';
// onHeaderButtonClick,
import { onBtnHomeClick, onBtnLibraryClick, onBtnWatchedClick, onBtnQueueClick,  onInputInput } from '../src/js/header.js';

checkAuth();

header.btnHome.addEventListener('click', onBtnHomeClick);
header.form.addEventListener('submit', onFormSubmit);
header.btnLibrary.addEventListener('click', onBtnLibraryClick);
header.btnWatched.addEventListener('click', onBtnWatchedClick);
header.btnQueue.addEventListener('click', onBtnQueueClick);
//header.headerButton.addEventListener('click', onHeaderButtonClick);
header.input.addEventListener('input', onInputInput);

//modal-film
modalFilmRefs.backdrop.addEventListener('click', onBackdropClose);
modalFilmRefs.closeModal.addEventListener('click', onCrossClose);
mainContainer.galleryContainer.addEventListener('click', onHiddenModal);

// modal-team
team.openModalTeam.addEventListener('click', openModalTeam);
team.closeModalTeam.addEventListener('click', closeModalTeam);

import './sass/main.scss';

import { renderMarkup,onFormSubmit} from '../src/js/markup';
import { onToggleModal, onBackdropClose, onHiddenModal } from './js/modal-film';
import { toggleModalTeam } from '../src/js/modal-team';
import { renderModalFilm } from '../src/js/markup';
// локальні імпорти
import { btnHome, btnLibrary, searchButton, form, btnWatched, btnQueue, headerHeroWrapper,heroList,headerButton, closeModal, openModalTeam, closeModalTeam, filmClickListener, backdrop} from "../src/js/refs.js";
import { checkAuth, userSignOut } from '../src/js/auth.js';
import { onBtnHomeClick, onBtnLibraryClick, onBtnWatchedClick, onBtnQueueClick, onHeaderButtonClick, homePageRender, fetchMovies, onInputInput } from '../src/js/header.js';
import { ApiService } from "./js/API-service";
const apiService = new ApiService();

// checkAuth();
// userSignOut(); // можна виключити цю функцію, щоб не авторизовуватись після кожного оновлення сторінки

renderMarkup(apiService.fetchTrendingFilms()); 
renderModalFilm()


btnHome.addEventListener('click', onBtnHomeClick);
form.addEventListener('submit', onFormSubmit);
btnLibrary.addEventListener('click', onBtnLibraryClick)
btnWatched.addEventListener('click', onBtnWatchedClick)
btnQueue.addEventListener('click', onBtnQueueClick)
headerButton.addEventListener('click', onHeaderButtonClick)
input.addEventListener('input', onInputInput)

backdrop.addEventListener('click', onBackdropClose)
closeModal.addEventListener('click', onToggleModal)
filmClickListener.addEventListener('click', onHiddenModal);

// modal-team
openModalTeam.addEventListener('click', toggleModalTeam);
closeModalTeam.addEventListener('click', toggleModalTeam);



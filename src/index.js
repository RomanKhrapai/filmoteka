import './sass/main.scss';

import { renderMarkup,onFormSubmit} from '../src/js/markup';
import { toggleModal } from './js/modal-film';
import { toggleModalTeam } from '../src/js/modal-team';

// локальні імпорти
import { btnHome, btnLibrary, searchButton, form, btnWatched, btnQueue, headerHeroWrapper,heroList,headerButton,closeModal,modal, openModalTeam, closeModalTeam} from "../src/js/refs.js";
import { checkAuth, userSignOut } from '../src/js/auth.js';
import { onBtnHomeClick, onBtnLibraryClick,onBtnWatchedClick, onBtnQueueClick,onHeaderButtonClick,homePageRender,fetchMovies} from '../src/js/header.js';

checkAuth();
userSignOut(); // можна виключити цю функцію, щоб не авторизовуватись після кожного оновлення сторінки
renderMarkup(); 


btnHome.addEventListener('click', onBtnHomeClick);
form.addEventListener('submit', onFormSubmit);
btnLibrary.addEventListener('click', onBtnLibraryClick)
btnWatched.addEventListener('click', onBtnWatchedClick)
btnQueue.addEventListener('click', onBtnQueueClick)
headerButton.addEventListener('click', onHeaderButtonClick)

closeModal.addEventListener('click', toggleModal)
document.addEventListener('click', (event) => {    
    if (event.path[2].id === 'data-modal-open') {      
        toggleModal()      
    }
});

// modal-team
openModalTeam.addEventListener('click', toggleModalTeam);
closeModalTeam.addEventListener('click', toggleModalTeam);



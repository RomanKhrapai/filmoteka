import './sass/main.scss';




import { renderMarkup } from '../src/js/markup';
// локальні імпорти
import { btnHome, btnLibrary, searchButton, form, btnWatched, btnQueue, headerHeroWrapper,heroList,headerButton} from "../src/js/refs.js";
import { checkAuth, userSignOut } from '../src/js/auth.js';
import { onBtnHomeClick, onFormSubmit, onBtnLibraryClick,onBtnWatchedClick, onBtnQueueClick,onHeaderButtonClick,homePageRender} from '../src/js/header.js';

checkAuth();
userSignOut(); // можна виключити цю функцію, щоб не авторизовуватись після кожного оновлення сторінки
renderMarkup(); 

btnHome.addEventListener('click', onBtnHomeClick);
form.addEventListener('submit', onFormSubmit);
btnLibrary.addEventListener('click', onBtnLibraryClick)
btnWatched.addEventListener('click', onBtnWatchedClick)
btnQueue.addEventListener('click', onBtnQueueClick)
headerButton.addEventListener('click', onHeaderButtonClick)


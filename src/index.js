import './sass/main.scss';




import { renderMarkup } from "..src/js/markup.js";
// локальні імпорти
import { btnHome, btnLibrary, searchButton, form } from "../src/js/refs.js";
import { checkAuth, userSignOut } from '../src/js/auth.js';
import { onBtnHomeClick, onFormSubmit, onBtnLibraryClick } from '../src/js/header.js';

checkAuth();
userSignOut(); // можна виключити цю функцію, щоб не авторизовуватись після кожного оновлення сторінки
renderMarkup(); 

btnHome.addEventListener('click', onBtnHomeClick);
form.addEventListener('submit', onFormSubmit);
btnLibrary.addEventListener('click', onBtnLibraryClick)

import './sass/main.scss';

// глобальні імпорти


// локальні імпорти
import { btnHome, btnLibrary, searchButton, form } from "../src/js/refs.js";
import { checkAuth, userSignOut } from '../src/js/auth.js';
import { onBtnHomeClick, onFormSubmit } from '../src/js/header.js';

checkAuth();
userSignOut(); // можна виключити цю функцію, щоб не авторизовуватись після кожного оновлення сторінки

btnHome.addEventListener('click', onBtnHomeClick);
form.addEventListener('submit', onFormSubmit);
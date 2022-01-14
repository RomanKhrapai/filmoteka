import './sass/main.scss';
//------------
const btnHome = document.querySelector('.site-nav__button')
const btnLibrary = document.querySelector('.site-nav').lastElementChild.firstElementChild
const searchButton = document.querySelector('.main-header__search-button')
const form = document.querySelector('.hero__form')

btnHome.addEventListener('click', onBtnHomeClick)
btnLibrary.addEventListener('click', onBtnLibraryClick)
form.addEventListener('submit', onFormSubmit)

function onBtnHomeClick(event) {

  btnHome.classList.add('is-active')  
  btnLibrary.classList.remove('is-active')  
}

function onBtnLibraryClick(event) {
   btnHome.classList.remove('is-active')
    btnLibrary.classList.add('is-active')  
}
 //----------


// локальні імпорти
import { btnHome, btnLibrary, searchButton, form } from "../src/js/refs.js";
import { checkAuth, userSignOut } from '../src/js/auth.js';
import { onBtnHomeClick, onFormSubmit } from '../src/js/header.js';

checkAuth();
userSignOut(); // можна виключити цю функцію, щоб не авторизовуватись після кожного оновлення сторінки

btnHome.addEventListener('click', onBtnHomeClick);
form.addEventListener('submit', onFormSubmit);
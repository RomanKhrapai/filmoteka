// селектори для елементів сайту

// header
const btnHome = document.querySelectorAll('.site-nav__button')[0]
const btnLibrary = document.querySelectorAll('.site-nav__button')[1]
const searchButton = document.querySelector('.main-header__search-button');
const form = document.querySelector('.hero__form');
const btnWatched = document.querySelectorAll('.hero__button')[0]
const btnQueue = document.querySelectorAll('.hero__button')[1]
const headerHeroWrapper = document.querySelector('.header-hero__wrapper')
const heroList = document.querySelector('.hero__list')
const headerButton = document.querySelector('.header__button')
const galleryContainer = document.querySelector(".js-gallery");
const closeModal = document.querySelector('[data-modal-close]');
const modal = document.querySelector('[data-modal]');
const backdrop = document.querySelector('.modal-area');
const filmClickListener = document.querySelector(".gallery");
const modalClear = document.querySelector(".data-modal-clear");
const notificationFailureText = document.querySelector('.hero__notification-text')
const input = document.querySelector('.hero__input')
 
const searchIcon = document.querySelector('.hero__search-icon');

// modal-team
const modalTeam = document.querySelector('[data-modal-team]');
const openModalTeam = document.querySelector('.js-team-modal');
const closeModalTeam = document.querySelector('[data-team-close]');

export {btnHome, btnLibrary, searchButton, 
    form, btnWatched, btnQueue, headerHeroWrapper,notificationFailureText,input,
    heroList, headerButton, galleryContainer, closeModal, modal, modalTeam, openModalTeam,
    closeModalTeam, filmClickListener, backdrop, modalClear, searchIcon };


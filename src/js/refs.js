// селектори для елементів сайту

// header
const header = {
    headerButton: document.querySelector('.header__button'),
    btnHome: document.querySelectorAll('.site-nav__button')[0],
    btnLibrary: document.querySelectorAll('.site-nav__button')[1],
    btnAuth: document.querySelector(".auth"),
    btnLogOut: document.querySelector(".auth__dropdown-item"),
    searchButton: document.querySelector('.main-header__search-button'),
    form: document.querySelector('.hero__form'),
    btnWatched: document.querySelectorAll('.hero__button')[0],
    btnQueue: document.querySelectorAll('.hero__button')[1],
    headerHeroWrapper: document.querySelector('.header-hero__wrapper'),
    heroList: document.querySelector('.hero__list'),
    notificationFailureText: document.querySelector('.hero__notification-text'),
    input: document.querySelector('.hero__input'),
    searchIcon: document.querySelector('.hero__search-icon'),
}

// main container
const mainContainer = {
    galleryContainer: document.querySelector(".js-gallery"),
    closeModal: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
    backdrop: document.querySelector('.modal-area'),
    filmClickListener: document.querySelector(".gallery"),
    modalClear: document.querySelector(".data-modal-clear"),

    btnAddToWatched: document.querySelector("#btn__watched"),
    btnAddToQueue: document.querySelector("#btn__queue"),
}

// modal-team
const team = {
    modalTeam: document.querySelector('[data-modal-team]'),
    openModalTeam: document.querySelector('.js-team-modal'),
    closeModalTeam: document.querySelector('[data-team-close]'),
}

export {header, mainContainer, team};


// селектори для елементів сайту

// header
const header = {
    headerButton: document.querySelector('.header__link'),
    btnHome: document.querySelectorAll('.site-nav__link')[0],
    btnLibrary: document.querySelectorAll('.site-nav__link')[1],
    btnAuth: document.querySelector('.auth'),
    btnLogOut: document.querySelector('.auth__dropdown-item'),
    searchButton: document.querySelector('.main-header__search-button'),
    form: document.querySelector('.hero__form'),
    btnWatched: document.querySelectorAll('.hero__button')[0],
    btnQueue: document.querySelectorAll('.hero__button')[1],
    headerHeroWrapper: document.querySelector('.header-hero__wrapper'),
    heroList: document.querySelector('.hero__list'),
    input: document.querySelector('.hero__input'),
    searchIcon: document.querySelector('.hero__search-icon'),
    heroNotification: document.querySelector('.notification-text'),
    libraryText : document.querySelector('.library-text'),


    screenCover: document.querySelector('.screen-background'),
    loader: document.querySelector('.js-loader'),
};


// main container
const mainContainer = {
    galleryContainer: document.querySelector('.js-gallery'),
};

// modal-team
const team = {
    backdrop: document.querySelector('.backdrop'),
    modalTeam: document.querySelector('[data-modal-team]'),
    openModalTeam: document.querySelector('.js-team-modal'),
    closeModalTeam: document.querySelector('[data-team-close]'),
};


// localStorage
const localStorage = {
btnWatched : document.querySelector('#btn__watched'),
btnQueue : document.querySelector('#btn__queue'),
refAuth : document.querySelector('.auth__button'),
}

const modalFilmRefs = {
    closeModal: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
    backdrop: document.querySelector('.modal-area'), 
    modalClear: document.querySelector('.data-modal-clear'),
};

export {header, mainContainer, team, localStorage, modalFilmRefs};

// селектори для елементів сайту

// header
const header = {
    headerButton: document.querySelector('.header__link'),
    btnHome: document.querySelectorAll('.site-nav__link')[0],
    btnLibrary: document.querySelectorAll('.site-nav__link')[1],
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
    heroNotification: document.querySelector('.notification-text'),
    screenCover: document.querySelector('.screen-background')
}
console.log(header.heroNotification);

// main container
const mainContainer = {
    galleryContainer: document.querySelector(".js-gallery"),
    closeModal: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
    backdrop: document.querySelector('.modal-area'),
    filmClickListener: document.querySelector(".gallery"),
    modalClear: document.querySelector(".data-modal-clear"),
}

// modal-team
const team = {
    modalTeam: document.querySelector('[data-modal-team]'),
    openModalTeam: document.querySelector('.js-team-modal'),
    closeModalTeam: document.querySelector('[data-team-close]'),
}

export {header, mainContainer, team};



export const btnHome = document.querySelector('.site-nav__button');
export const btnLibrary = document.querySelector('.site-nav').lastElementChild.firstElementChild;
export const searchButton = document.querySelector('.main-header__search-button');
export const form = document.querySelector('.main-header__form');

export function onBtnHomeClick(event) {
    document.location = 'page/index.html';
    event.currentTarget.classList('.is-active');
}

export function onFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    event.currentTarget.reset();
}
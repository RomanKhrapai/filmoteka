import './sass/main.scss';
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
 

function onFormSubmit(event) {
    event.preventDefault()
  
//    console.log(event.currentTarget.elements.movies.value);
    
    const formData = new FormData(event.currentTarget)

    event.currentTarget.reset()
}
 

console.log(searchButton);
console.log(form); 

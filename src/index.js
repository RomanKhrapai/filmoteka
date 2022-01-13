import './sass/main.scss';
const btnHome = document.querySelector('.site-nav__button')
const btnLibrary = document.querySelector('.site-nav').lastElementChild.firstElementChild
const searchButton = document.querySelector('.main-header__search-button')
const form = document.querySelector('.main-header__form')

btnHome.addEventListener('click', onBtnHomeClick)
form.addEventListener('submit', onFormSubmit)

function onBtnHomeClick(event) {
    document.location = 'page/index.html'
    event.currentTarget.classList('.is-active')
   
    
}
 

function onFormSubmit(event) {
    event.preventDefault()
  
//    console.log(event.currentTarget.elements.movies.value);
    
    const formData = new FormData(event.currentTarget)

    event.currentTarget.reset()
}
 

console.log(searchButton);
console.log(form); 

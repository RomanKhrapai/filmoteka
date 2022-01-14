import { btnHome, btnLibrary, searchButton, form } from "./refs.js";
export function onBtnHomeClick(event) {
    btnHome.classList.add('is-active')  
  btnLibrary.classList.remove('is-active') 
  homePageRender()
 btnWatched.classList.remove('is-active-btn')
    btnQueue.classList.remove('is-active-btn')
}

export function onFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    event.currentTarget.reset();
}

export function onBtnLibraryClick(event) {
   btnHome.classList.remove('is-active')
  btnLibrary.classList.add('is-active')  
   headerHeroWrapper.classList.remove('header-hero__wrapper')
  headerHeroWrapper.classList.add('header-hero__library-wrapper')
  heroList.classList.remove('is-hidden')
  form.classList.add('is-hidden')
}

 export function onBtnWatchedClick(event) {
   btnWatched.classList.add('is-active-btn')
    btnQueue.classList.remove('is-active-btn')
} 

 export function onBtnQueueClick(event) {
   btnQueue.classList.add('is-active-btn')
    btnWatched.classList.remove('is-active-btn')
} 

export function onHeaderButtonClick() {
  homePageRender()
  btnHome.classList.remove('is-active')
  btnLibrary.classList.remove('is-active') 
   btnWatched.classList.remove('is-active-btn')
    btnQueue.classList.remove('is-active-btn')
}

export function homePageRender() {
    headerHeroWrapper.classList.add('header-hero__wrapper')
  headerHeroWrapper.classList.remove('header-hero__library-wrapper')
  heroList.classList.add('is-hidden')
  form.classList.remove('is-hidden')
}

import { btnHome, btnLibrary, searchButton, form, btnWatched, btnQueue, headerHeroWrapper,heroList,headerButton} from "./refs.js";
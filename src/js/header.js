
import { btnHome, btnLibrary, searchButton, form, btnWatched,searchIcon, btnQueue, headerHeroWrapper, heroList, headerButton, input , notificationFailureText,notificationSuccessText} from "./refs.js";
import { renderMarkup, dataArray } from './markup';
 

export function onBtnHomeClick(event) {
 
    btnHome.classList.add('is-active');
  btnLibrary.classList.remove('is-active');
  homePageRender();
 btnWatched.classList.remove('is-active-btn');
  btnQueue.classList.remove('is-active-btn');

}


export function onBtnLibraryClick(event) {
   btnHome.classList.remove('is-active');
  btnLibrary.classList.add('is-active') ; 
   headerHeroWrapper.classList.remove('header-hero__wrapper');
  headerHeroWrapper.classList.add('header-hero__library-wrapper');
  heroList.classList.remove('is-hidden');
  form.classList.add('is-hidden');
  input.value = "";
  notificationFailureText.classList.add('is-hidden');
   searchIcon.classList.remove('is-big');

}

 export function onBtnWatchedClick(event) {
   btnWatched.classList.add('is-active-btn');
    btnQueue.classList.remove('is-active-btn');
} 

 export function onBtnQueueClick(event) {
   btnQueue.classList.add('is-active-btn');
    btnWatched.classList.remove('is-active-btn');
} 

export function onHeaderButtonClick() {
  homePageRender();
  btnHome.classList.add('is-active');
  btnLibrary.classList.remove('is-active'); 
   btnWatched.classList.remove('is-active-btn');
    btnQueue.classList.remove('is-active-btn');
}


export function homePageRender() {
    headerHeroWrapper.classList.add('header-hero__wrapper');
  headerHeroWrapper.classList.remove('header-hero__library-wrapper');
  heroList.classList.add('is-hidden');
  form.classList.remove('is-hidden');
}



 
export function onInputInput(event) {
  const inputText = event.currentTarget.value;

  let trimedInputText = inputText.trim()
  if (trimedInputText) {
      searchIcon.classList.add('is-big');
  }
  if (!inputText) {
            searchIcon.classList.remove('is-big');
  }
  if(inputText === " "){
  searchIcon.classList.remove('is-big');
  }
}
 

 

import { header } from "./refs.js";
import { renderMarkup, dataArray } from './markup';
 

export function onBtnHomeClick(event) {
 
  header.btnHome.classList.add('is-active');
  header.btnLibrary.classList.remove('is-active');
  homePageRender();
  header.btnWatched.classList.remove('is-active-btn');
  header.btnQueue.classList.remove('is-active-btn');

}


export function onBtnLibraryClick(event) {
  header.btnHome.classList.remove('is-active');
  header.btnLibrary.classList.add('is-active') ; 
  header.headerHeroWrapper.classList.remove('header-hero__wrapper');
  header.headerHeroWrapper.classList.add('header-hero__library-wrapper');
  header.heroList.classList.remove('is-hidden');
  header.form.classList.add('is-hidden');
  header.input.value = "";
  header.notificationFailureText.classList.add('is-hidden');
  header.searchIcon.classList.remove('is-big');

}

 export function onBtnWatchedClick(event) {
  header.btnWatched.classList.add('is-active-btn');
  header.btnQueue.classList.remove('is-active-btn');
} 

 export function onBtnQueueClick(event) {
  header.btnQueue.classList.add('is-active-btn');
  header.btnWatched.classList.remove('is-active-btn');
} 

export function onHeaderButtonClick() {
  homePageRender();
  header.btnHome.classList.add('is-active');
  header.btnLibrary.classList.remove('is-active'); 
  header.btnWatched.classList.remove('is-active-btn');
  header.btnQueue.classList.remove('is-active-btn');
}


export function homePageRender() {
  header.headerHeroWrapper.classList.add('header-hero__wrapper');
  header.headerHeroWrapper.classList.remove('header-hero__library-wrapper');
  header.heroList.classList.add('is-hidden');
  header.form.classList.remove('is-hidden');
}



 
export function onInputInput(event) {
  const inputText = event.currentTarget.value;

  let trimedInputText = inputText.trim()
  if (trimedInputText) {
      header.searchIcon.classList.add('is-big');
  }
  if (!inputText) {
            header.searchIcon.classList.remove('is-big');
  }
  if(inputText === " "){
  header.searchIcon.classList.remove('is-big');
  }
}
 

 
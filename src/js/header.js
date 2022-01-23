import { header } from "./refs.js";

import { renderMarkup, clearGallery,  renderLibrary} from './markup';
import { ApiService} from "./API-service";
import { setLocation } from "./navigation.js";
import { getWatchedMovies, getQueueMovies, getData } from './localeStorage';


const apiService = new ApiService();


export function onBtnHomeClick(event) {
 // header.libraryText.classList.add('is-hidden');
  resetInpitValue();
  searchIconRemoveClass();
  renderMarkup();
  homeBtnAddClass();
 libraryBtnRemoveClass();
  homePageRender();
   watchBtnRemoveClass();
  QueueBtnRemoveClass();
  setLocation("home")
}

export function onHeaderButtonClick() {
  resetInpitValue();
  searchIconRemoveClass();
  renderMarkup();
  homePageRender();
  homeBtnAddClass();
  libraryBtnRemoveClass(); 
   watchBtnRemoveClass();
  QueueBtnRemoveClass();
}


export function onBtnLibraryClick(event) {
  
setLocation("library")
   watchBtnAddClass() 
  // header.libraryText.classList.remove('is-hidden')
  clearGallery();
 
  header.btnHome.classList.remove('is-active');
  header.btnLibrary.classList.add('is-active'); 
  screenCoverClassList('header-hero__library-wrapper','header-hero__wrapper')
  header.heroList.classList.remove('is-hidden');
  header.form.classList.add('is-hidden');
  resetInpitValue();
  searchIconRemoveClass();
  renderLibrary(getWatchedMovies(getData()));
}

 export function onBtnWatchedClick(event) {
  watchBtnAddClass();
   QueueBtnRemoveClass();
   clearGallery();
   renderLibrary(getWatchedMovies(getData()));
   
} 

 export function onBtnQueueClick(event) {
  header.btnQueue.classList.add('is-active-btn');
   watchBtnRemoveClass();
   clearGallery();
   renderLibrary(getQueueMovies(getData()));
} 




export function homePageRender() {
 screenCoverClassList('header-hero__wrapper','header-hero__library-wrapper')
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
      searchIconRemoveClass();
  }
  if(inputText === " "){
      searchIconRemoveClass();
  }
}
 

function resetInpitValue() {
  header.input.value = "";
}
 
function searchIconRemoveClass(){
  header.searchIcon.classList.remove('is-big');
}

function screenCoverClassList(classToAdd,classToRemove) {
  header.screenCover.classList.add(classToAdd);
  header.screenCover.classList.remove(classToRemove);
}

function homeBtnAddClass() {
  header.btnHome.classList.add('is-active');
}

function libraryBtnRemoveClass() {
  header.btnLibrary.classList.remove('is-active');
}

function watchBtnRemoveClass() {
  header.btnWatched.classList.remove('is-active-btn')
}

function QueueBtnRemoveClass() {
  header.btnQueue.classList.remove('is-active-btn')
}

export function errorNotif() {
  header.heroNotification.innerHTML = "Search result is not successful. Enter the correct movie name and try again"
  setTimeout(() => {
   clearNotification()
        }, 5000);
}

export function clearNotification() {
     header.heroNotification.innerHTML = ""
}



function watchBtnAddClass() {
   header.btnWatched.classList.add('is-active-btn');
  }

import { header } from "./refs.js";
import { renderMarkup, dataArray } from './markup';
import { ApiService} from "./API-service";


const apiService = new ApiService();

 


export function onBtnHomeClick(event) {
  resetInpitValue();
  searchIconRemoveClass();
  renderMarkup(apiService.fetchTrendingFilms());
  header.btnHome.classList.add('is-active');
  header.btnLibrary.classList.remove('is-active');
  homePageRender();
  header.btnWatched.classList.remove('is-active-btn');
  header.btnQueue.classList.remove('is-active-btn');
  hideNotification();
}


export function onBtnLibraryClick(event) {
  header.btnHome.classList.remove('is-active');
  header.btnLibrary.classList.add('is-active'); 
  screenCoverClassList('header-hero__library-wrapper','header-hero__wrapper')
  header.heroList.classList.remove('is-hidden');
  header.form.classList.add('is-hidden');
  resetInpitValue();
  hideNotification();
  searchIconRemoveClass();
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
  resetInpitValue();
  searchIconRemoveClass();
  renderMarkup(apiService.fetchTrendingFilms());
  homePageRender();
  header.btnHome.classList.add('is-active');
  header.btnLibrary.classList.remove('is-active'); 
  header.btnWatched.classList.remove('is-active-btn');
  header.btnQueue.classList.remove('is-active-btn');
  hideNotification();
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

function hideNotification() {
  header.notificationFailureText.classList.add('is-hidden');
}

export function errorNotif() {
  header.heroNotification.innerHTML = "Search result is not successful. Enter the correct movie name and try again"
  setTimeout(() => {
           header.heroNotification.innerHTML = ""
        }, 5000);
}


// const notification = `<p class="hero__notification-text"> Search result is not successful. Enter the correct movie name and try again </p>`
// header.form.insertAdjacentHTML('beforeend', notification) 
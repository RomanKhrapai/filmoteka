
import { btnHome, btnLibrary, searchButton, form, btnWatched,searchIcon, btnQueue, headerHeroWrapper, heroList, headerButton, input , notificationFailureText,notificationSuccessText} from "./refs.js";
import { renderMarkup, dataArray } from './markup';
 import { ApiService} from "./API-service";


const apiService = new ApiService();

 

 
export function onBtnHomeClick(event) {
   resetInpitValue();
   searchIconRemoveClass();
  renderMarkup(apiService.fetchTrendingFilms());
    btnHome.classList.add('is-active');
  btnLibrary.classList.remove('is-active');
  homePageRender();
 btnWatched.classList.remove('is-active-btn');
  btnQueue.classList.remove('is-active-btn');
 hideNotification()
}


export function onBtnLibraryClick(event) {
   btnHome.classList.remove('is-active');
  btnLibrary.classList.add('is-active'); 
   headerHeroWrapperClassList('header-hero__library-wrapper','header-hero__wrapper')
  heroList.classList.remove('is-hidden');
  form.classList.add('is-hidden');
   resetInpitValue();
 hideNotification();
   searchIconRemoveClass();

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
   resetInpitValue();
   searchIconRemoveClass();
    renderMarkup(apiService.fetchTrendingFilms());
  homePageRender();
  btnHome.classList.add('is-active');
  btnLibrary.classList.remove('is-active'); 
   btnWatched.classList.remove('is-active-btn');
  btnQueue.classList.remove('is-active-btn');
  hideNotification()
}


export function homePageRender() {
  headerHeroWrapperClassList('header-hero__wrapper','header-hero__library-wrapper')
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
            searchIconRemoveClass();
  }
  if(inputText === " "){
  searchIconRemoveClass();
  }
}
 

function resetInpitValue() {
   input.value = "";
}
 
function searchIconRemoveClass(){
searchIcon.classList.remove('is-big')
}

function headerHeroWrapperClassList(classToAdd,classToRemove) {
  headerHeroWrapper.classList.add(classToAdd);
  headerHeroWrapper.classList.remove(classToRemove);
}

function hideNotification() {
     notificationFailureText.classList.add('is-hidden');
 }
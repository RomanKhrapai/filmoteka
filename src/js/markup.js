import { ApiService } from "./API-service";
import { API_IMG } from "./const";
import Notiflix from 'notiflix'


import { galleryContainer,notificationFailureText, modal, closeModal, filmClickListener, modalRender, modalClear } from "./refs";
// console.log();
import filmCard from "../markup-template/filmCard.hbs";
import modalFilm from "../markup-template/modalFilm.hbs"
import { result } from "lodash";

const apiService = new ApiService();
let dataArray = [];


export function onFormSubmit(event) {
    event.preventDefault();
       
    const moviesQuery = event.currentTarget.elements.movies.value;
    // let trimedSearchedMovies = apiService.searchedMovies.trim() 
    apiService.searchedMovies = moviesQuery;
 
   
    apiService.fetchMoviesResults().then(resultsNotification).catch(error => { Notiflix.Notify.failure(error)}) ;
    // apiService.fetchMovies().then(result => console.log(result));
  
    apiService.resetPage();

}


function renderSearchMarkup() {
    dataArray = [];
        apiService.fetchMovies().then(data => {
        apiService.getGenres().then(({ genres }) => {
    data.results.forEach(({ id, title, genre_ids, poster_path, release_date, vote_average, vote_count, popularity, original_title, overview }) => {
        const filterResult = filterGenres(genre_ids, genres);
        responseProcessing(id, title, filterResult, poster_path, release_date, vote_average, vote_count, popularity, original_title, overview);
        });
        })
            .then(next => {
            const markup = filmCard(dataArray);       
            appendMarkup(markup);
        }).catch(console.log);
        }).catch(console.log);
    clearGallery();
}



export function renderMarkup(fetchFunc) {
    fetchFunc.then(data => {
      
        apiService.getGenres().then(({ genres }) => {
    data.results.forEach(({ id, title, genre_ids, poster_path, release_date, vote_average, vote_count, popularity, original_title, overview }) => {
        const filterResult = filterGenres(genre_ids, genres);      
        responseProcessing(id, title, filterResult, poster_path, release_date, vote_average, vote_count, popularity, original_title, overview);
        });
        }).then(next => {
            const markup = filmCard(dataArray);            
            appendMarkup(markup);
        }).catch(console.log);
    }).catch(console.log);
}



function appendMarkup(element) {
    galleryContainer.insertAdjacentHTML("beforeend", element); 
}


function responseProcessing(id, name, genres, imgPath, date, vote_average, vote_count, popularity, original_title, overview) {
   
    const keyData = {     
        name, id, genres, img: `${API_IMG.BASIC_URL}${API_IMG.FILE_SIZE}${imgPath}`, date, vote_average, vote_count, popularity, original_title, overview
    }
    if (!imgPath) {
        keyData.img = "http://0lik.ru/uploads/posts/2009-10/1255268707_0lik.ru_plenka.jpg"
    };
    const year = !keyData.date ? "unknown" : keyData.date.slice(0,4);
    keyData.date = year;

    dataArray.push(keyData);

}

function filterGenres(conditions, array) {
    const filter = array.filter(item => conditions.includes(item.id)).map(obj => obj.name);
       if (filter.length > 2) {
            filter.splice(2);
    }  
    return filter;
}


function clearGallery(){
    galleryContainer.innerHTML = '';
}

function resultsNotification(results) {
    if (results.length === 0) {
        notificationFailureText.classList.remove('is-hidden');
        setTimeout(() => {
            notificationFailureText.classList.add('is-hidden')
        }, 5000);
   
    }
    if (results.length > 1) {
        notificationFailureText.classList.add('is-hidden');
        renderSearchMarkup();
     }
}


export function renderModalFilm() {
    
    filmClickListener.addEventListener('click',(event) => {
        apiService.fetchTrendingFilms().then(data => {   
            apiService.getGenres().then(({ genres }) => {
                    //  console.log(genres)
             data.results.forEach(({ id, title, genre_ids, poster_path, release_date, vote_average, vote_count, popularity, original_title, overview }) => {
            let filterResult = filterGenres(genre_ids, genres);
                responseProcessing(id, title, filterResult, poster_path, release_date, vote_average, vote_count, popularity, original_title, overview);                   
             });
            })    
            let targetFilm = (dataArray.find(film => film.id == event.path[3].id));
            console.log(targetFilm)
            console.log(dataArray)
            const markup = modalFilm(targetFilm);            
            appendMarkupModal(markup);       
        }).catch(console.log);              
            clearModal();
        }       
    );
}


function appendMarkupModal(element) {
    modalClear.insertAdjacentHTML("afterbegin", element); 
}

function clearModal(){
  modalClear.innerHTML = '';  
}



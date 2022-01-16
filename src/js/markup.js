import { ApiService } from "./API-service";
import { API_IMG } from "./const";
import Notiflix from 'notiflix'


import { galleryContainer } from "./refs";
console.log();
import filmCard from "../markup-template/filmCard.hbs";
import { result } from "lodash";



const apiService = new ApiService();
let dataArray = [];


export function onFormSubmit(event) {
    event.preventDefault();

    dataArray = [];
        
    const moviesQuery = event.currentTarget.elements.movies.value;
    // let trimedSearchedMovies = apiService.searchedMovies.trim() 
    apiService.searchedMovies = moviesQuery;
    // event.currentTarget.reset();

    if (!moviesQuery) {
        Notiflix.Notify.info('Please enter something');
        return
    }
 
    apiService.fetchMoviesResults().then(resultsNotification).catch(error => { Notiflix.Notify.failure(error)});
    // apiService.fetchMovies().then(result => console.log(result));

    apiService.resetPage();

    clearGallery();
    renderSearchMarkup();
}

 function renderSearchMarkup() {
    apiService.fetchMovies().then(data => {
            data.results.forEach(({ id, title, genre_ids, poster_path, release_date }) => {
           responseProcessing(id, title, genre_ids, poster_path, release_date);
        });
        const markup = filmCard(dataArray);
        appendMarkup(markup);
       
    }).catch(console.log);

}


export function renderMarkup() {
    apiService.fetchTrendingFilms().then(data => {
        
        data.results.forEach(({ id, title, genre_ids, poster_path, release_date }) => {
           responseProcessing(id, title, genre_ids, poster_path, release_date);
        });
        const markup = filmCard(dataArray);
        
        appendMarkup(markup);
       
    }).catch(console.log);

}


function appendMarkup(element) {
    galleryContainer.insertAdjacentHTML("beforeend", element); 
}


function responseProcessing(id, name, genres, imgPath, date) {
   
    const keyData = {     
        name, id, genres, img: `${API_IMG.BASIC_URL}${API_IMG.FILE_SIZE}${imgPath}`, date
    }
    const year = keyData.date.slice(0,4);
    keyData.date = year;

    dataArray.push(keyData);

}


function clearGallery(){
    galleryContainer.innerHTML = '';
}

function resultsNotification(results) {
    if (results.length === 0) {
        Notiflix.Notify.failure('Sorry, there are no movies matching your search query. Please try again.');
    }
}


 
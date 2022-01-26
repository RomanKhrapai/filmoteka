import { ApiService } from './API-service';
import { API_IMG, GENRES } from './const';
import { errorNotif, clearNotification} from './header';

import { mainContainer } from './refs';


import filmCard from '../markup-template/filmCard.hbs';

import { user } from "../js/auth.js";
import { loaderIsVisible, loaderIsHidden } from './loader';
import { renderPaginationMovies } from './pagination';
import { setLocation} from './navigation';


export const apiService = new ApiService();
let dataArray = [];
export let userRecords = [];

// пошук
export function onFormSubmit(event) {
    
    event.preventDefault();
    loaderIsVisible();
    const moviesQuery = event.currentTarget.elements.movies.value;
    apiService.searchedMovies = moviesQuery;
    setLocation(null, moviesQuery)
     apiService.resetPage();
     renderSearchMarkup();
    
}

// вивід результатів пошуку
export function renderSearchMarkup() {
        clearNotification();
        clearGallery();
        apiService
            .fetchMovies()
            .then(data=>{
                if (data.total_results === 0) {
                            errorNotif(); 
                             throw new Error("Search result is not successful.");
                        }
            return data;
            })
            .then(data => {renderCards(data)})
            .catch(console.log);
}

// вивід популярних фільмів
export function renderMarkup() {
       clearGallery();
        apiService.searchedMovies = "";
    apiService
    .fetchTrendingFilms()
        .then(data => {renderCards(data)})           
        .catch(console.log);     
}

// вивід карток
function renderCards(data) {
    if (!data.results) {
        messageNoMovies()
        return;
    } 
        goResponseProcessing(data.results);
        renderLibrary(dataArray);
        renderPaginationMovies(data.total_results, data.page);  
}

// перевірка наявності фільмів в бібліотеці
function messageNoMovies(){
    appendMarkup(`<p class='library-text'>NO MOVIES HAVE BEEN ADDED HERE YET</p>`);
}

export function renderLibrary(data) {
    clearGallery();
    if (!data.length) {
        messageNoMovies()
        return;
    }
    const markup = filmCard(data);
    appendMarkup(markup);
}

// вивід карток фільмів з Firebase
export function renderMarkupWatchedQueue(watchedStatus) {
    clearGallery();
    apiService.searchedMovies = "1";
    loaderIsVisible();

    getUserRecords()
    .then(userRecords => {
        const filteredRecordsWithStatus = Object.values(userRecords).filter((record => record.watched === watchedStatus));
        let sortedMovies = [];
        let limit = 20;
        let page = -1;
        for (const record of filteredRecordsWithStatus) {
            if(limit===20){limit = 0; page++;sortedMovies.push([]); }
            sortedMovies[page].push(record.movie);
            limit++;
        }
        let data = {
            page: apiService.page,
            results: !sortedMovies.length ? [] : sortedMovies[apiService.page - 1],
            total_results:  filteredRecordsWithStatus.length,
        };
        renderPaginationMovies(data.total_results, data.page); 
        renderLibrary(data.results);
    }).catch(console.log);
}

// жанри
export function decipherGenres(film) {
    film.genres = film.genre_ids.map(item=>GENRES[item]);
    if (film.genres.length > 2) {
        film.genres.splice(2);
    }
}

function goResponseProcessing(result) {
    result.forEach((film) => {
        decipherGenres(film);
        changeDateandImageInObgect(film)
        addDataArray(film);
          }, );}

export function changeDateandImageInObgect(film){
    film.date = !film.release_date ? 'unknown' : film.release_date.slice(0, 4);     
    film.img1x = createURLImg(film.poster_path,1);
    film.img2x = createURLImg(film.poster_path,2);
}

function addDataArray(item){
    dataArray.push(item);
}

function createURLImg(url,zoom){
    if (!url) {
        return zoom === 1? 
        'https://romankhrapai.github.io/gallery/images/film-null@1x.jpg':
        'https://romankhrapai.github.io/gallery/images/film-null@2x.jpg';
        }
    return zoom === 1? 
    `${API_IMG.BASIC_URL}${API_IMG.FILE_SIZE_1x}${url}`:
    `${API_IMG.BASIC_URL}${API_IMG.FILE_SIZE_2x}${url}`; 
}


export function appendMarkup(element) {
    loaderIsHidden();
    
    mainContainer.galleryContainer.innerHTML= element;
}

export function clearGallery() {
    dataArray = [];
    mainContainer.galleryContainer.innerHTML = '';
}

export async function getUserRecords() {
    await apiService.fetchMoviesfromFb(user.uid).then(recordsArrayFb => {
        userRecords = Object.values(recordsArrayFb);
    });
    return userRecords;
  }
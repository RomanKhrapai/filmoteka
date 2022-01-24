import { ApiService } from './API-service';
import { API_IMG } from './const';
import { errorNotif, clearNotification} from './header';

import { mainContainer, header, modalFilmRefs } from './refs';
import { addWatchedQueueBtnListeners } from './firebase.js';

import filmCard from '../markup-template/filmCard.hbs';
import modalFilm from '../markup-template/modalFilm.hbs';

import { user } from "../js/auth.js";
import { loaderIsVisible, loaderIsHidden } from './loader';
import { renderPaginationMovies } from './pagination';
import { setLocation, startNavigation } from './navigation';

export const apiService = new ApiService();
let dataArray = [];
export let userRecords = [];
// export let targetFilm;

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
    apiService
        .getGenres()
        .then(({ genres }) => {
            goResponseProcessing(data.results, genres);
        })
        .then(next => {
            renderLibrary(dataArray);
        })
        .catch(console.log);
        renderPaginationMovies(data.total_results, data.page);  
}

// перевірка наявності фільмів в бібліотеці
export function renderLibrary(data) {
    clearGallery();
    if (!data.length) {
        appendMarkup(`<p class='library-text'>NO MOVIES HAVE BEEN ADDED HERE YET</p>`);
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
            results: sortedMovies[apiService.page - 1],
            total_results:  filteredRecordsWithStatus.length,
        };
        renderCards(data);
    }).catch(console.log);
}

// жанри
export function filterGenres(conditions, array) {
    const filter = array.filter(item => conditions.includes(item.id)).map(obj => obj.name);
    if (filter.length > 2) {
        filter.splice(2);
    }
    return filter;
}

function goResponseProcessing(result, genres) {
    result.forEach((film) => {
        film.genres = filterGenres(film.genre_ids, genres);
        film.date = !film.release_date ? 'unknown' : film.release_date.slice(0, 4);     
        film.img1x = createURLImg(film.poster_path,1)
        film.img2x = createURLImg(film.poster_path,2)
      
        addDataArray(film);
          },
           );
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
    mainContainer.galleryContainer.insertAdjacentHTML('beforeend', element);
}

export function clearGallery() {
    dataArray = [];
    mainContainer.galleryContainer.innerHTML = '';
}


// модалка фільму
export function renderModalFilm() {
    mainContainer.galleryContainer.addEventListener('click', (event) => {
       
        if (event.target.parentElement.parentElement.parentElement.className == 'film-card') {
            clearModal();
            event.preventDefault();
            const movie_id = event.target.parentElement.parentElement.parentElement.id;
            apiService.getMovieDetails(movie_id)
            .then((targetFilm) => {            
                apiService.getGenres()
                .then(({ genres }) => {
                    goResponseModalMovie(targetFilm);
                })
                .then(() => {
                    const markup = modalFilm(targetFilm);
                    appendMarkupModal(markup);
                    addWatchedQueueBtnListeners(targetFilm);
                })
            })
            .catch(error => console.log(error));
        }    
        
    });
}

function goResponseModalMovie(film) {
    film.genres = film.genres.flatMap(genre => genre.name);
    film.date = !film.release_date ? 'unknown' : film.release_date.slice(0, 4);     
    film.img1x = createURLImg(film.poster_path,1)
    film.img2x = createURLImg(film.poster_path,2)
}


function appendMarkupModal(element) {    
    modalFilmRefs.modalClear.insertAdjacentHTML('afterbegin', element);
}


function clearModal() {
    modalFilmRefs.modalClear.innerHTML = '';
}

export async function getUserRecords() {
    await apiService.fetchMoviesfromFb(user.uid).then(recordsArrayFb => {
        userRecords = Object.values(recordsArrayFb);
        console.log('userRecords', userRecords);
    });
    return userRecords;
}
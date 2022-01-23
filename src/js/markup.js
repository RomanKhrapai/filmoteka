import { ApiService } from './API-service';
import { API_IMG } from './const';
import { errorNotif, clearNotification} from './header';
import { result } from "lodash";

import { mainContainer, header, modalFilmRefs } from './refs';
import { firebaseBtnListeners } from './firebase.js';
import { localStorageBtnListeners, getData } from './localeStorage';

import filmCard from '../markup-template/filmCard.hbs';
import modalFilm from '../markup-template/modalFilm.hbs';

import { loaderIsVisible, loaderIsHidden } from './loader';
import { renderPaginationMovies } from './pagination';
import { setLocation, startNavigation } from './navigation';

export const apiService = new ApiService();
export let dataArray = [];
export let targetFilm;


export function onFormSubmit(event) { 
    event.preventDefault();
      
    const moviesQuery = event.currentTarget.elements.movies.value;
    apiService.searchedMovies = moviesQuery;
    setLocation(null,moviesQuery)
     renderSearchMarkup();
     apiService.resetPage();
}

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
            .then(data => {
                apiService
                    .getGenres()
                    .then(({ genres }) => {
                        goResponseProcessing(data.results, genres);
                    })
                    .then(next => {
                        const markup = filmCard(dataArray);
                        appendMarkup(markup);
                    })
                    .catch(console.log);
                renderPaginationMovies(data.total_results, data.page);
                    console.log(data.page);
            })
            
            .catch(console.log)
    // }
}

export function renderMarkup() {
       clearGallery();
        apiService.searchedMovies = "";
    apiService
    .fetchTrendingFilms()
        .then(data => {
            apiService
                .getGenres()
                .then(({ genres }) => {
                    
                    goResponseProcessing(data.results, genres);
                })
                .then(next => {
                    const markup = filmCard(dataArray);
                    appendMarkup(markup);
                })
                .catch(console.log);
         renderPaginationMovies(data.total_results, data.page);
            })           
        .catch(console.log);     
}


export function renderLibrary(data) {
    console.log(data);
    if (!data.length) {
        appendMarkup(`<p class='library-text'>NO MOVIES HAVE BEEN ADDED HERE YET</p>`);
        return;
    }
    const markup = filmCard(data);
    appendMarkup(markup);
}








  
export function renderMarkupWatchedQueue(fetchFunc, watchedStatus, user) {
    dataArray = [];
    clearGallery();
    
    fetchFunc.then((recordsArrayFb) => {
            const records = Object.values(recordsArrayFb);
            const sortedRecords = Object.values(records).filter((record => record.uid === user.uid && record.watched === watchedStatus));

            let sortedMovies = [];
            for (const record of sortedRecords) {
                sortedMovies.push(record.movie);
            }
            
            let data = {
                page: 1,
                results: sortedMovies,
                total_results: sortedMovies.length,
                total_pages: 1,
            };

        apiService.getGenres().then(({ genres }) => {
                console.log(data.results)
                data.results.forEach(({ id, title, genre_ids, poster_path, release_date }) => {
            const filterResult = filterGenres(genre_ids, genres);
            responseProcessing(id, title, filterResult, poster_path, release_date);
            });

            }).then(next => {
                const markup = filmCard(dataArray);
                appendMarkup(markup);
            }).catch(console.log);
    }).catch(console.log);
}

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
          'https://cdn.pixabay.com/photo/2019/05/17/05/55/film-4208953_1280.jpg':
          'https://cdn.pixabay.com/photo/2019/05/17/05/55/film-4208953_1280.jpg';
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



export function renderModalFilm() {
    mainContainer.galleryContainer.addEventListener('click', (event) => {

        clearModal();
        event.preventDefault();
        const targetFilm = dataArray.find(film => film.id == event.target.parentElement.parentElement.parentElement.id);
        
        // console.log(dataArray)
        // console.log(targetFilm)
        const markup = modalFilm(targetFilm);
        // console.log(markup)
        appendMarkupModal(markup);
        firebaseBtnListeners(targetFilm);           
    });
}


function appendMarkupModal(element) {    
    modalFilmRefs.modalClear.insertAdjacentHTML('afterbegin', element);
}


function clearModal() {
    modalFilmRefs.modalClear.innerHTML = '';
}

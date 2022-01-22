import { ApiService } from './API-service';
import { API_IMG } from './const';
import { errorNotif } from './header';
import { result } from "lodash";

import { mainContainer, header, modalFilmRefs } from './refs';
import { firebaseBtnListeners } from './firebase.js';

import filmCard from '../markup-template/filmCard.hbs';
import modalFilm from '../markup-template/modalFilm.hbs';

import { loaderIsVisible, loaderIsHidden } from './loader';
import { renderPaginationMovies } from './pagination';

export const apiService = new ApiService();
export let dataArray = [];
export let targetFilm;


export function onFormSubmit(event) {
    event.preventDefault();

    loaderIsVisible();

    const moviesQuery = event.currentTarget.elements.movies.value;
    apiService.searchedMovies = moviesQuery;

    if (!moviesQuery) {
        return;
    }
    if (moviesQuery === ' ') {
        return;
    }
    apiService.fetchMoviesResults().then(resultsNotification);

    apiService.resetPage();
}

export function renderSearchMarkup() {
  clearGallery();
    apiService
        .fetchMovies()
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

export function renderMarkup(fetchFunc) {
       clearGallery();
        apiService.searchedMovies = "";
    // fetchFunc
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

function resultsNotification(results) {
    if (results.length === 0) {
        errorNotif();
    }
    if (results.length >= 1) {
        header.heroNotification.innerHTML = '';
        renderSearchMarkup();
    }
}




// export function renderModalFilm() {
//     modalFilmRefs.filmClickListener.addEventListener('click', event => {
//         event.preventDefault();
//         apiService
//             .fetchTrendingFilms()
//             .then(data => {
//                 apiService.getGenres().then(({ genres }) => {
//                     goResponseProcessing(data.results, genres);
//                 });
//                 let targetFilm = dataArray.find(film => film.id == event.path[3].id);
//                 const markup = modalFilm(targetFilm);
//                 appendMarkupModal(markup);
//                 firebaseBtnListeners(targetFilm);
//             })
//             .catch(console.log);
//         clearModal();
//     });
// }



export function renderModalFilm() {
  
    modalFilmRefs.filmClickListener.addEventListener('click',(event) => {
        event.preventDefault();
        apiService.fetchTrendingFilms().then(data => {  
            dataArray = data.results;            
            targetFilm = (dataArray.find(film => film.id == event.path[3].id));
            console.log(targetFilm);
            const markup = modalFilm(targetFilm);
            appendMarkupModal(markup);
            firebaseBtnListeners(targetFilm);
            }).catch(console.log);
            clearModal();
        }
        
    );

}

function appendMarkupModal(element) {
    modalFilmRefs.modalClear.insertAdjacentHTML('afterbegin', element);
}


function clearModal() {
    modalFilmRefs.modalClear.innerHTML = '';
}
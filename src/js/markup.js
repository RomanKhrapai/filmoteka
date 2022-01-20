import { ApiService } from "./API-service";
import { API_IMG } from "./const";
import Notiflix from 'notiflix';
import { errorNotif } from "./header";

import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

import { mainContainer, header } from "./refs";
import { firebaseBtnListeners } from "./firebase.js";

import filmCard from "../markup-template/filmCard.hbs";
import modalFilm from "../markup-template/modalFilm.hbs";
import { result } from "lodash";

const apiService = new ApiService();
let dataArray = [];



export function onFormSubmit(event) {
    event.preventDefault();
       
    const moviesQuery = event.currentTarget.elements.movies.value;
    // let trimedSearchedMovies = apiService.searchedMovies.trim();
    apiService.searchedMovies = moviesQuery;
 

    if (!moviesQuery) {
        return
    }
    if (moviesQuery === " ") {
        return
    }  
         apiService.fetchMoviesResults().then(resultsNotification) 

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
    apiService.fetchMovies().then((result) => { renderPaginationMovies(result.total_results, result.page) }).catch(console.log);
    clearGallery();
    
}




export function renderMarkup(fetchFunc) {
    //     dataArray = [];
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

export function appendMarkup(element) {
    mainContainer.galleryContainer.insertAdjacentHTML("beforeend", element); 
}


function responseProcessing(id, name, genres, imgPath, date, vote_average, vote_count, popularity, original_title, overview) {
   
    const keyData = {     

        name, id, genres, img1x: `${API_IMG.BASIC_URL}${API_IMG.FILE_SIZE_1x}${imgPath}`, date, img2x: `${API_IMG.BASIC_URL}${API_IMG.FILE_SIZE_2x}${imgPath}`,
    }
    if (!imgPath) {
        keyData.img = "https://cdn.pixabay.com/photo/2019/05/17/05/55/film-4208953_1280.jpg"

    };
    const year = !keyData.date ? "unknown" : keyData.date.slice(0,4);
    keyData.date = year;

    dataArray.push(keyData);
    console.log(dataArray);

}



export function filterGenres(conditions, array) {
    const filter = array.filter(item => conditions.includes(item.id)).map(obj => obj.name);
       if (filter.length > 2) {
            filter.splice(2);
    }  
    return filter;
}


export function clearGallery(){
    mainContainer.galleryContainer.innerHTML = '';
}

function resultsNotification(results) {
    if (results.length === 0) {
        errorNotif(); 
    }

    if (results.length >= 1) {
        header.heroNotification.innerHTML = "";
        renderSearchMarkup();
     }
}


export function renderModalFilm() {
    
    mainContainer.filmClickListener.addEventListener('click',(event) => {
        apiService.fetchTrendingFilms().then(data => {           
            dataArray = data.results;            
            let targetFilm = (dataArray.find(film => film.id == event.path[3].id));
            const markup = modalFilm(targetFilm);
            appendMarkupModal(markup);
            firebaseBtnListeners(targetFilm);
            }).catch(console.log);
            clearModal();
        }       
    );
}


function appendMarkupModal(element) {
    mainContainer.modalClear.insertAdjacentHTML("afterbegin", element); 
}

function clearModal(){
  mainContainer.modalClear.innerHTML = '';  
}

import { DB_MOVIES } from "./const";
import Notiflix from 'notiflix';
import { renderMarkupWatchedQueue, renderLibrary, getUserRecords, apiService } from './markup';
import { onToggleModal } from "./modal-film";

let chosenMovie;


function saveToLocalStorage(data) { 
    localStorage.setItem(DB_MOVIES, JSON.stringify(data));
}

export function getData() {
    const data = localStorage.getItem(DB_MOVIES);
    if (!data) {
        return [];
    }
    return JSON.parse(data);
}

function saveDataToLocalStorage(movie, status) {
    const arrayData = getData();
    if (arrayData.some(obj => obj.id === movie.id)) {
        const index = arrayData.findIndex(obj => obj.id === movie.id);
        arrayData[index].watched = status;
        saveToLocalStorage(arrayData);
        return;
    }
    movie.watched = status;
    arrayData.push(movie);
    saveToLocalStorage(arrayData);
}

function changeStatusBtn(btn, status) {
     btn.textContent = `remove from ${status}`;
}


export function getWatchedMovies(data) {
    return data.filter(movie => movie.watched === true);
}

export function getQueueMovies(data) {
    return data.filter(movie =>
        movie.watched !== true);
}


function deleteData() {
    onToggleModal();
    const arrayData = getData();
    const { movie, indexOfMovie } = findData(arrayData, chosenMovie.id);
    const newArray = [...arrayData];
    newArray.splice(indexOfMovie, 1);
    saveToLocalStorage(newArray);
}

function findData(arrayData, id) { 
    const movie = arrayData.find(obj => obj.id === id);
    const indexOfMovie = arrayData.indexOf(movie);
    return { movie, indexOfMovie };

}

function notificationAdd(movie, status) {
    Notiflix.Notify.success(`${movie.title} has been successfully added to ${status}!`);
}



function btnRemove(btn, status) {
    btn.removeEventListener('click', checkButton);
    changeStatusBtn(btn, status);
    btn.addEventListener('click', deleteData); 
}

function checkButton(e) {
      onToggleModal();
    if (e.target.id === "btn__watched") {
        notificationAdd(chosenMovie, "Watched");
        saveDataToLocalStorage(chosenMovie, true);
         btnRemove(e.target, "Watched");
        
    } else {
        notificationAdd(chosenMovie, "Queue");
        saveDataToLocalStorage(chosenMovie, false);
        btnRemove(e.target, "Queue");
    }

}

export function isMovieInLocalStorage(movie, btnWatched, btnQueue) {
    chosenMovie = movie;
    const arrayData = getData();

    const existedMovies = arrayData.filter(item => item.id === movie.id);

    if (!existedMovies.length ) {
        btnWatched.addEventListener('click', checkButton);
        btnQueue.addEventListener('click', checkButton);
        return;
     }
    
    existedMovies.forEach(item => {
        
        if (item.watched) {
            btnRemove(btnWatched, "Watched");
        } else {
            btnRemove(btnQueue, "Queue");
        }
    });

    // btnWatched.addEventListener('click', checkButton);
    // btnQueue.addEventListener('click', checkButton);
    

}



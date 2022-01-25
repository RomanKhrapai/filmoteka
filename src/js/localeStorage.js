import { DB_MOVIES } from "./const";

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
    console.log(status);
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

export function localStorageBtnListeners(btnAddToWatched, btnAddToQueue, movie) {
    btnAddToWatched.addEventListener('click', () => {
        
        saveDataToLocalStorage(movie, true);
    });
    btnAddToQueue.addEventListener('click', () => {saveDataToLocalStorage(movie, false)});
}

export function getWatchedMovies(data) {
    return data.filter(movie => movie.watched === true);
}

export function getQueueMovies(data) {
    return data.filter(movie =>
        movie.watched !== true);
}



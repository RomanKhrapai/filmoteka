// import { targetFilm } from "./markup";
import { DB_MOVIES } from "./const";



// export function onCheckedAuth(user) {
//     if (user === checkAuth) {
//         return onCheckedAuth();
//     }
    
// };



// export const loadDataFromLS = localStorageKey => {
//     try {
//         let string = localStorage.getItem(localStorageKey);
//         if (string === null) {
//             string = '[]';
//         }
//         const data = JSON.parse(string);
//         if (Array.isArray(data)) {
//             return data;
//         } else {
//             throw new Error('Object is no array');
//         }
//     } catch (err) {
//         console.error('Get locslStorage error: ', err);
//     }
// };

// export const setDataToLS = (localStorageKey, Object) => {
//     try {
//         if (Array.isArray(Object)) {
//             const string = JSON.stringify(Object);
//             localStorage.setItem(localStorageKey, string);
//         } else {
//             throw new Error('Object is not array');
//         }
//     } catch (err) {
//         console.error('Set locslStorage error: ', err);
//     }
// };

// export const addMovieToLocalStorage = (localStorageKey, newFilm) => {

//     const currentDataArray = loadDataFromLS(localStorageKey);
//     const newDataArray = newFilm;
//     if (currentDataArray.find(film => film.id === newFilm.id)) {
//         const alert = {
//             en: newFilm.title + 'arledy added to ' + strings.getString(localStorageKey + '_text'),
//         };
//         doNotification(alert.newFilm, 'faulure');
//         return;
//     } else {
//         currentDataArray.push(newDataArray);
//         setDataToLS(localStorageKey, currentDataArray);
//         const alert = {
//             en: newFilm.title + ' succesfully added to ' + strings.getString(localStorageKey + '_text'),
//         };
//         doNotification(alert.en, 'succes');
//     }
// };

// export const removeMovieFromLocalStorage = (localStorageKey, newFilm) => {
//     const currentDataArray = loadDataFromLS(localStorageKey);
//     const newDataArray = [];
//     if (currentDataArray.find(film => film.id === newFilm.id)) {
//         currentDataArray.forEach(film => {
//             if (film.id !== newFilm.id) newDataArray.push(film);
//         });
//         setDataToLS(localStorageKey, newDataArray);
//         const alert = {
//             en: newFilm.title + 'succesfully removed from ' + strings.getString(localStorageKey + '_text'),
//         };
//         doNotification(alert.en, 'success');
//     } else {
//         const alert = {
//             en: 'Not found Film ' + newFilm.title + 'in' + strings.getString(localStorageKey + '_text') + 'list',
//         };
//         doNotification(alert.en, 'failure');
//     }
// };



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

export function localStorageBtnListeners(movie) {
    const btnAddToWatched = document.getElementById("btn__watched");
    const btnAddToQueue = document.getElementById("btn__queue");
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



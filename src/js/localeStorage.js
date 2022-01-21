import { targetFilm } from "./markup";



export function onCheckedAuth(user) {
    if (user === checkAuth) {
        return onCheckedAuth()
    }
    
};



export const loadDataFromLS = localStorageKey => {
    try {
        let string = localStorage.getItem(localStorageKey);
        if (string === null) {
            string = '[]';
        }
        const data = JSON.parse(string);
        if (Array.isArray(data)) {
            return data;
        } else {
            throw new Error('Object is no array');
        }
    } catch (err) {
        console.error('Get locslStorage error: ', err);
    }
};

export const setDataToLS = (localStorageKey, Object) => {
    try {
        if (Array.isArray(Object)) {
            const string = JSON.stringify(Object);
            localStorage.setItem(localStorageKey, string);
        } else {
            throw new Error('Object is not array');
        }
    } catch (err) {
        console.error('Set locslStorage error: ', err);
    }
};

export const addMovieToLocalStorage = (localStorageKey, newFilm) => {

    const currentDataArray = loadDataFromLS(localStorageKey);
    const newDataArray = newFilm;
    if (currentDataArray.find(film => film.id === newFilm.id)) {
        const alert = {
            en: newFilm.title + 'arledy added to ' + strings.getString(localStorageKey + '_text'),
        };
        doNotification(alert.newFilm, 'faulure');
        return;
    } else {
        currentDataArray.push(newDataArray);
        setDataToLS(localStorageKey, currentDataArray);
        const alert = {
            en: newFilm.title + ' succesfully added to ' + strings.getString(localStorageKey + '_text'),
        };
        doNotification(alert.en, 'succes');
    }
};

export const removeMovieFromLocalStorage = (localStorageKey, newFilm) => {
    const currentDataArray = loadDataFromLS(localStorageKey);
    const newDataArray = [];
    if (currentDataArray.find(film => film.id === newFilm.id)) {
        currentDataArray.forEach(film => {
            if (film.id !== newFilm.id) newDataArray.push(film);
        });
        setDataToLS(localStorageKey, newDataArray);
        const alert = {
            en: newFilm.title + 'succesfully removed from ' + strings.getString(localStorageKey + '_text'),
        };
        doNotification(alert.en, 'success');
    } else {
        const alert = {
            en: 'Not found Film ' + newFilm.title + 'in' + strings.getString(localStorageKey + '_text') + 'list',
        };
        doNotification(alert.en, 'failure');
    }
};
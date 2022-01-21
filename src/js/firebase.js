// глобальні імпорти
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";

import { ApiService } from "./API-service";
import { API_IMG } from "./const";

// локальні імпорти
import { FIREBASE_CONFIG, PATH } from "../js/const.js";
import { user } from "../js/auth.js";
import { header, mainContainer } from "../js/refs.js";
import { appendMarkup, renderMarkup, filterGenres, clearGallery } from '../js/markup';
import filmCard from "../markup-template/filmCard.hbs";

const app = initializeApp(FIREBASE_CONFIG);
const provider = new GoogleAuthProvider();
const auth = getAuth();
const db = getDatabase();
const authDataRef = ref(db, PATH);
const apiService = new ApiService();
const time = Date.now();

export function firebaseBtnListeners(targetFilm) {
    const btnAddToWatched = document.getElementById("btn__watched");
    const btnAddToQueue = document.getElementById("btn__queue");
  btnAddToWatched.addEventListener('click', () => {
    saveMovieFb(targetFilm, user.uid, true),
      
      btnAddToWatched.addEventListener('click', (userFirebase) => {
      if (userFirebase) {
        saveMovieFb(targetFilm, user.uid, true);
      } else {
        saveMovieLs();
      }
    }); 
     
    btnAddToQueue.addEventListener('click', (userFirebase) => {
      if (userFirebase) {
        saveMovieFb(targetFilm, user.uid, false);
      } else {
        saveMovieLs();
      }
    });
    
    });
    btnAddToQueue.addEventListener('click', () => {saveMovieFb(targetFilm, user.uid, false)});
}

function saveMovieFb(targetFilm, uid, watched) {

    // A post entry.
    const {id, title, genre_ids, poster_path, release_date} = targetFilm;

    const recordValue = {
        time_id: time,
        uid,
        movie: {id, title, genre_ids, poster_path, release_date},
        watched: watched,
    }

    console.log(recordValue);

    if(!uid) {
        return;
    }
    set(ref(db, PATH + `${uid}-` + time), recordValue)
      .then(() => {
        // Data saved successfully!
      })
      .catch((error) => {
        // The write failed...
      });;
}

export function getMovieData (watched) {
    return onValue(authDataRef, (snapshot) => {
        const data = snapshot.val();
        // const sorted = data.map(())
        console.log(data);
        // const markup = renderMarkup(Object.values(data));
        // console.log(markup);
        // document.querySelector(".messages").innerHTML = markup;
      });
}

// function getUserMovies(array) {
//     const movies = array.map(({time_id, uid, movie, watched}) => {
//         const markup = filmCard(array);
//         appendMarkup(markup);
//     }).join('');
//     console.log(movies);
//     return movies;
// }
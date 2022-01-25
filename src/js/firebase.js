// глобальні імпорти
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";

// локальні імпорти
import { FIREBASE_CONFIG, PATH } from "./const";
import { header } from "./refs"
import { user } from "./auth";
import { getUserRecords, renderMarkupWatchedQueue } from "./markup";
import { localStorageBtnListeners } from "./localeStorage";

const app = initializeApp(FIREBASE_CONFIG);
const provider = new GoogleAuthProvider();
const auth = getAuth();
const db = getDatabase();

let btnAddToWatched;
let btnAddToQueue;

let chosenMovieRef;
let watchedMovie;
let queueMovie;

export function addWatchedQueueBtnListeners(movie) {
  btnAddToWatched = document.getElementById("btn__watched");
  btnAddToQueue = document.getElementById("btn__queue");
  chosenMovieRef = movie;
  
  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      checkIfMovieExists(chosenMovieRef);
    } else {
    localStorageBtnListeners(btnAddToWatched, btnAddToQueue, chosenMovieRef);
    }
  })
}

function checkIfMovieExists(chosenMovieRef) {
  getUserRecords().then((userRecords) => {

    const existedMovies = userRecords.filter(record => record.movie.id === chosenMovieRef.id);

    if (existedMovies.length !== 0) {

      for (const movie of existedMovies) {
        if (movie.watched === true) {
          watchedMovie = movie;
          btnRemoveFromWatched();
        } 
        
        if (movie.watched === false) {
          queueMovie = movie;
          btnRemoveFromQueue();
        }
      }
      
    } else {
      
      btnAddToWatched.addEventListener('click', checkButton);
      btnAddToQueue.addEventListener('click', checkButton);
    }
  }).catch(error => console.log(error));
}

function btnRemoveFromWatched() {
  btnAddToWatched.removeEventListener('click', checkButton);
  btnAddToWatched.textContent = "remove from Watched";
  btnAddToWatched.addEventListener('click', removeMoviefromFb);
}

function btnRemoveFromQueue() {
  btnAddToQueue.removeEventListener('click', checkButton);
  btnAddToQueue.textContent = "remove from Queue";
  btnAddToQueue.addEventListener('click', removeMoviefromFb);
}

function checkButton(e) {
  if (e.target.id === "btn__watched") {
    saveMovieFb(chosenMovieRef, user.uid, true);
  } else {
    saveMovieFb(chosenMovieRef, user.uid, false);
  }
}

function removeMoviefromFb(e) {
  let recordPath;
  
  if (e.target.id == "btn__watched") {
    recordPath = ref(db, PATH + `${watchedMovie.uid}-${watchedMovie.time_id}`);
    btnAddToWatched.textContent = "Add to Watched";
    btnAddToWatched.removeEventListener('click', removeMoviefromFb);

  } else {
    recordPath = ref(db, PATH + `${queueMovie.uid}-${queueMovie.time_id}`);
    btnAddToQueue.textContent = "Add to Queue";
    btnAddToQueue.removeEventListener('click', removeMoviefromFb);
  }
  set(recordPath, null);

  checkIfMovieExists(chosenMovieRef);
  checkLocation();
}

function saveMovieFb(chosenMovieRef, uid, watched) {
    let time = Date.now();

    // A post entry.
    const {id, title, genres, poster_path, release_date} = chosenMovieRef;

    let recordValue = {
        time_id: time,
        uid,
        movie: {id, title, genre_ids: genres, poster_path, release_date},
        watched: watched,
    }

    if(!uid | !recordValue.movie) {
        return;
    }
    
    set(ref(db, PATH + `${uid}-` + time), recordValue)
      .then(() => {
        // Data saved successfully!
      })
      .catch((error) => {
        // The write failed...
      });

    if (recordValue.watched === true) {
      btnRemoveFromWatched();
    } else {
      btnRemoveFromQueue();
    }
    checkIfMovieExists(chosenMovieRef);

    checkLocation();
}

function checkLocation() {
  if (header.btnWatched.classList.contains("is-active-btn")) {
    renderMarkupWatchedQueue(true);
  } else if (header.btnQueue.classList.contains("is-active-btn")) {
    renderMarkupWatchedQueue(false);
  }
}
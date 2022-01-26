// глобальні імпорти
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";

// локальні імпорти
import { FIREBASE_CONFIG, PATH } from "./const";
import { header } from "./refs"
import { user } from "./auth";
import { getUserRecords, renderMarkupWatchedQueue } from "./markup";
import { isMovieInLocalStorage } from "./localeStorage";


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
    isMovieInLocalStorage(chosenMovieRef, btnAddToWatched, btnAddToQueue);
    }
  })
}

function checkIfMovieExists(chosenMovieRef) {
  getUserRecords().then((userRecords) => {

    const existedMovies = userRecords.filter(record => record.movie.id === chosenMovieRef.id);

    btnAddToWatched.addEventListener('click', saveMovieFb);
    btnAddToQueue.addEventListener('click', saveMovieFb);

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
    }
  }).catch(error => console.log(error));
}

function btnRemoveFromWatched() {
  btnAddToWatched.removeEventListener('click', saveMovieFb);

  btnAddToWatched.textContent = "remove from Watched";
  btnAddToWatched.addEventListener('click', removeMoviefromFb);
}

function btnRemoveFromQueue() {
  btnAddToQueue.removeEventListener('click', saveMovieFb);

  btnAddToQueue.textContent = "remove from Queue";
  btnAddToQueue.addEventListener('click', removeMoviefromFb);
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

function saveMovieFb(e) {
  let watched;

    if (e.target.id === "btn__watched") {
      watched = true;
    } else {
      watched = false;
    }

    let time = Date.now();

    let recordValue = {
        time_id: time,
        uid: user.uid,
        movie: chosenMovieRef,
        watched,
    }

    if(!recordValue.uid | !recordValue.movie) {
        return;
    }
    
    set(ref(db, PATH + `${user.uid}-` + time), recordValue)
      .then(() => {
        checkIfMovieExists(chosenMovieRef);
        checkLocation();
        // Data saved successfully!
      })
      .catch((error) => {
        // The write failed...
      });
}

function checkLocation() {
  if (header.btnWatched.classList.contains("is-active-btn")) {
    renderMarkupWatchedQueue(true);
  } else if (header.btnQueue.classList.contains("is-active-btn")) {
    renderMarkupWatchedQueue(false);
  }
}
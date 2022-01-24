// глобальні імпорти
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";

// локальні імпорти
import { FIREBASE_CONFIG, PATH } from "../js/const.js";
import { user } from "../js/auth.js";
import { getUserRecords, userRecords, renderMarkupWatchedQueue } from "./markup.js";
import { ApiService } from './API-service';
import { localStorageBtnListeners } from "./localeStorage";

const app = initializeApp(FIREBASE_CONFIG);
const provider = new GoogleAuthProvider();
const auth = getAuth();
const db = getDatabase();
const authDataRef = ref(db, PATH);
const apiService = new ApiService();

let btnAddToWatched;
let btnAddToQueue;

let chosenMovieRef;
let movieInFb;

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
  getUserRecords().then(() => {
    const index = userRecords.findIndex(record => record.movie.id === chosenMovieRef.id);
    movieInFb = userRecords[index];
  
    if (index !== -1) {
  
      if (movieInFb.watched === true) {
        btnRemoveFromWatched();
      } else {
        btnRemoveFromQueue();
      }
  
    } else {
      console.log('not exists', movieInFb);
      btnAddToWatched.addEventListener('click', checkButton);
      btnAddToQueue.addEventListener('click', checkButton);
    }}).catch(error => console.log(error));
}

function btnRemoveFromWatched() {
  btnAddToWatched.removeEventListener('click', checkButton);
  btnAddToWatched.textContent = "remove from Watched";
  btnAddToQueue.setAttribute('disabled', true);
  btnAddToWatched.addEventListener('click', removeMoviefromFb);
}

function btnRemoveFromQueue() {
  btnAddToQueue.removeEventListener('click', checkButton);
  btnAddToQueue.textContent = "remove from Queue";
    btnAddToWatched.setAttribute('disabled', true);
    btnAddToQueue.addEventListener('click', removeMoviefromFb);
}

function removeMoviefromFb(e) {
  const recordPath = ref(db, PATH + `${movieInFb.uid}-${movieInFb.time_id}`);
  set(recordPath, null);
  

  if (e.target.id == "btn__watched") {
    btnAddToWatched.textContent = "Add to Watched";
    btnAddToQueue.removeAttribute("disabled");

    btnAddToWatched.removeEventListener('click', removeMoviefromFb);

  } else {
    btnAddToQueue.textContent = "Add to Queue";
    btnAddToWatched.removeAttribute("disabled");

    btnAddToQueue.removeEventListener('click', removeMoviefromFb);
  }
  checkIfMovieExists(chosenMovieRef);
}

function checkButton(e) {
  if (e.target.id === "btn__watched") {
    saveMovieFb(chosenMovieRef, user.uid, true);
  } else {
    saveMovieFb(chosenMovieRef, user.uid, false);
  }
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
}
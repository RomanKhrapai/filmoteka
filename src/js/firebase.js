// глобальні імпорти
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";

// локальні імпорти
import { FIREBASE_CONFIG, PATH } from "../js/const.js";
import { user } from "../js/auth.js";
import { userRecords, renderMarkup, renderMarkupWatchedQueue } from "./markup.js";
import { localStorageBtnListeners } from "./localeStorage";

const app = initializeApp(FIREBASE_CONFIG);
const provider = new GoogleAuthProvider();
const auth = getAuth();
const db = getDatabase();
const authDataRef = ref(db, PATH);

export function addWatchedQueueBtnListeners(targetFilm) {
  const btnAddToWatched = document.getElementById("btn__watched");
  const btnAddToQueue = document.getElementById("btn__queue");
  
  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
     firebaseBtnListeners(btnAddToWatched, btnAddToQueue, targetFilm);
    } else {
    localStorageBtnListeners(btnAddToWatched, btnAddToQueue, targetFilm);
    }
  })
}

function firebaseBtnListeners(btnAddToWatched, btnAddToQueue, targetFilm) {
  const index = userRecords.findIndex(record => record.movie.id === targetFilm.id);
  if (index !== -1) {
    console.log(userRecords[index]);
    if (userRecords[index].watched === true) {
      btnAddToWatched.textContent = "remove from Watched";
      btnAddToWatched.addEventListener('click', () => {removeMoviefromFb(userRecords[index])});
    } else {
      btnAddToQueue.textContent = "remove from Queue";
      btnAddToQueue.addEventListener('click', () => {removeMoviefromFb(userRecords[index])});
    }
  } else {
    btnAddToWatched.addEventListener('click', () => {saveMovieFb(targetFilm, user.uid, true)});
    btnAddToQueue.addEventListener('click', () => {saveMovieFb(targetFilm, user.uid, false)});
  }
}

function removeMoviefromFb(record) {
  const recordPath = ref(db, PATH + `${record.uid}-${record.time_id}`);
  set(recordPath, null);
}

function saveMovieFb(targetFilm, uid, watched) {
    let time = Date.now();

    // A post entry.
    const {id, title, genres, poster_path, release_date} = targetFilm;

    let recordValue = {
        time_id: time,
        uid,
        movie: {id, title, genre_ids: genres, poster_path, release_date},
        watched: watched,
    }

    console.log('recordValue', recordValue);

    if(!uid) {
        return;
    }
    set(ref(db, PATH + `${uid}-` + time), recordValue)
      .then(() => {
        // Data saved successfully!
      })
      .catch((error) => {
        // The write failed...
      });
}

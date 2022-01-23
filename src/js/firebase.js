// глобальні імпорти
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// локальні імпорти
import { FIREBASE_CONFIG, PATH } from "../js/const.js";
import { user } from "../js/auth.js";
import { renderMarkup, renderMarkupWatchedQueue } from "./markup.js";





const app = initializeApp(FIREBASE_CONFIG);
const provider = new GoogleAuthProvider();
const auth = getAuth();
const db = getDatabase();
const authDataRef = ref(db, PATH);

export function firebaseBtnListeners(targetFilm) {
    const btnAddToWatched = document.getElementById("btn__watched");
    const btnAddToQueue = document.getElementById("btn__queue");
    btnAddToWatched.addEventListener('click', () => {saveMovieFb(targetFilm, user.uid, true)});
    btnAddToQueue.addEventListener('click', () => {saveMovieFb(targetFilm, user.uid, false)});
}

function saveMovieFb(targetFilm, uid, watched) {
    let time = Date.now();

    // A post entry.
    const {id, title, genre_ids, poster_path, release_date} = targetFilm;

    let recordValue = {
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
      });
}

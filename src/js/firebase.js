// глобальні імпорти
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";

import { ApiService } from "./API-service";
import { API_IMG } from "./const";

// локальні імпорти
import { FIREBASE_CONFIG, PATH } from "../js/const.js";
import { header } from "../js/refs.js";
import { renderMarkup, responseProcessing } from '../src/js/markup';

const app = initializeApp(FIREBASE_CONFIG);
const provider = new GoogleAuthProvider();
const auth = getAuth();
const db = getDatabase();
const starCountRef = ref(db, PATH);
const apiService = new ApiService();

export function makeNewRecord(uid, id, title, genre_ids, poster_path, release_date) {
    const time = Date.now();

    // A post entry.
    const movieData = {
        id,
        poster_path,
        title,
        genre_ids,
        release_date
    };

    set(ref(db, PATH + time), {
        time_id: time,
        uid: uid,
        movie: movieData,
        watched: false,
    });
  
    // Get a key for a new Post.
    const newPostKey = push(child(ref(db), 'posts')).key;
  
    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {};
    updates['/posts/' + newPostKey] = postData;
    updates['/user-posts/' + uid + '/' + newPostKey] = postData;
  
    return update(ref(db), updates);
}
// глобальні імпорти
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";

// локальні імпорти
import { FIREBASE_CONFIG, PATH } from "../js/const.js";
import { btnHome, btnLibrary, searchButton, form, onBtnHomeClick, onFormSubmit } from './header.js';
// import "./markup.js"
import { renderMarkup } from "./markup";





const app = initializeApp(FIREBASE_CONFIG);
const provider = new GoogleAuthProvider();
const auth = getAuth();
const db = getDatabase();
const starCountRef = ref(db, PATH);

let user;

// авторизація
btnLibrary.addEventListener('click', () => {
    onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
        const {watched, queue} = userFirebase;
        user = {
            watched,
            queue
        };
        // вставити функцію, яка показує в хедері кнопки Watched i Queue

    } else {        
        signInWithPopup(auth, provider)
        .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
        }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        });
    }
  });
});

function userSignOut() {
    signOut(auth).then(() => {
    // Sign-out successful.
    }).catch((error) => {
    // An error happened.
    });
}
userSignOut();

btnHome.addEventListener('click', onBtnHomeClick);
form.addEventListener('submit', onFormSubmit);


renderMarkup();
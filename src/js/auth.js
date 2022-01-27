// глобальні імпорти
//import { initializeApp } from "firebase/app";
//import { getDatabase } from "firebase/database";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";

// локальні імпорти  FIREBASE_CONFIG,
import { NON_AUTH_ICON } from "./const.js";
import { header } from "./refs.js";
import { startNavigation } from "./navigation"
import { renderMarkupWatchedQueue, renderLibrary, getUserRecords, apiService } from './markup';
import { getWatchedMovies, getQueueMovies, getData } from './localeStorage';
import {onBtnHomeClick} from "./header"

//const app = initializeApp(FIREBASE_CONFIG);
const provider = new GoogleAuthProvider();
const auth = getAuth();
//const db = getDatabase();

export let user;

// авторизація

export function checkAuth() {
        onAuthStateChanged(auth, (userFirebase) => { 
        if (userFirebase) {
            const {photoURL, displayName, uid} = userFirebase;
            user = {
                photoURL,
                displayName,
                uid
            };
            getUserRecords();

            header.btnAuth.innerHTML = showAuthUser(user.photoURL, user.displayName);
            header.btnAuth.insertAdjacentHTML ("beforeend", getAuthMenu());

            header.btnAuth.firstChild.addEventListener('click', () => {showSignOutButton()});
            startNavigation();
        } else {
            user = {
                photoURL: NON_AUTH_ICON,
                displayName: `LOG IN`
            };
            header.btnAuth.innerHTML = showNonAuthUser(user.photoURL, user.displayName);

            header.btnAuth.firstChild.addEventListener('click', () => {
            signInWithPopup(auth, provider)
            .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            })
            .catch((error) => {
            const credential = GoogleAuthProvider.credentialFromError(error); 
            });
            })
        onBtnHomeClick(); 
         };
    });  
}

export function getWatchedData() {
    // onAuthStateChanged(auth, (userFirebase) => {
    //     if (userFirebase) {
        if (!!auth.currentUser){
            apiService.resetPage();
            apiService.watched = true;
            renderMarkupWatchedQueue(true);
        } else {
            renderLibrary(getWatchedMovies(getData()));
        }
    // })
}

export function getQueueData() {
    // onAuthStateChanged(auth, (userFirebase) => {
    //     if (userFirebase) {
        if (!!auth.currentUser){
            apiService.resetPage();
            apiService.watched = false;
            renderMarkupWatchedQueue(false);
        } else {
            renderLibrary(getQueueMovies(getData()));
        }
    // })
}

function showAuthUser(photoURL, displayName) {
    return `<button class="auth__button" aria-label="user"><span class="auth__name">${displayName}</span>
            <img src="${photoURL}" class="auth__img" alt="user image" width="20" height="20">
            </button>`
};

function showNonAuthUser(logo, displayName) {
    return `<button class="auth__button" aria-label="Log In"><span class="auth__name">${displayName}</span>
            ${logo}
            </button>`
};

function getAuthMenu() {
    return `<div class="auth__dropdown-menu">
        <a class="auth__dropdown-item" href="#">Log Out 
        <svg class="icon" id="icon-exit" viewBox="0 0 32 32">
            <path d="M24 20v-4h-10v-4h10v-4l6 6zM22 18v8h-10v6l-12-6v-26h22v10h-2v-8h-16l8 4v18h8v-6z"></path>
        </svg></a>
    </div>`
}

function showSignOutButton() {
    header.btnAuth.lastChild.style.display = "block";
    document.addEventListener('mouseup', checkClickSignOut);
    header.btnAuth.lastChild.addEventListener('click', userSignOut);
}

function checkClickSignOut(e) {
    if (!header.btnAuth.contains(e.target)) {
        header.btnAuth.lastChild.style.display = 'none';
    }
}

export function userSignOut() {
    document.removeEventListener('mouseup', checkClickSignOut);
    signOut(auth).then(() => {
    // Sign-out successful.
    }).catch((error) => {
    // An error happened.
    });
}
// глобальні імпорти
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";

// локальні імпорти
import { FIREBASE_CONFIG, PATH } from "../js/const.js";
import { header } from "../js/refs.js";

const app = initializeApp(FIREBASE_CONFIG);
const provider = new GoogleAuthProvider();
const auth = getAuth();
const db = getDatabase();
const authDataRef = ref(db, PATH);

let user;

// авторизація

export function checkAuth() {
        onAuthStateChanged(auth, (userFirebase) => {
        if (userFirebase) {
            const {photoURL, displayName} = userFirebase;
            user = {
                photoURL,
                displayName
            };
            header.btnAuth.innerHTML = getAuthData(user.photoURL, user.displayName);
            header.btnAuth.insertAdjacentHTML ("beforeend", getAuthMenu());

            header.btnAuth.firstChild.addEventListener('click', () => {
                header.btnAuth.lastChild.style.display = "block";
                document.addEventListener('mouseup', checkClickLogOut);
                header.btnAuth.lastChild.addEventListener('click', userSignOut);
            })
        } else {
            user = {
                photoURL: `https://cdn.iconscout.com/icon/premium/png-256-thumb/movie-60-165251.png`,
                displayName: `GUEST`
            };
            header.btnAuth.innerHTML = getAuthData(user.photoURL, user.displayName);

            header.btnAuth.firstChild.addEventListener('click', () => {
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
          })
        };
    });
}

function getAuthData(photoURL, displayName) {
    return `<a class="auth__button"><img src="${photoURL}" class="auth__img" width="20"><span class="auth__name">${displayName}</span></a>`
};

function getAuthMenu() {
    return `<div class="auth__dropdown-menu">
        <a class="auth__dropdown-item" href="#">Log Out 
        <svg class="icon" id="icon-exit" viewBox="0 0 32 32">
            <path d="M24 20v-4h-10v-4h10v-4l6 6zM22 18v8h-10v6l-12-6v-26h22v10h-2v-8h-16l8 4v18h8v-6z"></path>
        </svg></a>
    </div>`
}

function checkClickLogOut(e) {
    if (!header.btnAuth.contains(e.target)) {
        header.btnAuth.lastChild.style.display = 'none';
    }
}

export function userSignOut() {
    signOut(auth).then(() => {
    // Sign-out successful.
    }).catch((error) => {
    // An error happened.
    });
}
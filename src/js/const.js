import { ApiService } from "./API-service";
const apiService = new ApiService();
// Your web app's Firebase configuration
export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCHa9HUHJl3kYWqEp2WxUjmUGARX58PmUY",
  authDomain: "filmoteka-7pro.firebaseapp.com",
  databaseURL: "https://filmoteka-7pro-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "filmoteka-7pro",
  storageBucket: "filmoteka-7pro.appspot.com",
  messagingSenderId: "1040263485513",
  appId: "1:1040263485513:web:387252842d1b0210ac8798"
};

export const PATH = 'users/';

export const API = {
  BASIC_URL: "https://api.themoviedb.org",
  KEY: "967c6f14dacb0ca10f1175f7851a5869",
  
}



export const API_IMG = {
  BASIC_URL: "https://image.tmdb.org/t/p/",
  FILE_SIZE: "original",
}



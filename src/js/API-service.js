import { API } from "./const";
import axios from "axios";


export const ApiService = class {
    constructor() {
        this.page = 1;
        this.searchedMovies = '';
        this.watched = false;
    }

    async fetchTrendingFilms() {
        const response = await axios.get(`${API.BASIC_URL}/3/trending/movie/day?api_key=${API.KEY}&page=${this.page}`);
        return response.data;
    }

    async getGenres() {
        const response = await axios.get(`${API.BASIC_URL}/3/genre/movie/list?api_key=${API.KEY}`);
        return response.data;
    } 

    async  fetchMovies() {
    const response = await axios.get(`${API.BASIC_URL}/3/search/movie?api_key=${API.KEY}&language=en-US&query=${this.searchedMovies}&page=${this.page}`);
     return response.data;
  
    }
    
    async  getMovieDetails(movie_id) {
        const response = await axios.get(`${API.BASIC_URL}/3/movie/${movie_id}?api_key=${API.KEY}`);
         return response.data;
      
    }
    
    async  fetchMoviesfromFb(uid) {
    const response = await axios.get(`https://filmoteka-7pro-default-rtdb.europe-west1.firebasedatabase.app/records.json?orderBy="uid"&equalTo="${uid}"&print=pretty`);
        return response.data;
    }

    async getTrailers(movie_id){
        const response = await axios.get(`${API.BASIC_URL}/3/movie/${movie_id}/videos?api_key=${API.KEY}&language=en-US`);
        return response.data;             
    }

    increasePage() {
        this.page += 1;
    }

    decreasePage() {
        this.page -= 1;
    }
 
      resetPage() {

        this.page = 1
    }

}



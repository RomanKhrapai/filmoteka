import { API } from "./const";
import axios from "axios";


export const ApiService = class {
    constructor() {
        this.page = 1;
         this.searchedMovies = ''
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
    
    async  fetchMoviesResults() {
    const response = await axios.get(`${API.BASIC_URL}/3/search/movie?api_key=${API.KEY}&language=en-US&query=${this.searchedMovies}&page=${this.page}`);
     return response.data.results;
  
    }
    
      async  fetchMoviesTotalResults() {
    const response = await axios.get(`${API.BASIC_URL}/3/search/movie?api_key=${API.KEY}&language=en-US&query=${this.searchedMovies}&page=${this.page}`);
     return response.data.total_results;
  
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



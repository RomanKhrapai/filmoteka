import { API } from "./const";
import axios from "axios";


export const ApiService = class {
    constructor() {
        this.page = 1;
    }

    async fetchTrendingFilms() {
        const response = await axios.get(`${API.BASIC_URL}/3/trending/movie/day?api_key=${API.KEY}&page=${this.page}`);
        return response.data;
    }

      async getGenres() {
        const response = await axios.get(`${API.BASIC_URL}/3/genre/movie/list?api_key=${API.KEY}`);
        return response.data;
    } 

    increasePage() {
        this.page += 1;
    }

    decreasePage() {
        this.page -= 1;
    }

}



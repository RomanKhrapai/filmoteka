import { ApiService } from "./API-service";
import { API_IMG } from "./const";

import { galleryContainer } from "./refs";
console.log();
import filmCard from "../markup-template/filmCard.hbs"


const apiService = new ApiService();
 const dataArray = [];



export function renderMarkup() {
    apiService.fetchTrendingFilms().then(data => {
        
        data.results.forEach(({ id, title, genre_ids, poster_path, release_date }) => {
           responseProcessing(id, title, genre_ids, poster_path, release_date);
        });
        const markup = filmCard(dataArray);
        
        appendMarkup(markup);
       
    }).catch(console.log);

}


function appendMarkup(element) {
    galleryContainer.insertAdjacentHTML("beforeend", element); 
}


function responseProcessing(id, name, genres, imgPath, date) {
    const keyData = {
        name, id, genres, img: `${API_IMG.BASIC_URL}${API_IMG.FILE_SIZE}${imgPath}`, date,
    }
    dataArray.push(keyData);


}





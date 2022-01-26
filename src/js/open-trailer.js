import axios from "axios";
import { API } from "./const";
import { modalFilmRefs } from "./refs";
import {scrolDown} from "./navigation"
let btnTrailerCheck = false;


async function getTrailers(movie_id){
    const response = await axios.get(`${API.BASIC_URL}/3/movie/${movie_id}/videos?api_key=${API.KEY}&language=en-US`);
    return response.data;             
}

export function  trailer(id){   
    btnTrailerCheck = true;
    getTrailers(id)
    .then((data)=>{
     if(!data.results.length){
       return;  
     }
     const videoBox = document.getElementById('show-video');
      const btnOpenTrailer = document.getElementById('btn__trailer'); 
     btnOpenTrailer.removeAttribute('disabled');
 btnOpenTrailer.addEventListener("click",(event)=>{TrailerBtnClick(event,data.results[0].key,videoBox)});
    })
    .catch(()=>{
        problemVideo();
        })
 }

function createVideo(idTrailer){
  return `
  <div class="show-video">
  <iframe class="show-video__playr"
   src='https://www.youtube.com/embed/${idTrailer}'frameborder="0" allow="accelerometer;
    autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>`;
}

function problemVideo(){
    return `
    <div class="show-video">
    <iframe class="show-video__playr"
src='http://www.youtube.com/embed/zwBpUdZ0lrQ' frameborder="0" allow="accelerometer;
 autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
 </div>`;
}

function TrailerBtnClick(event,idTrailer,videoBox){
    if(!btnTrailerCheck){
        event.target.innerText = 'open trailer'
        videoBox.innerHTML="";
        btnTrailerCheck = true;
    }else{
        event.target.innerText = 'close trailer';
        videoBox.innerHTML= createVideo(idTrailer);
        scrolDown(modalFilmRefs.modal.querySelector(".modal"));
        btnTrailerCheck = false;
    }   
}  


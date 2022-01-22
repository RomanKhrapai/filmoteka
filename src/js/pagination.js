import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { renderMarkup, renderSearchMarkup, apiService} from "./markup.js";

export function renderPaginationMovies(totalItems, currentPage) {
    const container = document.getElementById('tui-pagination-container');
    
    const options = {
        totalItems,
        itemsPerPage: 20,
        visiblePages: 7,
        page: currentPage,
        centerAlign: true,
        firstItemClassName: 'tui-first-child',
        lastItemClassName: 'tui-last-child',
        template: {
            page: '<a href="#" class="tui-page-btn button_modifier">{{page}}</a>',
            currentPage: '<strong class="tui-page-btn button_modifier tui-is-selected selected-accent">{{page}}</strong>',
            moveButton:
                '<a href="#" class="tui-page-btn button_more tui-{{type}}">' +
                '<span class="tui-ico-{{type}}">{{type}}</span>' +
                '</a>',
            disabledMoveButton:
                '<span class="tui-page-btn button_modifier tui-is-disabled tui-{{type}}">' +
                '<span class="tui-ico-{{type}}">{{type}}</span>' +
                '</span>',
            moreButton:
                '<a href="#" class="tui-page-btn button_more tui-{{type}}-is-ellip">' +
                '<span class="tui-ico-ellip">...</span>' +
                '</a>'
        },
    }
    
    const instance = new Pagination(container, options);
    instance.on('afterMove', (event) => {
        apiService.page = event.page;
        if(apiService.searchedMovies)
        {renderSearchMarkup()
        }else{
    renderMarkup(apiService.fetchTrendingFilms())
        }
    });
}

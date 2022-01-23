import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { renderMarkup, renderSearchMarkup, apiService } from "./markup.js";
import { loaderIsVisible } from './loader.js';
import { setLocation, scrolTop } from './navigation.js';

export function renderPaginationMovies(totalItems, currentPage) {
    const container = document.getElementById('tui-pagination-container');
    
    const options = {
        totalItems,
        itemsPerPage: 20,
        visiblePages: 5,
        page: currentPage,
        centerAlign: true,
        firstItemClassName: 'tui-first-child',
        lastItemClassName: 'tui-last-child',
        template: {
            page: '<a href="#" class="tui-page-btn button_modifier">{{page}}</a>',
            currentPage: '<strong class="tui-page-btn button_modifier tui-is-selected selected-accent">{{page}}</strong>',
            moveButton:
                '<a href="#" class="tui-page-btn tui-{{type}} button_more-{{type}}">' +
                    '<span class="tui-ico-{{type}}" id="icon_modifier">{{type}}</span>' +
                '</a>',
            disabledMoveButton:
                '<span class="tui-page-btn tui-is-disabled tui-{{type}} button_modifier-{{type}}">' +
                    '<span class="tui-ico-{{type}}">{{type}}</span>' +
                '</span>',
            moreButton:
                '<a href="#" class="tui-page-btn button_more tui-{{type}}-is-ellip" id="visually-hidden">' +
                '<span class="tui-ico-ellip">...</span>' +
                '</a>'
        },
    }

    if (document.documentElement.scrollWidth > 767) {
        options.visiblePages = 7;
    }

    const instance = new Pagination(container, options);
    instance.on('afterMove', (event) => {
        loaderIsVisible();
        apiService.page = event.page;
        setLocation(null,null,event.page);
        scrolTop();

        if (apiService.searchedMovies) {
            renderSearchMarkup()
        } else {
            renderMarkup()
        }
    });
}

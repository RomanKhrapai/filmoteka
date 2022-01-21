import { header } from './refs';

export function loaderIsVisible() {
    header.loader.style.display = 'flex';
}

export function loaderIsHidden() {
    header.loader.style.display = 'none';
}
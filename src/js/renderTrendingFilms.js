import cardFilm from '../templates/card';
import APi from '../apiServises/apiService';
import { createObj } from '../apiServises/normalizeResults';
import { showSpinner, hideSpinner } from '../js/spiner';
import { openModal } from './renderMovieInfo';
import refs from './refs';
import { hideEmptyLib } from './userLibrary';
import { hideEmptySearch } from './renderSearch';
import { hidePagination, showPagination } from './userLibrary';
import { pagination } from './pagination';

// отрисовка популярных фильмов при загрузке страницы;
document.addEventListener('DOMContentLoaded', renderTrending);
refs.logoLink.addEventListener('click', renderHomePage);
refs.homeLink.addEventListener('click', renderHomePage);

function renderHomePage() {
  pagination.movePageTo(1);
  showPagination();
  hideEmptySearch();
  hideEmptyLib();
  clearQuery();
  showSpinner();
  APi.resetPage();
  renderTrending();
}

export default async function renderTrending() {
  try {
    const trends = await APi.fetchTrending().then(data => {
      APi.setTotalPage(data.total_pages);
      if (data.total_pages < 6) {
        pagination.reset(data.total_pages);
      }
      return data.results;
    });
    const genres = await APi.getGenresList().then(list => {
      return list.genres;
    });
    const result = await createObj(trends, genres);
    refs.cardList.innerHTML = cardFilm(result);
  } catch (error) {
    console.log('error :>> ', error);
  } finally {
    hideSpinner();
  }
}

function clearQuery() {
  refs.search.query.value = '';
}

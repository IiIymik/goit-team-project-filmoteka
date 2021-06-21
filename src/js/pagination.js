import renderTrending from './renderTrendingFilms';
import renderSearch from './renderSearch';
import { showSpinner, hideSpinner} from './spiner.js';
import Pagination from 'tui-pagination';
import API from '../apiServises/apiService.js';

creatDivEl("card__section", "tui-pagination");
const options = {
  totalItems: 1000,
  itemsPerPage: 1,
  visiblePages: 5,
  page: 1,
  centerAlign: false,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
};

const smoothScrool = () =>  { window.scrollTo({ top: 0, behavior: 'smooth' });
};

const pagination = new Pagination('pagination', options);

function chooseRender(currentPage) {
  API.setPage(currentPage);
  if (API.searchQuery === '') {
    renderTrending()
    hideSpinner()
  } else {
    renderSearch()
    hideSpinner()
  }
};

pagination.on('afterMove', function (evt) {
  let currentPage = evt.page;
  showSpinner();
  smoothScrool();
  chooseRender(currentPage);
});

function creatDivEl(selector, divSelector){
  const elWhere = `.${selector}`;
  const elWhich = `.${divSelector}`;
  const findElWhere = document.querySelector(elWhere);

  const createEL = `<div id="pagination" class="${elWhich}"></div>`
  findElWhere.insertAdjacentHTML('afterend', createEL);
};

creatDivEl("card__section","tui-pagination");

export {pagination};
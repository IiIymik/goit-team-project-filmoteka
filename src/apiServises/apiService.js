export const API_KEY = 'a6a422d110dec9c7fa9eeee757b6f274';
export const BASE_URL = 'https://api.themoviedb.org/3'
export default {
    mediaType: 'movie',
    timeWindow: 'week',
    searchQuery: '',
    page: 1,
  language: 'en',
    totalPage: 1000,


// поиск популярных фильмов для вывода на страницу
  fetchTrending() {
        const url = `${BASE_URL}/trending/${this.mediaType}/${this.timeWindow}?api_key=${API_KEY}&page=${this.page}&language=${this.language}`;
    this.stringUrl = url;
      return fetch(url)
            .then(res => res.json())
            .catch((error) => console.log(error))
    },

// поиск фильма по названию
    searchMovie() {
        const url = `${BASE_URL}/search/${this.mediaType}?api_key=${API_KEY}&query=${this.searchQuery}&page=${this.page}&language=${this.language}`;
      return fetch(url)
            .then(res => res.json())
            .catch((error) => console.log(error))

    },

// получение полной информации о фильме
    getMovieInfoById(id) {
        const url = `${BASE_URL}/${this.mediaType}/${id}?api_key=${API_KEY}&language=${this.language}`;
        return fetch(url)
            .then(res => res.json())
            .catch((error) => console.log(error))
    },

// получение полного списка жанров
    getGenresList() {
      const url = `${BASE_URL}/genre/${this.mediaType}/list?api_key=${API_KEY}&language=${this.language}`;
        return fetch(url)
            .then(res => res.json())
            .catch((error) => console.log(error))
    },

// для работы со страницами (предварительно)
    resetPage() {
        this.page = 1;
    },
    incrementPage() {
        this.page += 1;
    },
    decrementPage() {
        this.page -= 1;
  },
    setPage(value) {
    this.page = value;
  },
  setTotalPage(value) {
    this.totalPage = value;
  },
  getTotalPage() {
    return this.totalPage;
  },
// для работы со поисковым запросом (предварительно)
    get query() {
        return this.searchQuery;
    },
    set query(value) {
        this.searchQuery = value;
    },
// для работы с языком поиска (предварительно)
    get language() {
        return this.searchQuery;
    },
    set language(value) {
        this.searchQuery = value;
  },
  get pages() {
    return this.page;
  },
  set pages(num) {
    this.page = num;
  },
  get totalPages() {
    return this.totalPage;
  },
  set totalPages(num) {
    this.totalPage = num;
  },
};
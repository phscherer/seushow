import axios from 'axios';

const API_KEY = 'abbc8b6f414960dbb24217af0826cf11';
const DISCOVER_URL = 'https://api.themoviedb.org/3/discover/';

export const LOAD_BY_POPULARITY = 'LOAD_BY_POPULARITY';

export function loadByPopularity() {
  const url = `${DISCOVER_URL}movie?sort_by=popularity.desc&api_key=${API_KEY}&language=pt_BR`
  const request = axios.get(url);

  return {
    type: LOAD_BY_POPULARITY,
    payload: request
  };
}

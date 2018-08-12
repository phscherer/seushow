import { API_KEY } from '../actionTypes/app';
import { DISCOVER_PATH } from '../actionTypes/movies';
import axios from 'axios';

export const LOAD_BY_POPULARITY = 'LOAD_BY_POPULARITY';

export function loadByPopularity() {
  const url = `${DISCOVER_PATH}movie?sort_by=popularity.desc&api_key=${API_KEY}&language=pt_BR`
  const request = axios.get(url);

  return {
    type: LOAD_BY_POPULARITY,
    payload: request
  };
}

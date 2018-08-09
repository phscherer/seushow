import { LOAD_BY_POPULARITY } from '../actions/movies';

export default function(state = [], action) {
  switch(action.type) {
    case LOAD_BY_POPULARITY:
      return [ action.payload.data, ...state ];
  }
  return state;
}

/*
 *
 * Search reducer
 *
 */

import { fromJS } from 'immutable';
import * as C from './constants';

const initialState = fromJS({
  results: false
});

function searchReducer(state = initialState, action) {
  switch (action.type) {
    case C.SEARCH_QUERY_SUC:{
      return state.set('results', action.data.data)
    }
    default:
      return state;
  }
}

export default searchReducer;

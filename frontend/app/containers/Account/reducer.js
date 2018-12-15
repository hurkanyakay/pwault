/*
 *
 * Account reducer
 *
 */

import { fromJS } from 'immutable';
import * as C from './constants';

const initialState = fromJS({
  singleAcc: false,
  favicon: false,
});

function accountReducer(state = initialState, action) {
  switch (action.type) {
    case C.SINGLE_ACCOUNT_FETCH_SUC: {
      return state.set('singleAcc', action.data)
    }
    case C.GETFAVICON_SUC: {
      return state.set('favicon', action.data)
    }
    case C.SINGLE_ACCOUNT_RESET: {
      return state.set('singleAcc', false).set('favicon', false)
    }
    default:
      return state;
  }
}

export default accountReducer;

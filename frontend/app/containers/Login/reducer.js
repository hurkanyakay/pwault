/*
 *
 * Login reducer
 *
 */

import { fromJS } from 'immutable';
// import {
//   DEFAULT_ACTION,
// } from './constants';

const initialState = fromJS({});

function loginReducer(state = initialState, action) {
  switch (action.type) {

    default:
      return state;
  }
}

export default loginReducer;

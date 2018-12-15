/*
 *
 * App reducer
 *
 */
// import { fromJS } from 'immutable';
import { LOGIN_SUC } from 'containers/Login/constants';
import * as C from '../constants';

const initialState = {
  fetching: false,
  isAuthenticated: false,
};

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case C.VERIFY_TOKEN_REQ:{
      return {
        ...state,
        fetching: true,
        isAuthenticated: false,
      };
    }
    case C.VERIFY_TOKEN_SUC:{
      return {
        ...state,
        fetching: false,
        isAuthenticated: true,
      };
    }
    case LOGIN_SUC:{
      return {
        ...state,
        fetching: false,
        isAuthenticated: true,
      };
    }
    case C.LOGOUT:{
      return initialState;
    }
    case C.COMMON_ERROR:{
      return initialState;
    }

    default:
      return state;
  }
}

export default sessionReducer;

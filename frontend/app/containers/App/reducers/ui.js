import * as Constants from 'containers/App/constants';
import cuid from 'cuid';
import { fromJS } from 'immutable';

const initialState = fromJS({
  flashMessages: [],
  pageLoading: false,
  modals: [],
});

/* eslint no-param-reassign: 0 */
const ui = (state = initialState, action) => {
  switch (action.type) {
    case Constants.OPEN_FLASH_MESSAGE: {
      if (!action.message.cuid) { action.message.cuid = cuid(); }
      return state.set('flashMessages', state.get('flashMessages').push(action.message));
    }
    case Constants.CLOSE_FLASH_MESSAGE: {
      const dIndex = state.get('flashMessages').findIndex((item) => item.cuid === action.message.cuid);
      return state.set('flashMessages', state.get('flashMessages').delete(dIndex));
    }
    case Constants.OPEN_PAGE_LOADING:
      return state
        .set('pageLoading', true);
    case Constants.CLOSE_PAGE_LOADING:
      return state
        .set('pageLoading', false);

    case Constants.OPEN_MODAL: {
      if (!action.obj.cuid) { action.obj.id = cuid(); }
      return state.set('modals', state.get('modals').push(action.obj));
    }
    case Constants.CLOSE_MODAL: {
      const MIndex = state.get('modals').findIndex((item) => item.id === action.obj.id);
      return state.set('modals', state.get('modals').delete(MIndex));
    }
    case 'RESET_ALL':
      return initialState;
    default:
      return state;
  }
};

export default ui;

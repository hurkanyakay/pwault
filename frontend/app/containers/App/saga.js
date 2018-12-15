import { delay } from 'redux-saga';
import { put, call, takeEvery,takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { get } from 'lodash';
import request from 'utils/request';
import * as UiActions from 'containers/App/actions/ui';
import * as C from 'containers/App/constants';
import * as Actions from './actions/common';

/* eslint no-console: 0 */
export function* handleFailure(action) {
  if (action.error === 'TypeError: Failed to fetch') {
    const message = {
      context: [{ detail: 'There is a problem with your connection!' }],
      status: 'error',
      timeout: 4000,
    };
    yield put(UiActions.openFlashMessage(message));
  } else if (action.error.response) {
    if (action.error.response.status === 401 || action.error.response.status === 403 || action.error.response.status === 404) { // not authorized
      yield put(push('/login'));
    } else if (action.error.response.status === 422) {
      const message = {
        context: [{ detail: 'There is a problem with your connection! 422' }],
        status: 'error',
        timeout: 4000,
      };
      yield put(UiActions.openFlashMessage(message));
    } else if (action.error.response.status <= 600 && action.error.response.status >= 400) { // server problem
      const message = {
        context: [{ detail: 'There is a problem with your server!' }],
        status: 'error',
        timeout: 4000,
      };
      yield put(UiActions.openFlashMessage(message));
    } else {
      console.log(action.error);
    }
  } else {
    const message = {
      context: [{ detail: 'There is a problem with your system!' }],
      status: 'error',
      timeout: 4000,
    };
    yield put(UiActions.openFlashMessage(message));
    console.log(action.error);
  }
}

export function* handleFlashMessage(action) {
  if (action.message.timeout) {
    yield call(delay, action.message.timeout);
    yield put(UiActions.closeFlashMessage(action.message));
  }
}

export function* verifyToken(action) {
  const { token = {} } = action;
  const requestURL = '/api/login/verify';
  const options = {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      data: {
        token
      }
    })
  }
  yield put(UiActions.openPageLoading())
  try {
    const datas = yield call(request, requestURL, options);
    yield put(UiActions.closePageLoading())

    if(datas.token){
      yield put(Actions.tokenVerifySuc(datas))
    }else{
      const message = {
        context: [{ detail: 'Token expired!' }],
        status: 'error',
        timeout: 4000,
      };
      yield put(UiActions.openFlashMessage(message));
      yield put(Actions.commonError("Token expired!"));
      localStorage.removeItem('token')
    }
  } catch (err) {
    yield put(UiActions.closePageLoading())
    yield put(Actions.commonError(err));
  }
}
/**
 * Root saga manages watcher lifecycle
 */
export function* rootSaga() {
  yield takeEvery((action) => /ERROR$/.test(action.type), handleFailure);
  yield takeEvery(C.OPEN_FLASH_MESSAGE, handleFlashMessage);
  yield takeLatest(C.VERIFY_TOKEN_REQ, verifyToken);
}

export default rootSaga;

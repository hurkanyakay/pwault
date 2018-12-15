import { call, put, takeEvery } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import request from 'utils/request';
import * as UiActions from 'containers/App/actions/ui';
import * as CommonActions from 'containers/App/actions/common';
import { push } from 'react-router-redux';
import * as C from './constants';
import * as Actions from './actions';

export function* SingleAccountFetch(action) {
  const { id } = action.data;
  const requestURL = '/api/accounts';
  const options = {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token')
    },
    method: 'POST',
    body: JSON.stringify({
      data: {
        id
      }
    })
  }
  yield put(UiActions.openPageLoading())
  try {
    const datas = yield call(request, requestURL, options);
    yield put(Actions.SingleAccountFetchSuc(datas))
    yield put(UiActions.closePageLoading())
  } catch (err) {
    yield put(UiActions.closePageLoading())
    yield put(CommonActions.commonError(err));
  }
}

export function* SingleAccountSave(action) {
  const requestURL = '/api/accounts/new';
  const options = {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token')
    },
    method: 'POST',
    body: JSON.stringify({
      data: action.data
    })
  }
  yield put(UiActions.openPageLoading())
  try {
    const datas = yield call(request, requestURL, options);
    yield put(UiActions.closePageLoading())
    if(datas.error){
      const message = {
        context: [{ detail: datas.error }],
        status: 'error',
        timeout: 2000
      }
      yield put(UiActions.openFlashMessage(message))
    }else{
      yield put(Actions.SingleAccountSaveSuc(datas))
      const message = {
        context: [{ detail: datas.result }],
        status: 'success',
        timeout: 2000
      }
      yield put(UiActions.openFlashMessage(message))
    }
  } catch (err) {
    yield put(UiActions.closePageLoading())
    yield put(CommonActions.commonError(err));
  }
}

export function* SingleAccountUpdate(action) {
  const requestURL = '/api/accounts/update';
  const options = {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token')
    },
    method: 'POST',
    body: JSON.stringify({
      data: action.data
    })
  }
  yield put(UiActions.openPageLoading())
  try {
    const datas = yield call(request, requestURL, options);
    yield put(UiActions.closePageLoading())
    if(datas.error){
      const message = {
        context: [{ detail: datas.error }],
        status: 'error',
        timeout: 2000
      }
      yield put(UiActions.openFlashMessage(message))
    }else{
      yield put(Actions.SingleAccountUpdateSuc(datas))
      const message = {
        context: [{ detail: datas.result }],
        status: 'success',
        timeout: 2000
      }
      yield put(UiActions.openFlashMessage(message))
    }
  } catch (err) {
    yield put(UiActions.closePageLoading())
    yield put(CommonActions.commonError(err));
  }
}
export function* SingleAccountDelete(action) {
  const { id } = action.data;
  const requestURL = '/api/accounts/delete';
  const options = {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token')
    },
    method: 'POST',
    body: JSON.stringify({
      data: {
        id: action.data
      }
    })
  }
  yield put(UiActions.openPageLoading())
  try {
    const datas = yield call(request, requestURL, options);
    yield put(Actions.SingleAccountDeleteSuc(datas))
    yield put(UiActions.closePageLoading())
    const message = {
      context: [{ detail: datas.result }],
      status: 'success',
      timeout: 2000
    }
    yield put(UiActions.openFlashMessage(message))
    yield call(delay, 2000);
    yield put(push('/'));
  } catch (err) {
    yield put(UiActions.closePageLoading())
    yield put(CommonActions.commonError(err));
  }
}
export function* getFavicon(action) {
  const website = action.data;
  const requestURL = '/api/accounts/favicon';
  const options = {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token')
    },
    method: 'POST',
    body: JSON.stringify({
      data: {
        website
      }
    })
  }
  try {
    const datas = yield call(request, requestURL, options);
    yield put(Actions.getFaviconSuc(datas))
  } catch (err) {
    yield put(CommonActions.commonError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield takeEvery(C.SINGLE_ACCOUNT_FETCH_REQ, SingleAccountFetch);
  yield takeEvery(C.SINGLE_ACCOUNT_SAVE_REQ, SingleAccountSave);
  yield takeEvery(C.SINGLE_ACCOUNT_UPDATE_REQ, SingleAccountUpdate);
  yield takeEvery(C.SINGLE_ACCOUNT_DELETE_REQ, SingleAccountDelete);
  yield takeEvery(C.GETFAVICON_REQ, getFavicon);
}

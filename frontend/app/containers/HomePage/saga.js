import { call, put, takeEvery } from 'redux-saga/effects';
import request from 'utils/request';
import * as UiActions from 'containers/App/actions/ui';
import * as CommonActions from 'containers/App/actions/common';
import * as C from './constants';
import * as Actions from './actions';

export function* AllAccountsFetch() {
  const requestURL = '/api/accounts/all';
  const options = {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token')
    },
    method: 'POST',
    body: JSON.stringify({
      data: {
      }
    })
  }
  yield put(UiActions.openPageLoading())
  try {
    const datas = yield call(request, requestURL, options);
    yield put(Actions.AllAccountsFetchSuc(datas))
    yield put(UiActions.closePageLoading())
  } catch (err) {
    yield put(UiActions.closePageLoading())
    yield put(CommonActions.commonError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield takeEvery(C.ALL_ACCOUNTS_FETCH_REQ, AllAccountsFetch);
}

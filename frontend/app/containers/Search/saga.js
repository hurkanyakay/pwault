import { call, put, takeEvery } from 'redux-saga/effects';
import request from 'utils/request';
import * as UiActions from 'containers/App/actions/ui';
import * as CommonActions from 'containers/App/actions/common';
import * as C from './constants';
import * as Actions from './actions';
import { push } from 'react-router-redux'

export function* SearchQuery(action) {
  const requestURL = '/api/accounts/search';
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

    if(datas.data.length > 0){
      yield put(Actions.searchQuerySuc(datas))
    }else{
      const {title, url} = action.data;
      yield put(push(`/account/new?title=${title}&url=${url}`))
    }
  } catch (err) {
    yield put(UiActions.closePageLoading())
    yield put(CommonActions.commonError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield takeEvery(C.SEARCH_QUERY_REQ, SearchQuery);
}

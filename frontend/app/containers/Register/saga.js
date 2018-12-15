import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { commonError } from 'containers/App/actions/common';
import * as UiActions from 'containers/App/actions/ui';
import * as C from './constants';
import * as Actions from './actions';
import { push } from 'react-router-redux'

export function* registerReq(action) {
  const { data : { name, password, redirect } = {} } = action;
  const requestURL = '/api/register';
  const options = {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      data: {
        name, password
      }
    })
  }
  if(name === ''){
    const message = {
      context: [{ detail: 'Name is missing!' }],
      status: 'error',
      timeout: 2000
    }
    yield put(UiActions.openFlashMessage(message))
    return;
  }else if(password === ''){
    const message = {
      context: [{ detail: 'Password is missing!' }],
      status: 'error',
      timeout: 2000
    }
    yield put(UiActions.openFlashMessage(message))
    return;
  }

  yield put(UiActions.openPageLoading())
  try {
    const datas = yield call(request, requestURL, options);
    yield put(UiActions.closePageLoading())
    if(datas.error) {
      const message = {
        context: [{ detail: datas.error }],
        status: 'error',
        timeout: 2000
      }
      yield put(UiActions.openFlashMessage(message))
    }else{
      yield put(Actions.registerSuc(datas));
      localStorage.setItem('token', datas.token)
      yield put(push(redirect))
    }
  } catch (err) {
    yield put(UiActions.closePageLoading())
    yield put(commonError(err));
  }
}
/**
 * Root saga manages watcher lifecycle
 */
export default function* data() {
  yield takeLatest(C.REGISTER_REQ, registerReq);
}

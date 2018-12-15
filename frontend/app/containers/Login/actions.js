/*
 *
 * Login actions
 *
 */

import * as C from './constants';

export function loginReq(data) {
  return {
    type: C.LOGIN_REQ,
    data
  };
}
export function loginSuc(data) {
  return {
    type: C.LOGIN_SUC,
    data
  };
}

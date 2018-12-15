/*
 *
 * Register actions
 *
 */

import * as C from './constants';

export function registerReq(data) {
  return {
    type: C.REGISTER_REQ,
    data
  };
}
export function registerSuc(data) {
  return {
    type: C.REGISTER_SUC,
    data
  };
}

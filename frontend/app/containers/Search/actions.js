/*
 *
 * Search actions
 *
 */

import * as C from './constants';

export function searchQueryReq(data) {
  return {
    type: C.SEARCH_QUERY_REQ,
    data
  };
}
export function searchQuerySuc(data) {
  return {
    type: C.SEARCH_QUERY_SUC,
    data
  };
}

import * as C from '../constants';

export function tokenVerifyReq(token) {
  return {
    type: C.VERIFY_TOKEN_REQ,
    token,
  };
}
export function tokenVerifySuc(data) {
  return {
    type: C.VERIFY_TOKEN_SUC,
    data,
  };
}

export function logout() {
  return {
    type: C.LOGOUT,
  };
}
export function commonError(error) {
  return {
    type: C.COMMON_ERROR,
    error,
  };
}

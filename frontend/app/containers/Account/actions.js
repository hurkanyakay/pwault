/*
 *
 * Account actions
 *
 */

 import * as C from './constants';

 export function SingleAccountFetchReq(data) {
   return {
     type: C.SINGLE_ACCOUNT_FETCH_REQ,
     data
   };
 }
 export function SingleAccountFetchSuc(data) {
   return {
     type: C.SINGLE_ACCOUNT_FETCH_SUC,
     data
   };
 }
 export function SingleAccountReset() {
   return {
     type: C.SINGLE_ACCOUNT_RESET,
   };
 }

 export function SingleAccountUpdateReq(data) {
   return {
     type: C.SINGLE_ACCOUNT_UPDATE_REQ,
     data
   };
 }
 export function SingleAccountUpdateSuc(data) {
   return {
     type: C.SINGLE_ACCOUNT_UPDATE_SUC,
     data
   };
 }

 export function SingleAccountDeleteReq(data) {
   return {
     type: C.SINGLE_ACCOUNT_DELETE_REQ,
     data
   };
 }
 export function SingleAccountDeleteSuc(data) {
   return {
     type: C.SINGLE_ACCOUNT_DELETE_SUC,
     data
   };
 }

 export function SingleAccountSaveReq(data) {
   return {
     type: C.SINGLE_ACCOUNT_SAVE_REQ,
     data
   };
 }
 export function SingleAccountSaveSuc(data) {
   return {
     type: C.SINGLE_ACCOUNT_SAVE_SUC,
     data
   };
 }

 export function getFaviconReq(data) {
   return {
     type: C.GETFAVICON_REQ,
     data
   };
 }
 export function getFaviconSuc(data) {
   return {
     type: C.GETFAVICON_SUC,
     data
   };
 }

/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const DEFAULT_LOCALE = 'en';

export const OPEN_FLASH_MESSAGE = 'OPEN_FLASH_MESSAGE';
export const CLOSE_FLASH_MESSAGE = 'CLOSE_FLASH_MESSAGE';

export const OPEN_PAGE_LOADING = 'OPEN_PAGE_LOADING';
export const CLOSE_PAGE_LOADING = 'CLOSE_PAGE_LOADING';

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const COMMON_ERROR = 'COMMON_ERROR';
export const LOGOUT = 'LOGOUT';

export const VERIFY_TOKEN_REQ = 'VERIFY_TOKEN_REQ';
export const VERIFY_TOKEN_SUC = 'VERIFY_TOKEN_SUC';

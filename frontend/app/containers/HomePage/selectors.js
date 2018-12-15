/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');

const makeSelectAllAccounts = () => createSelector(
  selectHome,
  (homeState) => homeState.get('AllAccounts').toJS()
);

export {
  selectHome,
  makeSelectAllAccounts,
};

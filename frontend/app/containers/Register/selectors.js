import { createSelector } from 'reselect';

/**
 * Direct selector to the register state domain
 */
const selectRegisterDomain = (state) => state.get('register');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Register
 */

const makeSelectRegister = () => createSelector(
  selectRegisterDomain,
  (substate) => substate.toJS()
);

export default makeSelectRegister;
export {
  selectRegisterDomain,
};

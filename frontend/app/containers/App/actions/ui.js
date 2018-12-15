import * as Constants from '../constants';

// const message = {
//   context: [{ detail: 'this is a success message' }],
//   status: 'success',
//   timeout: 500
// }
export function openFlashMessage(message) {
  return {
    type: Constants.OPEN_FLASH_MESSAGE,
    message,
  };
}
export function closeFlashMessage(message) {
  return {
    type: Constants.CLOSE_FLASH_MESSAGE,
    message,
  };
}

export function openPageLoading() {
  return {
    type: Constants.OPEN_PAGE_LOADING,
  };
}
export function closePageLoading() {
  return {
    type: Constants.CLOSE_PAGE_LOADING,
  };
}

// CONFIRMATION MODAL USAGE
// this.props.dispatch(UiActions.openModal({
//   type: 'confirmation',
//   title: 'Are you sure you want to destroy our precious planet?',
//   confirmLabel: 'Yes, destroy',
//   cancelLabel: 'No, cancel',
//   onConfirm: () => console.log('onConfirm'),
//   onClose: () =>console.log('cancel'),
//   component: <CustomModalContent /> ,
// }))

export function openModal(obj) {
  return {
    type: Constants.OPEN_MODAL,
    obj,
  };
}
export function closeModal(obj) {
  return {
    type: Constants.CLOSE_MODAL,
    obj,
  };
}

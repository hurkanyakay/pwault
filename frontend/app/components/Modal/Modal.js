import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Overlay from 'components/Overlay/overlay';
import Button from 'components/elements/button';
import { ButtonGroup } from 'components/elements/styles/button';

import * as styled from './styles/modal';

class Modal extends Component {
  constructor(props) {
    super(props);

    this.onClose = this.onClose.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  onClose() {
    if (this.props.item.onClose) {
      this.props.item.onClose();
      this.props.onClose(this.props.item);
    } else {
      this.props.onClose(this.props.item);
    }
  }
  onConfirm() {
    if (this.props.item.onConfirm) {
      this.props.item.onConfirm();
      this.props.onClose(this.props.item);
    }
  }
  render() {
    const { type } = this.props.item;
    if (type === 'confirmation') {
      const { title, message, confirmLabel, cancelLabel, component } = this.props.item;
      return (
        <Overlay closeOverlay={this.onClose}>
          <styled.Modal>
            {title && <styled.Title>{title}</styled.Title>}
            {message && <styled.Message>{message}</styled.Message>}
            {component}
            <ButtonGroup>
              {cancelLabel && <Button color="mono" onClick={this.onClose}>{cancelLabel}</Button>}
              {confirmLabel && <Button color="primary" onClick={this.onConfirm}>{confirmLabel}</Button>}
            </ButtonGroup>
          </styled.Modal>
        </Overlay>
      );
    } else if (type === 'custom') {
      const { content } = this.props.item;
      return (
        <Overlay closeOverlay={this.onClose}>
          <styled.Modal>
            {content}
          </styled.Modal>
        </Overlay>
      );
    }
    return (
      <div></div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

export default Modal;

import PropTypes from 'prop-types';
import React, { Component } from 'react';

import * as Tag from './styles/overlay';

class Overlay extends Component {
  constructor(props) {
    super(props);

    this.onEscape = this.onEscape.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onEscape);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onEscape);
  }

  onEscape({ keyCode }) {
    const { closeOverlay, noClose = false } = this.props;

    if (!noClose && keyCode === 27) {
      closeOverlay();
    }
  }

  closeOverlayUI() {
    const { closeOverlay, noClose = false } = this.props;

    return noClose ? null : (<Tag.Close fn={() => closeOverlay()} />);
  }

  render() {
    const { padding, children, opaque = false,
      gotoLeft = false, gotoRight = false, gotoLeftFn, gotoRightFn } = this.props;

    const leftArrow = gotoLeft ? (
      <Tag.Prev prev fn={() => gotoLeftFn()} />
    ) : null;

    const rightArrow = gotoRight ? (
      <Tag.Next next fn={() => gotoRightFn()} />
    ) : null;

    return (
      <Tag.Overlay
        opaque={opaque}
        alignItems="center"
        justifyContent="center"
        padding={padding}
      >
        {leftArrow}

        <Tag.View>
          {this.closeOverlayUI()}

          {children}
        </Tag.View>

        {rightArrow}
      </Tag.Overlay>
    );
  }
}

Overlay.propTypes = {
  closeOverlay: PropTypes.func,
  gotoLeftFn: PropTypes.func,
  gotoRightFn: PropTypes.func,
  padding: PropTypes.string,
  noClose: PropTypes.bool,
  opaque: PropTypes.bool,
  gotoLeft: PropTypes.bool,
  gotoRight: PropTypes.bool,
  children: PropTypes.node,
};

export default Overlay;

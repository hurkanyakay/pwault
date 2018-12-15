import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {isString} from 'lodash';

import * as Tag from './styles/flash';
// import Icon from '../../elements/icon';

class Flash extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showFlash: props.showFlash,
    };

    this.closeFlash = this.closeFlash.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props &&
      nextProps.showFlash !== this.props.showFlash) {
      this.setState({ showFlash: nextProps.showFlash });
    }
  }

  closeFlash() {
    this.setState({ showFlash: false });
    this.props.onClose();
  }

  messagesFor() {
    const { messages } = this.props;

    return messages.map((message, index) => {
      const { pointer = null, detail } = message;
      const formattedPointer = !pointer || isString(detail) ? pointer : null;
      const formattedMsg = isString(detail) ? detail : null;
      return (
        <Tag.Message
          key={`message-${index}`}
        >
          {formattedPointer} {formattedMsg}
        </Tag.Message>
      );
    });
  }

  render() {
    const { messages, status, zIndex } = this.props;
    const { showFlash = false } = this.state;

    if (!showFlash) { return null; }

    return (
      <Tag.Flash
        numberOfItems={messages.length}
        status={status}
        zIndex={zIndex}
      >
        {this.messagesFor()}
        <Tag.Close onClick={this.closeFlash}>
          {/* <Icon
            icon="x"
            color="#fff"
            size="large"
          /> */}
          X
        </Tag.Close>
      </Tag.Flash>
    );
  }
}

Flash.propTypes = {
  zIndex: PropTypes.number,
  showFlash: PropTypes.bool,
  messages: PropTypes.array,
  status: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  intl: PropTypes.object,
};

Flash.defaultProps = {
  messages: [],
  onClose: () => {},
};

export default Flash;

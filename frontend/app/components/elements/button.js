import React, { isValidElement } from 'react';
import PropTypes from 'prop-types';

import first from 'lodash/first';
import last from 'lodash/last';

import { Button as ButtonTag } from './styles/button';
import Icon from './icon';
import { BUTTON_COLORS, BUTTON_SIZES } from './constants/buttons';

const Button = function Button({
  htmlType,
  className,
  loading,
  disabled,
  children,
  ...props }) {
  const hasIconLeft = isValidElement(first(children)) && first(children).type === Icon;
  const hasIconRight = isValidElement(last(children)) && last(children).type === Icon;

  return (
    <ButtonTag
      type={htmlType}
      className={className}
      loading={loading}
      disabled={disabled}
      hasIconLeft={hasIconLeft}
      hasIconRight={hasIconRight}
      {...props}
    >
      {children}
    </ButtonTag>
  );
};

Button.propTypes = {
  htmlType: PropTypes.oneOf(['button', 'reset', 'submit']),
  color: PropTypes.oneOf(Object.keys(BUTTON_COLORS)),
  size: PropTypes.oneOf(Object.keys(BUTTON_SIZES)),
  type: PropTypes.oneOf(['outline', 'inverted', 'blank', 'mono']),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.any.isRequired,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  htmlType: 'button',
  color: 'primary',
  size: 'normal',
  loading: false,
  disabled: false,
  children: '',
  onClick: () => {},
};

export default Button;

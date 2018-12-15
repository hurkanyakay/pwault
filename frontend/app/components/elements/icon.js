import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import { Colors } from 'components/utils/colors';

import * as Tag from './styles/icon';
import { ICON_DATA, ICON_NAMES, ICON_SIZES } from './constants/icons';

function getPath(iconName) {
  const matchedIcon = ICON_DATA.find((icon) => get(icon, 'name') === iconName);
  return matchedIcon && matchedIcon.paths ? matchedIcon.paths.join(' ') : '';
}

const Icon = function Icon({
  icon,
  color,
  size,
  ...props
}) {
  const styles = {
    svg: {},
  };

  const computedSize = (isNaN(size) ? ICON_SIZES[size] : size) * 10;

  return (
    <Tag.Svg
      style={styles.svg}
      width={`${computedSize}px`}
      height={`${computedSize}px`}
      viewBox="0 0 1024 1024"
      {...props}
    >
      <Tag.Path
        color={color}
        d={getPath(icon)}
      />
    </Tag.Svg>
  );
};

Icon.propTypes = {
  icon: PropTypes.oneOf(ICON_NAMES).isRequired,
  size: PropTypes.oneOfType([
    PropTypes.oneOf(Object.keys(ICON_SIZES)),
    PropTypes.number,
  ]),
  color: PropTypes.string,
};

Icon.defaultProps = {
  icon: 'gustav',
  size: 'normal',
  color: Colors.darkGray,
};

export default Icon;

// Icons are managed with and exported through IcoMoon app
// See: https://icomoon.io/docs.html (Saving & Loading)
import get from 'lodash/get';

import ICOMOON_JSON from './icomoon.json';

export const ICON_SIZES = {
  small: 1.4,
  normal: 1.6,
  large: 1.8,
};

export const ICON_DATA = ICOMOON_JSON.selection.map((icon, index) => (
  {
    name: get(icon, 'name'),
    paths: get(ICOMOON_JSON, `icons[${index}].paths`),
  }
));

export const ICON_NAMES = ICON_DATA.map((icon) => get(icon, 'name'));

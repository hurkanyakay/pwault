import React from 'react';

// import theme from 'themes';

import Overlay from 'components/Overlay/overlay';

import * as gustavSpinnerTag from './styles/generic-loading';

const Loading = function Loading() {
  const logo = React.createElement(
    gustavSpinnerTag.LoadingLogo,
    { color: 'white', incrementalFactor: 3 }
  );
  return (
    <Overlay noClose style={{border: "1px"}}>
      { logo }
    </Overlay>
  );
};

export default Loading;

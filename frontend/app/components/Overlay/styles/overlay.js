import styled from 'styled-components';

import { Flexbox, Fullscreen } from 'components/page/containers';

// import CloseButton from '../../../visual/buttons/close';
// import GoTo from '../../../visual/buttons/goto';

export const Overlay = Fullscreen.extend`
  flex-direction: row;
  height: 100%;
`;

export const View = Flexbox.extend`
  align-items: center;
  position: relative;
  width: auto;
  height: 100%;
`;

export const Close = styled.span`
  position: absolute;
  top: -2rem;
  right: -2rem;
  z-index: 2;
`;
// export const Close = styled(CloseButton)`
//   position: absolute;
//   top: -2rem;
//   right: -2rem;
//   z-index: 2;
// `;

export const Prev = styled.span`
  margin-right: 2rem;
`;

export const Next = styled.span`
  margin-left: 2rem;
`;
// export const Prev = styled(GoTo)`
//   margin-right: 2rem;
// `;
//
// export const Next = styled(GoTo)`
//   margin-left: 2rem;
// `;

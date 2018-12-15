import styled from 'styled-components';

import { Colors } from 'components/utils/colors';

export const Flexbox = styled.div`
  align-items: ${(props) => props.alignItems || 'center'};
  display: flex;
  justify-content: ${(props) => props.justifyContent || 'center'};
  margin-bottom: 0;
  margin-top: 0;
  padding: 0;
  width: 100%;
`;

export const Fullscreen = Flexbox.extend`
  background-color: ${({ opaque }) => opaque ?
    Colors.darkGray : Colors.darkGrayTransparent};
  flex-direction: column;
  left: 0;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 6;
`;

export const GrayContainer = styled.div`
  align-items: center;
  background-color: ${Colors.lightGray};
  display: flex;
  flex: 1 0 auto;
  justify-content: center;
  padding: 3rem 15rem 3rem;
  width: 100%;
`;

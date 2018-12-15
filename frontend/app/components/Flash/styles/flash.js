import styled from 'styled-components';

import { Colors } from 'components/utils/colors';

const flashColor = function flashColor(status) {
  switch (status) {
    case 'success':
      return Colors.green;
    case 'warning':
      return Colors.yellow;
    case 'error':
      return Colors.red;
    case 'info':
    default:
      return Colors.darkGray;
  }
};

export const Flash = styled.div`
  align-items: center;
  background-color: ${({ status = 'info' }) => flashColor(status)};
  color: ${Colors.white};
  display: flex;
  flex-direction: column;
  height: ${(props) => props.numberOfItems ? `${props.numberOfItems * 1.5}rem` : '1.5rem'};
  justify-content: center;
  left: 0;
  padding: 1.3em 1.6rem;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: ${(props) => props.zIndex || 10};
`;

export const Message = styled.p`
  color: ${Colors.white};
  font-size: 1.2rem;
  font-weight: bold;
  line-height: 1.2rem;
  margin: 0;
`;

export const Close = styled.a`
  cursor: pointer;
  position: absolute;
  right: 1.6rem;
  top: 1rem;
`;

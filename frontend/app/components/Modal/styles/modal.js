import styled from 'styled-components';
import { Colors } from 'components/utils/colors';

export const Modal = styled.div`
  position: relative;
  margin: 0 auto;
  padding: 3rem 2rem;
  width: 520px;
  max-height: calc(100vh - 40px);
  overflow: auto;
  background-color: #fff;
  border-radius: 6px;
  font-size: 1.6rem;
  text-align: center;
`;

export const Title = styled.h1`
  margin: 0 0 2rem;
  font-size: 1.2rem;
  font-weight: bold;
  letter-spacing: 0.4px;
  color: ${Colors.primary};
`;

export const Message = styled.p`
  margin: 0 0 2rem;
  font-size: 1rem;
  font-weight: bold;
  letter-spacing: 0.4px;
  color: ${Colors.darkGray};
`;

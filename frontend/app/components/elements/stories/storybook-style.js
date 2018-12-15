import styled from 'styled-components';

import { Colors } from '../../utils/styles/ui';

export const resetFontSize = { fontSize: '16px' };

export const IconLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const Icondef = styled.div`
  flex-basis: 10%;
  padding: 1rem 0.5rem;
  text-align: center;
  font-size: 1.6rem;
`;

export const IconLabel = styled.p`
  color: ${Colors.darkGray};
`;

export const Spacer = styled.hr`
  display: flex;
  width: 1rem;
  height: 1rem;
  background: none;
  border: none;
  margin: 0
`;

export const SpacerHorizontal = styled(Spacer)`
  display: inline-flex;
`;

export const SpacerVertical = styled(Spacer)`
  width: 100%;
`;

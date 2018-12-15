import styled from 'styled-components';

import Menu from 'components/navigation/menu/menu';
import InputSearch from 'components/form/input/text';

import { Colors, materialShadow } from 'components/utils/styles/ui';

export const Select = styled.div`
  background-color: ${Colors.white};
  display: block;
  position: relative;
  width: 100%;
`;

export const OptionSelected = styled.a`
  align-items: center;
  color: ${Colors.darkGray};
  cursor: pointer;
  display: flex;
  flex-grow: 1;
  font-size: 1.4rem;
  font-weight: bold;
  letter-spacing: .09rem;
  width: 100%;
  padding: ${(props) => props.padding || '.9rem 0.4rem .7rem 1rem'};
`;

export const Options = styled(Menu)`
  white-space: normal;
`;

export const OptionsWrapper = styled.div`
  background-color: ${Colors.white};
  border: solid 1px ${Colors.midGray};
  border-radius: .6rem;
  box-shadow: ${materialShadow};
  display: ${(props) => props.activeMenu ? 'block' : 'none'};
  left: 0;
  padding: 0;
  position: absolute;
  top: 3.5rem;
  width: 100%;
  z-index: 2;
`;

export const OptionsTypeahead = styled(InputSearch)`
  height: 4rem;
`;
